import React from 'react';
import classNames from 'classnames';

export default class Marker extends React.Component {
  constructor() {
    super();
    this.selectIcon = this.selectIcon.bind(this);
    this.preSelect = this.preSelect.bind(this);

    let icons = ['radio-station', 'helicopter', 'high-building',
                 'mountains', 'power-line', 'birds', 'tree'];
    let sets = this.initClassSets(icons);
    this.state = {
      icons: icons,
      active: 'radio-station',
      sets: sets
    };
    this.preSelect();
  }

  initClassSets(icons) {
    let reducer = (sets, item) => {
      sets[item] = { 'icon-map': true, 'icon-map-selected': false };
      return sets;
    }

    return icons.reduce(reducer, {});
  }
  
  preSelect() {
    this.state.sets['radio-station']['icon-map-selected'] = true;
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

  render() {
    return(
      <div id="icon-selection">
        {this.state.icons.map((icon, i) => {
          return(
            <a href="javascript:void(0)" key={i}>
              <img src={"/src/images/" + icon + ".png"} 
                   className={classNames(this.state.sets[icon])}
                   key={i}
                   onClick={this.selectIcon}
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
