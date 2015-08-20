import L from 'leaflet';
import $ from 'jquery';
import React from 'react';
import classNames from 'classnames';
import Actions from '../actions/actions';
import Popup from '../utils/popup';
import Marker from '../utils/marker';
import { ModeConstants, MarkerConstants } from '../constants/constants';
import mapStore from '../stores/mapStore';
import modeStore from '../stores/modeStore';

export default class MarkerUI extends React.Component {
  constructor() {
    super();
    let icons = MarkerConstants.ICONS;
    let sets = this.initClassSets(icons);

    this.state = {
      icons,
      selectedIcon: new L.Icon({
        iconUrl: 'radio-station.png',
        iconAnchor: MarkerConstants.ICON_ANCHOR }),
      text: '',
      active: 'radio-station',
      sets
    };

    this.state.sets['radio-station']['icon-map-selected'] = true;
    modeStore.addChangeListener(this.onChangeMode.bind(this));
  }

  changeIcon = (e) => {
    this.selectIcon(e);
    let icon = new L.Icon({ iconUrl: $(e.currentTarget).attr('src'),
                            iconAnchor: MarkerConstants.ICON_ANCHOR,
                            draggable: true });

    this.setState({ selectedIcon: icon });
  }

  initClassSets(icons) {
    let reducer = (sets, item) => {
      sets[item] = { 'icon-map': true, 'icon-map-selected': false };
      return sets;
    };

    return icons.reduce(reducer, {});
  }

  selectIcon = (e) => {
    let current = e.currentTarget.id;

    this.setState((state) => {
      let isActive = (current === state.active);

      if (!isActive) {
        state.sets[state.active]['icon-map-selected'] = false;
      }

      state.sets[current]['icon-map-selected'] = true;
      state.active = current;

      return state;
    });
  }

  onChangeMode = () => {
    let active = modeStore.getState().active;
    let map = mapStore.getState().map;

    if (active === ModeConstants.MARKER_MODE) {
      map.on('click', this.addMarker);
    } else {
      map.off('click', this.addMarker);
    }
  }

  addMarker = (e) => {
    let marker = new Marker(e.latlng, this.state.selectedIcon);
    let content = this.state.text;
    let id = Marker.idOnMap(marker);
    let popup = new Popup(marker, content, id);

    Actions.addMarker(marker, content);
    popup.bindOnMarker();

    this.setState({ text: '' });
  }

  changeText = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div id="icon-selection">
        {this.state.icons.map((icon, i) => {
          return (
            <a href="javascript:void(0)" key={i}>
              <img src={`${icon}.png`}
                   ref={i}
                   className={classNames(this.state.sets[icon])}
                   key={i}
                   onClick={this.changeIcon}
                   id={icon} />
            </a>
          );
        })}

        <div id="icon-info">
          <div className="mdl-textfield mdl-js-textfield textfield-demo">
            <textarea className="mdl-textfield__input pure-input-1-2"
                      type="text"
                      rows= "3"
                      onChange={this.changeText}
                      value={this.state.text}
                      maxLength="140"
                      id="icon-info-description">
            </textarea>
            <label className="mdl-textfield__label" htmlFor="icon-info-description">
            Observação
            </label>
          </div>
        </div>
      </div>
    );
  }
}
