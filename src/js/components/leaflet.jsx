import React from 'react';

export default React.createClass({
  componentDidMount: function() {
    var el = this.getDOMNode();
    console.log(el);
  },

  render: function() {
    return (
      <div id="map"></div>
    )
  }
});
