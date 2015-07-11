jest.autoMockOff();

describe('CoordinateConverter', () => {
  let Converter;

  beforeEach(() => {
    Converter = require('../coordinateConverter');
  });

  it('converts utm', () => {
    let utm = ['wgs84', '24', 260402.82767012613, 7651552.067819659];
    expect(Converter.utmToPoint(...utm))
      .toEqual([-21.221845219990666, -41.30836169025557]);
  });

  it('converts geo', () => {
    changeDefaultProjection();
    let geo = [-2113330.96, -6887893.49];
    expect(Converter.latLngToPoint(...geo))
      .toEqual([-18.646245159450846, -61.87499997454352]);
  });

  it('doesn\'t convert geo if same srid', () => {
    jest.mock('proj4');
    let MockProj4 = require('proj4');
    let geo = [-21.22184521999966, -41.30836169000027];
    expect(Converter.latLngToPoint(...geo)).toEqual(geo);
    expect(MockProj4.mock.instances.length).toBe(0);
    jest.dontMock('proj4');
  });

  it('accepts number as string', () => {
    changeDefaultProjection();
    let utmPoint = Converter.utmToPoint('wgs84', '24', '2.1', '2,1');
    let latLngTPoint = Converter.latLngToPoint('2,1', '2.1');
    expect(isCoordinate(utmPoint)).toBeTruthy();
    expect(isCoordinate(latLngTPoint)).toBeTruthy();
  });

  let changeDefaultProjection = () => {
    let SettingConstants = require('../../constants/constants').SettingConstants;
    SettingConstants.DEFAULT_PROJECTION = ('EPSG:900913');
  };

  let isCoordinate = (point) => {
    return !point.some((v) => { return isNaN(v); });
  };
});
