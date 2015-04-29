import React from 'react';
import cx from 'react/lib/cx';

export default class Menu extends React.Component {
  render() {
    return (
      <div id="menu-wrapper">
        <div id="menu">
          <button id="goto" className="button button-square button-jumbo button-royal">
            <i className="glyphicons compass"></i>
          </button>
          <div id="slideout-goto" className="after-transition slide">
            <div className="slideout-color"></div>
          </div>

          <button id="marker" className="button button-square button-jumbo button-action">
            <i className="glyphicons google_maps"></i>
          </button>
          <div id="slideout-marker" className="after-transition slide">
            <div className="slideout-color"></div>
          </div>

          <button id="line" className="button button-square button-jumbo button-caution">
            <i className="glyphicons vector_path_line"></i>
          </button>
          <div id="slideout-line" className="after-transition slide">
            <div className="slideout-color"></div>
          </div>

          <button id="battery" className="button button-square button-jumbo button-highlight">
            <i className="glyphicons flash"></i>
          </button>
          <div id="slideout-battery" className="after-transition slide">
            <div className="slideout-color"></div>
          </div>

          <button id="tie" className="button button-square button-jumbo button-primary">
            <i className="glyphicons flag"></i>
          </button>
          <div id="slideout-tie" className="after-transition slide">
            <div className="slideout-color"></div>
          </div>
        </div>
      </div>
    )
  }
}
