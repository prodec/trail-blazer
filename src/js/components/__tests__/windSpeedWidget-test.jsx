import React from 'react/addons';
const { addons: { TestUtils } } = React;

jest
  .dontMock('isomorphic-fetch')
  .dontMock('../widgets/windSpeedWidget')
  .dontMock('../../stores/pathPositionStore')
  .dontMock('../../stores/mapPositionStore')
  .dontMock('../../stores/store');

describe('WindSpeedWidget', () => {
  let WindSpeedWidget;

  beforeEach(() => {
    WindSpeedWidget = require('../widgets/windSpeedWidget');
  });

  it('adds listener to windSpeedStore', () => {
    let windSpeedStore = require('../../stores/windSpeedStore');
    windSpeedStore.getState = () => { return {}; };
    let widget = TestUtils.renderIntoDocument(<WindSpeedWidget />);

    expect(windSpeedStore.addChangeListener).toBeCalledWith(widget.setWindSpeed);
  });

  it('sets wind speed', () => {
    let speed = 9;
    WindSpeedWidget.prototype.getWindSpeed = () => { return speed; };
    let widget = TestUtils.renderIntoDocument(<WindSpeedWidget />);

    widget.getWindSpeed();
    expect(widget.state.windSpeed).toBe(speed);
  });
});
