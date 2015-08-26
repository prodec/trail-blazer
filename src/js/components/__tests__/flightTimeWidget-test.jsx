import React from 'react/addons';
const { addons: { TestUtils } } = React;

['flightTimeWidget', 'dateTimePicker', 'utcPicker'].forEach(path => {
  jest.dontMock(`../widgets/flightTime/${path}`);
});

jest
  .dontMock('react-datetime')
  .dontMock('moment');

describe('FlightTimeWidget', () => {
  let FlightTimeWidget = require('../widgets/flightTime/flightTimeWidget');
  let DateTimePicker = require('../widgets/flightTime/dateTimePicker');
  let UtcPicker = require('../widgets/flightTime/utcPicker');
  let store = require('../../stores/flightTimeStore');
  let Actions = require('../../actions/actions');
  let moment = require('moment');
  let time = moment().startOf('day');
  let utcOffset = 180;
  let widget;

  beforeEach(() => {
    store.getState = () => { return { time }; };
    widget = TestUtils.renderIntoDocument(<FlightTimeWidget />);
  });

  it('init widget', () => {
    expect(widget.state.flightTime).toBe(time);
  });

  it('adds listener to store', () => {
    expect(store.addChangeListener).toBeCalledWith(widget.setflightTime);
  });

  it('sets flight time', () => {
    let newTime = moment().endOf('day');
    store.getState = () => { return { time: newTime }; };
    widget.setflightTime();
    expect(widget.state.flightTime).toEqual(newTime);
  });

  it('sets date and time', () => {
    let dateTimePicker = clickDateTimePicker();
    changeDateTime(dateTimePicker);
    expect(Actions.updateFlightTime).toBeCalled();
  });

  it('sets UTC offset', () => {
    let utcPicker = activateUTCPicker();
    changePickerUTCValue(utcPicker);

    expect(Actions.registerUTC).toBeCalledWith(utcOffset);
  });

  function clickDateTimePicker() {
    let dateTimePicker = TestUtils.findRenderedComponentWithType(widget, DateTimePicker);

    TestUtils.Simulate.click(React.findDOMNode(dateTimePicker));
    return dateTimePicker;
  }

  function changeDateTime(dateTimePicker) {
    let day = TestUtils.scryRenderedDOMComponentsWithClass(dateTimePicker, 'day new')[0];
    TestUtils.Simulate.click(React.findDOMNode(day));
  }

  function activateUTCPicker() {
    let utcPicker = TestUtils.findRenderedComponentWithType(widget, UtcPicker);
    utcPicker.getOptions = () => { return <option value={utcOffset}>Naruto</option>; };
    TestUtils.Simulate.click(React.findDOMNode(utcPicker));
    return utcPicker;
  }

  function changePickerUTCValue(utcPicker) {
    let option = TestUtils.findRenderedDOMComponentWithTag(utcPicker, 'option');

    TestUtils.Simulate.click(React.findDOMNode(option));
  }
});
