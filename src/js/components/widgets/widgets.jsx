import React from 'react';
import WindSpeedWidget from './windSpeedWidget'
import AltitudeWidget from './altitudeWidget'

export default class Widgets extends React.Component {
  render() {
    return (
      <div id="widgets">
        <AltitudeWidget />
        <WindSpeedWidget />
      </div>
    );
  }
}
