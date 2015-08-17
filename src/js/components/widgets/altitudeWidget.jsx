import React from 'react';
import altitudeStore from '../../stores/altitudeStore';
import classNames from 'classnames';

export default class AltitudeWidget extends React.Component {
  constructor() {
    super();
    this.state = { altitude: this.getAltitude() };
    altitudeStore.addChangeListener(this.setAltitude);
  }

  render() {
    return (
      <div id="wind-speed-widget">
        <div className="windmill">
          <div>
            <div className="blade"></div>
            <div className="blade"></div>
            <div className="blade"></div>
          </div>
        </div>
        <div className="speed-wrapper">
          <span className="speed-value">{this.state.altitude}</span>
        </div>
        <span className="widget-unit">m</span>
      </div>
    );
  }

  setAltitude = () => {
    let altitude = this.getAltitude();

    this.setState({ altitude });
  }

  getAltitude() {
    return altitudeStore.getState().altitude;
  }

}
