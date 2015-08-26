jest.autoMockOff();

describe('PositionInTime', () => {
  let PositionInTime;

  beforeEach(() => {
    PositionInTime = require('../positionInTime');
  });

  it('gets current position and time', () => {
    let format = jest.genMockFunction();
    PositionInTime.getCurrentPosition = jest.genMockFunction().mockReturnValue({});
    PositionInTime.getCurrentTime = jest.genMockFunction().mockReturnValue({ format });

    PositionInTime.getCurrent();
    expect(PositionInTime.getCurrentPosition).toBeCalled();
    expect(PositionInTime.getCurrentTime).toBeCalled();
    expect(format).toBeCalled();
  });

  it('gets current position', () => {
    let contextPositionStore = require('../../stores/contextPositionStore');
    let latLng = { lat: 1, lng: 2 };
    contextPositionStore.getState = jest.genMockFunction().mockReturnValue({ latLng });

    expect(PositionInTime.getCurrentPosition()).toEqual(latLng);
  });

  it('gets current time', () => {
    let flightTimeStore = require('../../stores/flightTimeStore');
    let time = 'hoje';
    flightTimeStore.getState = jest.genMockFunction().mockReturnValue({ time });

    expect(PositionInTime.getCurrentTime()).toEqual(time);
  });
});
