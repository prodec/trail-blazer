import React from 'react';
import { MarkerConstants } from '../constants/constants';
import Actions from '../actions/actions';
import classNames from 'classnames';
import mapStore from '../stores/mapStore';

export default class Popup {
  constructor(marker, text, id) {
    this.marker = marker;
    this.text = text;
    this.options = { offset: MarkerConstants.POPUP_OFFSET,
                     className: 'marker-popup',
                     minWidth: 200,
                     autoClose: false };
    this.id = id;
  }

  bindOnMarker() {
    let body = `<div id =${this.id}></div>`;
    this.marker.bindPopup(body, this.options).openPopup();

    React.render(<PopupComponent text={this.text} />,
                  document.getElementById(this.id));
  }
}

class PopupComponent extends React.Component {
  constructor() {
    super();
    this.state = { contentSet: { 'popup-content': true } }
  }

  render() {
    if (this.props.text === '') {
      this.state.contentSet['popup-content'] = false;      
    }

    return(
      <div>
        <div className={classNames(this.state.contentSet)}>
          <b>{this.props.text}</b>
        </div>
        <div className='popup-actions'>
          <a href='#'>Mover</a>
          <a href='#' className='popup-action-link'>Editar</a>
          <a href='#'>Remover</a>
        </div>
      </div>
    )
  }
}
