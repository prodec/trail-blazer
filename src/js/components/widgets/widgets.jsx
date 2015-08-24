import React from 'react';
import FlightTimeWidget from './flightTime/flightTimeWidget';
import AltitudeWidget from './altitudeWidget'
import WindSpeedWidget from './windSpeedWidget'

export default class Widgets extends React.Component {
  render() {
    return (
      <div id="widgets">
        <FlightTimeWidget />
        <AltitudeWidget />
        <WindSpeedWidget />
      </div>
    );
  }
}
