import React from 'react';
import once from 'lodash.once';
import uniq from 'lodash.uniq';
import Actions from '../../../actions/actions';
import timezones from '../../../lib/timezones.json';

export default class UTCPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false
    };
  }

  render() {
    if (this.state.isEditing) {
      return (
        <div id="utc-select-wrapper">
          <select size="6" ref="utc-select" id="utc-select" value={this.getUTCOffset()} onClick={this.save}>
            {this.getOptions()}
          </select>
        </div>
      );
    } else {
      return (
        <a onClick={this.edit}>
          <span className="pure-u-1">
            <i className="glyphicons globe"></i>{this.getUTC()}
            <span className="sm-side-unit">UTC</span>
          </span>
        </a>
      );
    }
  }

  edit = () => {
    this.setState({ isEditing: true });
  }

  save = (e) => {
    Actions.registerUTC(parseInt(e.target.value));
    this.setState({ isEditing: false });
  }

  getOptions = once(() => {
    return uniq(timezones, 'offset').map((utc, i) => {
      return (
        <option value={utc.offset} key={i}>{utc.text}</option>
      );
    });
  })

  getUTC() {
    return this.props.flightTime.format('Z');
  }

  getUTCOffset() {
    return this.props.flightTime.utcOffset();
  }

}
