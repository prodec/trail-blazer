import { MarkerConstants } from '../constants/constants';

export default class Popup {
  constructor(marker, text) {
    this.marker = marker;
    this.text = text;
    this.options = { offset: MarkerConstants.POPUP_OFFSET, className: 'marker-popup' };
  }

  bind() {
    let body = "";

    if (this.text !== '') {
      body += "<div class='popup-content'>";
      body += "<b>" + this.text + "</b>";
      body += "</div>";
    }

    body += "<div class='popup-actions'>";
    body += "<a href='#'>Mover</a>";
    body += "<a href='#' class='popup-action-link'>Editar</a>";
    body += "<a href='#'>Remover</a>";
    body += "</div>";

    this.marker.bindPopup(body, this.options);
  }
}
