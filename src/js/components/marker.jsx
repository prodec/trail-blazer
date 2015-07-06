import React from 'react';
import classNames from 'classnames';
import constants from '../constants/constants';
import actions from '../actions/actions';
import mapStore from '../stores/mapStore';

export default class Marker extends React.Component {
  constructor() {
    super();
    this.selectIcon = this.selectIcon.bind(this);
    this.initIcon = this.initIcon.bind(this);
    this.addMarker = this.addMarker.bind(this);

    let icons = constants.ICONS;
    let sets = this.initClassSets(icons);

    this.state = {
      icons: icons,
      currentIcon: null,
      active: 'radio-station',
      sets: sets,
    };

    this.state.sets['radio-station']['icon-map-selected'] = true;
    mapStore.addChangeListener(this.onChangeMode.bind(this), constants.CHANGE_MODE);
  }

  initIcon(e) {
    this.selectIcon(e);
    let icon = L.Icon({ iconUrl: e.currentTarget.attributes.src });

    this.setState((state) => {
      state.currentIcon = icon;
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

    if (data.mode === constants.MARKER_MODE) {
      data.map.on('click', (e) => { this.addMarker(e) });
    } else {
      data.map.off('click', (e) => { this.addMarker(e) });
    }
  }

  addMarker(e) {
    let marker = new L.Marker(e.latlng, this.state.currentIcon);
    actions.addMarker(marker);
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
                   onClick={this.initIcon}
                   id={icon} />
            </a>
          ) 
        })}

        <div id="icon-info" className="pure-form">
          <textarea id="icon-info-description" className="pure-input-1-2" placeholder="Observações"></textarea>
        </div>
      </div>
    )
  }
}
