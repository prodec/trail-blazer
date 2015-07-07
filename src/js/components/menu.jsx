import React from 'react';
import classNames from 'classnames';
import GoTo from './goTo';
import Marker from './marker';
import constants from '../constants/constants';
import Actions from '../actions/actions';

export default class Menu extends React.Component {
  constructor() {
    super();
    this.togglePanel= this.togglePanel.bind(this);
    this.setupMarker= this.setupMarker.bind(this);
    this.setupGoTo = this.setupGoTo.bind(this);

    let items = constants.MENU_ITEMS;
    let sets = this.initClassSets(items);
    this.state = { active: null, sets, items };
  }

  setupMarker(e) {
    this.togglePanel(e);
    Actions.changeCursor(constants.CURSOR_CROSSHAIR);
    Actions.changeMode(constants.MARKER_MODE);
  }

  setupGoTo(e) {
    this.togglePanel(e);
    Actions.changeMode(constants.GO_TO_MODE);
    Actions.changeCursor(constants.CURSOR_GRAB);
  }

  togglePanel(e) {
    let current = e.currentTarget.id;

    this.setState((state, props) => {
      let isActive = (current === state.active);
      state.sets[current]['container-slideout-active'] = !isActive;

      if (isActive) {
        state.active = null;
        Actions.changeCursor(constants.CURSOR_GRAB);
        Actions.changeMode(constants.VIEW_MODE);
      } else {
        if (state.active !== null) { state.sets[state.active]['container-slideout-active'] = false };
        state.active = current;
      }

      return state;
    });
  }

  initClassSets(items) {
    let reducer = (sets, item) => {
      sets[item] = { 'container-slideout-active': false };
      return sets;
    }

    return items.reduce(reducer, {});
  }

  render() {
    return (
      <div id="menu-wrapper">
        <div id="menu">
          <button id="goto" className="button button-square button-jumbo button-royal" onClick={this.setupGoTo}>
            <i className="glyphicons compass"></i>
          </button>
          <button id="marker" className="button button-square button-jumbo button-action" onClick={this.setupMarker}>
            <i className="glyphicons google_maps"></i>
          </button>
          <button id="line" className="button button-square button-jumbo button-caution" onClick={this.togglePanel}>
            <i className="glyphicons vector_path_line"></i>
          </button>
          <button id="battery" className="button button-square button-jumbo button-highlight" onClick={this.togglePanel}>
            <i className="glyphicons flash"></i>
          </button>
          <button id="tie" className="button button-square button-jumbo button-primary" onClick={this.togglePanel}>
            <i className="glyphicons flag"></i>
          </button>

          <div id="slideout-goto" className={classNames(this.state.sets['goto'])}>
            <div className="slideout-color">
              <GoTo />
            </div>
          </div>
          <div id="slideout-marker" className={classNames(this.state.sets['marker'])} >
            <div className="slideout-color">
              <Marker />
            </div>
          </div>
          <div id="slideout-line" className={classNames(this.state.sets['line'])}>
            <div className="slideout-color"></div>
          </div>
          <div id="slideout-battery" className={classNames(this.state.sets['battery'])}>
            <div className="slideout-color"></div>
          </div>
          <div id="slideout-tie" className={classNames(this.state.sets['tie'])}>
            <div className="slideout-color"></div>
          </div>
        </div>
      </div>
    )
  }
}
