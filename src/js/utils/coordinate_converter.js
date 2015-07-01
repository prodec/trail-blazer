import Proj4js from 'proj4';
import addDefsTo from 'proj4js-defs';
addDefsTo(Proj4js);
import { settings } from '../constants/constants';

export default class CoordinateConverter {
  static utmToPoint(datum, zone, east, north) {
    let referenceSystem = this._referenceSystems(datum);
    let fromSrid = new Proj4js.Proj(Proj4js.defs(`EPSG:${referenceSystem + parseInt(zone)}`));
    let toSrid = new Proj4js.Proj(Proj4js.defs(settings.MAP_PROJECTION));
    let position = Proj4js.toPoint([parseFloat(east), parseFloat(north)]);
    let point = Proj4js.transform(fromSrid, toSrid, position);
    return [point.x, point.y];
  }

  static latLonToPoint(lon, lat) {
    let fromSrid = new Proj4js.Proj(Proj4js.defs(settings.DEFAULT_PROJECTION));
    let toSrid = new Proj4js.Proj(Proj4js.defs(settings.MAP_PROJECTION));
    let position = Proj4js.toPoint([parseFloat(lon), parseFloat(lat)]);
    let point = Proj4js.transform(fromSrid, toSrid, position);
    return [point.x, point.y];
  }

  static _referenceSystems(datum) {
    return ({
      wgs84: 32700,
      sirgas2000: 31960,
      sad69: 29170
    }[datum]);
  }
}
