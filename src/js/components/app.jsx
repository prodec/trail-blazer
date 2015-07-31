import React from 'react';
import Map from './map';
import Menu from './menu';
import Widgets from './widgets/widgets';

export default class App extends React.Component {
  render() {
    return (
      <div id="main" className="content">
        <Map />
        <Menu />
        <Widgets />
      </div>
    );
  }
}
