import React from 'react';
import DateTime from 'react-datetime';
import Actions from '../../../actions/actions';

export default class DateTimePicker extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.isEditing) {
      return (
        <DateTime input={false}
          value={this.props.flightTime}
          onChange={this.save}
          isValidDate={this.isValidDate} />
      );
    } else {
      return (
        <a onClick={this.props.toggleEdit}>
          <span className="pure-u-1-2">
            <div className="sm-datum">
              <i className="glyphicons calendar"></i>{this.getDate()}
              <span className="sm-side-unit">{this.getDateUnit()}</span>
            </div>
          </span>
          <span className="pure-u-1-2">
            <div className="sm-datum">
              <i className="glyphicons clock"></i>{this.getTime()}
              <div className="clock-second"></div>
              <span className="sm-side-unit">{this.getTimeUnit()}</span>
            </div>
          </span>
        </a>
      );
    }
  }

  save = (flightTime) => {
    Actions.updateFlightTime(flightTime);
    this.setState({ isEditing: false });
  }

  isValidDate(current) {
    let yesterday = DateTime.moment().subtract(1, 'day');
    return current.isAfter(yesterday);
  }

  getDate() {
    return this.props.flightTime.format('DD/MM');
  }

  getDateUnit() {
    return this.props.flightTime.format('\'YY');
  }

  getTime() {
    return this.props.flightTime.format('hh:mm');
  }

  getTimeUnit() {
    return this.props.flightTime.format('A');
  }
}
