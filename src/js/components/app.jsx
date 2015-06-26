import React from 'react';
import Map from './map';
import Menu from './menu';

export default class App extends React.Component {
  render() {
    return (
      <div id="main" className="content">
        <Map />
        <Menu />
      </div>
    );
  }
}
