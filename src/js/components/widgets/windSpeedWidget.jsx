import React from 'react';
import windSpeedStore from '../../stores/windSpeedStore';
import classNames from 'classnames';

export default class WindSpeedWidget extends React.Component {
  constructor() {
    super();
    this.state = { windSpeed: this.getWindSpeed() };
  }

  componentDidMount() {
    windSpeedStore.addChangeListener(this.setWindSpeed);
    this.setWindSpeed();
  }

  render() {
    let classes = classNames([
      'turbine',
      this.getSpeedClass()
    ]);

    return (
      <div id="wind-speed-widget">
        <div className="windmill">
          <div className={classes}>
            <div className="blade"></div>
            <div className="blade"></div>
            <div className="blade"></div>
          </div>
        </div>
        <div className="speed-wrapper">
          <span className="speed-value">{this.state.windSpeed}</span>
        </div>
        <span className="widget-unit">km/h</span>
      </div>
    );
  }

  setWindSpeed = () => {
    let windSpeed = this.getWindSpeed();

    this.setState({ windSpeed });
  }

  getWindSpeed() {
    return windSpeedStore.getState().windSpeed;
  }

  getSpeedClass() {
    let speed = this.state.windSpeed;

    if(speed > 25) {
      return 'fast';
    } else if (25 >= speed && speed > 10) {
      return 'normal';
    } else if (10 >= speed && speed > 0) {
      return 'slow';
    }
  }
}
