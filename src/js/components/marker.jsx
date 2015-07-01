import React from 'react';
import classNames from 'classnames';
import constants from '../constants/constants';
import mapStore from '../stores/mapStore';

export default class Marker extends React.Component {
  constructor() {
    super();
    this.selectIcon = this._selectIcon.bind(this);
    this.preSelect = this._preSelect.bind(this);
    this.initIcon = this.initIcon.bind(this);

    let icons = constants.ICONS;
    let sets = this._initClassSets(icons);

    this.state = {
      icons: icons,
      active: 'radio-station',
      marker: L.marker(L.latLng(50.5, 30.5), { icon: icons['radio-station'] }),
      sets: sets
    };

    this._preSelect();
  }

  initIcon(e) {
    this.selectIcon(e);

    let icon = L.Icon({ iconUrl: e.currentTarget.attributes.src });
    let marker = L.marker({ icon: icon })

    this.setState((state) => {
      state.marker = marker;
      return state;
    });
  }

  _initClassSets(icons) {
    let reducer = (sets, item) => {
      sets[item] = { 'icon-map': true, 'icon-map-selected': false };
      return sets;
    }

    return icons.reduce(reducer, {});
  }

  _preSelect() {
    this.state.sets['radio-station']['icon-map-selected'] = true;
  }

  _selectIcon(e) {
    let bob = mapStore;
    debugger
    let current = e.currentTarget.id;
    this.setState((state, props) => {
      let isActive = (current == state.active);

      if (!isActive) { state.sets[state.active]['icon-map-selected'] = false }
      state.sets[current]['icon-map-selected'] = true;
      state.active = current;

      return state;
    });
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
