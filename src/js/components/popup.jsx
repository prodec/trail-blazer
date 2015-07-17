import React from 'react';
import { MarkerConstants } from '../constants/constants';
import Actions from '../actions/actions';
import classNames from 'classnames';
import mapStore from '../stores/mapStore';
import Popup from '../utils/popup';

export default class PopupUI extends React.Component {
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
          <a href='#' className='popup-action-link'>Editar</a>
          <a href='#'>Remover</a>
        </div>
      </div>
    )
  }
}
