import React from 'react';
import classNames from 'classnames';
import Actions from '../actions/actions';
import mapStore from '../stores/mapStore';
import { ModeConstants, MarkerConstants, ModeContants } from '../constants/constants';

export default class Marker extends React.Component {
  constructor() {
    super();
    this.selectIcon = this.selectIcon.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.changeText = this.changeText.bind(this);

    let icons = MarkerConstants.ICONS;
    let sets = this.initClassSets(icons);

    this.state = {
      icons,
      selectedIcon: new L.Icon({ iconUrl: '/src/images/radio-station.png', iconAnchor: MarkerConstants.ICON_ANCHOR }),
      text: '',
      active: 'radio-station',
      sets
    };

    this.state.sets['radio-station']['icon-map-selected'] = true;
    mapStore.addChangeListener(this.onChangeMode.bind(this), ModeConstants.CHANGE_MODE);
  }

  changeIcon(e) {
    this.selectIcon(e);
    let icon = new L.Icon({ iconUrl: $(e.currentTarget).attr('src'),
                            iconAnchor: MarkerConstants.ICON_ANCHOR }) ;

    this.setState((state) => {
      state.selectedIcon = icon;
      return state;
    });
  }

  initClassSets(icons) {
    let reducer = (sets, item) => {
      sets[item] = { 'icon-map': true, 'icon-map-selected': false };
      return sets;
    }

    return icons.reduce(reducer, {});
  }

  selectIcon(e) {
    let current = e.currentTarget.id;

    this.setState((state, props) => {
      let isActive = (current == state.active);

      if (!isActive) { state.sets[state.active]['icon-map-selected'] = false }
      state.sets[current]['icon-map-selected'] = true;
      state.active = current;

      return state;
    });
  }

  onChangeMode() {
    let data = mapStore.getState();

    if (data.mode === ModeConstants.MARKER_MODE) {
      data.map.on('click', this.addMarker);
    } else {
      data.map.off('click', this.addMarker);
    }
  }

  addMarker(e) {
    let marker = new L.Marker(e.latlng, { icon: this.state.selectedIcon });
    let text = this.state.text;

    if (text !== '') {
      marker.bindPopup(this.state.text, { offset: MarkerConstants.POPUP_OFFSET, className: 'marker-popup' })
    }
    Actions.addMarker(marker);
    this.setState({ text: '' });
  }

  changeText(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return(
      <div id="icon-selection">
        {this.state.icons.map((icon, i) => {
          return(
            <a href="javascript:void(0)" key={i}>
              <img src={"/src/images/" + icon + ".png"} 
                   className={classNames(this.state.sets[icon])}
                   key={i}
                   onClick={this.changeIcon}
                   id={icon} />
            </a>
          ) 
        })}

        <div id="icon-info" className="pure-form">
          <textarea id="icon-info-description"
                    className="pure-input-1-2"
                    onChange={this.changeText} 
                    value={this.state.text}
                    placeholder="Observações">
          </textarea>
        </div>
      </div>
    )
  }
}
