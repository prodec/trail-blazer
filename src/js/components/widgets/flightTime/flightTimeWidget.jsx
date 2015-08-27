import React from 'react';
import flightTimeStore from '../../../stores/flightTimeStore';
import DateTimePicker from './dateTimePicker';
import UTCPicker from './utcPicker';

export default class FlightTimeWidget extends React.Component {
  constructor() {
    super();
    this.state = {
      flightTime: this.getflightTime(),
      isEditingDate: false
    };
  }

  componentDidMount() {
    flightTimeStore.addChangeListener(this.setflightTime);
    this.setflightTime();
  }

  render() {
    if (this.state.isEditingDate) {
      return (
        <div id="flight-time-widget" className="editing-date">
          <DateTimePicker flightTime={this.state.flightTime}
            isEditing={this.state.isEditingDate}
            toggleEdit={this.toggleEditingDateTime} />
          <button className="widget-button button button-tiny button-border-thin button-uppercase"
            onClick={this.toggleEditingDateTime}>
              ok
          </button>
        </div>
      );
    } else {
      return (
        <div id="flight-time-widget">
          <DateTimePicker flightTime={this.state.flightTime}
            isEditing={this.state.isEditingDate}
            toggleEdit={this.toggleEditingDateTime} />
          <UTCPicker flightTime={this.state.flightTime} />
        </div>
      );
    }
  }

  toggleEditingDateTime = () => {
    this.setState(oldState => {
      return { isEditingDate: (!oldState.isEditingDate) };
    });
  }

  setflightTime = () => {
    let flightTime = this.getflightTime();

    this.setState({ flightTime });
  }

  getflightTime() {
    return flightTimeStore.getState().time;
  }
}
