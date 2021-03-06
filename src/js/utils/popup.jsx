import L from 'leaflet';
import React from 'react';
import { MarkerConstants } from '../constants/constants';
import PopupContent from '../components/popupContent'

export default class Popup {
  constructor(marker, text, id) {
    this.marker = marker;
    this.text = text;
    this.id = `${id}-marker-popup`;
    this.body = `<div id =${this.id}></div>`;
    this.options = { offset: MarkerConstants.POPUP_OFFSET,
                     className: 'marker-popup',
                     minWidth: 200,
                     autoClose: false };
  }

  bindOnMarker() {
    this.marker.bindPopup(this.body, this.options).openPopup();
    React.render(<PopupContent text={this.text} marker={this.marker} />,
                  document.getElementById(this.id));
  }
}
