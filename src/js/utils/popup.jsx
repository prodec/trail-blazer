import L from 'leaflet';
import React from 'react';
import { MarkerConstants } from '../constants/constants';
import PopupUI from '../components/popup'

export default class Popup {
  constructor(marker, text, id) {
    this.marker = marker;
    this.text = text;
    this.id = `${id}-marker-popup`;
    this.options = { offset: MarkerConstants.POPUP_OFFSET,
                     className: 'marker-popup',
                     minWidth: 200,
                     autoClose: false };
  }

  bindOnMarker() {
    let body = `<div id =${this.id}></div>`;

    this.marker.bindPopup(body, this.options).openPopup();
    React.render(<PopupUI text={this.text} marker={this.marker} />,
                  document.getElementById(this.id));
  }
}

