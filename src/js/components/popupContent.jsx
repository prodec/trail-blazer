import React from 'react';
import { MarkerConstants } from '../constants/constants';
import Actions from '../actions/actions';
import classNames from 'classnames';
import mapStore from '../stores/mapStore';
import Popup from '../utils/popup';

export default class PopupContent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      originalText: props.text,
      text: props.text,
      contentSet: { 'popup-content': true },
      editing: false,
      marker: props.marker
    }
  }

  removeMarker = () => {
    Actions.removeMarker(this.state.marker);
  }

  editContent = () => {
    this.setState({ editing: true });
  }

  cancelEditContent = () => {
    let text = this.state.originalText;
    this.setState({ text, editing: false });
  }

  changeText = (e) => {
    this.setState({ text: e.target.value });
  }

  saveContent = () => {
    let text = this.state.text;
    let editing = !this.state.editing;

    Actions.updateMarker(this.state.marker, text);
    this.setState({ editing, originalText: text });
  }

  render() {
    let content;

    if (this.state.text === '') {
      this.state.contentSet['popup-content'] = false;
    }

    if (this.state.editing) {
      content =
        <div>
          <textarea className="content-editable"
                    value={this.state.text}
                    maxLength="140"
                    onChange={this.changeText}
                    placeholder="Comments" />

          <div className="popup-actions">
            <a href="#" onClick={this.saveContent} className="popup-action-link save-link">Salvar</a>
            <a href="#" onClick={this.cancelEditContent} className="cancel-link">Cancelar</a>
          </div>
        </div>;

    } else {
      content =
        <div>
          <div className={classNames(this.state.contentSet)}>
            <b>{this.state.text}</b>
          </div>
          <div className="popup-actions">
            <a href="#" onClick={this.editContent} className="popup-action-link edit-link">Editar</a>
            <a href="#" onClick={this.removeMarker}>Remover</a>
          </div>
        </div>;
    }

    return content;
  }
}
