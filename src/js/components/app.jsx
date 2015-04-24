import React from 'react';
import Leaflet from './leaflet';

export default React.createClass({
  render: function() {
    return (
      <div id="main">
        <Leaflet />
      </div>
    )
  }
});
