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
      <div id="altitude-widget">
        <div className="widget-data-wrapper">
          <span className="widget-data-value">{this.state.altitude}</span>
        </div>
        <span className="widget-data-unit">m</span>
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
