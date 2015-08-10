import React from 'react';
import WindSpeedWidget from './windSpeedWidget'

export default class Widgets extends React.Component {
  render() {
    return (
      <div id="widgets">
        <WindSpeedWidget />
      </div>
    );
  }
}
