import React from 'react';

export default class Marker extends React.Component {
  constructor() {
    super();
    this.state = { icons: ['birds', 'helicopter', 'high-building', 'mountains', 'power-line', 'radio-station', 'tree'] };
  }

  render() {
    return(
      <div id="icon-selection">
        {this.state.icons.map((icon) => {
          return(
            <img src={"/src/images/" + icon + ".png"} className="icon-map-selection" />
          ) 
        })}
      </div>
    )
  }
}
