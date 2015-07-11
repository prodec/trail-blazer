import Proj4js from 'proj4';
import addDefsTo from 'proj4js-defs';
addDefsTo(Proj4js);
import { SettingConstants } from '../constants/constants';

export default class CoordinateConverter {
  static utmToPoint(datum, zone, east, north) {
    [east, north] = [east, north].map(v => { return this.toFloat(v); });
    let referenceSystem = this.referenceSystems(datum);
    let fromSrid = new Proj4js.Proj(Proj4js.defs(`EPSG:${referenceSystem + parseInt(zone)}`));
    let toSrid = new Proj4js.Proj(Proj4js.defs(SettingConstants.MAP_PROJECTION));
    let position = Proj4js.toPoint([east, north]);
    let point = Proj4js.transform(fromSrid, toSrid, position);
    return [point.y, point.x];
  }

  static latLngToPoint(lat, lon) {
    [lon, lat] = [lon, lat].map(v => { return this.toFloat(v); });
    if (SettingConstants.DEFAULT_PROJECTION === SettingConstants.MAP_PROJECTION) {
      return [lat, lon];
    }
    let fromSrid = new Proj4js.Proj(Proj4js.defs(SettingConstants.DEFAULT_PROJECTION));
    let toSrid = new Proj4js.Proj(Proj4js.defs(SettingConstants.MAP_PROJECTION));
    let position = Proj4js.toPoint([lon, lat]);
    let point = Proj4js.transform(fromSrid, toSrid, position);
    return [point.y, point.x];
  }

  static referenceSystems(datum) {
    return ({
      wgs84: 32700,
      sirgas2000: 31960,
      sad69: 29170
    }[datum]);
  }

  static toFloat(number) {
    if (isNaN(number)) { number = number.replace(',', '.'); }
    return parseFloat(number);
  }
}
