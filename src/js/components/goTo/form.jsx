import L from 'leaflet';
import React from 'react';
import Actions from '../../actions/actions';
import { GoToTabConstants } from '../../constants/constants';
import CoordinateConverter from '../../utils/coordinateConverter';

export default class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      lat: null,
      lng: null,
      north: null,
      east: null,
      zone: '',
      datum: ''
    };
  }

  render() {
    if (this.props.selectedTab === GoToTabConstants.POS_GEO) {
      return (
        <div id="goto-body">
          <form className="pure-form" onSubmit={this.goToCoordinate}>
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="lat" type="number" step="any" name="lat" placeholder="Latitude"
                  value={this.state.lat} onChange={this.bindValue} />
              </div>
              <input required className="pure-input-1" key="lng" type="number" step="any" name="lng" placeholder="Longitude"
                value={this.state.lng} onChange={this.bindValue} />
              <button className="button button-royal button-capitalize submit" type="submit">
                ir para
              </button>
          </form>
        </div>
      );
    } else {
      return (
        <div id="goto-body">
          <form className="pure-form" onSubmit={this.goToCoordinate.bind(this)}>
            <div className="pure-g">
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="north" type="number" step="any" name="north" placeholder="North"
                  value={this.state.north} onChange={this.bindValue} />
              </div>
              <div className="pure-u-1 l-box-bottom">
                <input required className="pure-input-1" key="east" type="number" step="any" name="east" placeholder="East"
                  value={this.state.east} onChange={this.bindValue} />
              </div>
              <div className="pure-u-12-24 l-box-right l-box-bottom">
                <select required className="pure-input-1" key="zone" name="zone"
                  value={this.state.zone} onChange={this.bindValue}>
                  <option value="" disabled>Zona</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                </select>
              </div>
              <div className="pure-u-12-24 l-box-bottom">
                <select required className="pure-input-1" key="datum" name="datum"
                  value={this.state.datum} onChange={this.bindValue}>
                  <option value="" disabled>Datum</option>
                  <option value="sad69">SAD 69</option>
                  <option value="sirgas2000">SIRGAS 2000</option>
                  <option value="wgs84">WGS 84</option>
                </select>
              </div>
            </div>
            <button className="button button-royal button-capitalize submit" type="submit">
              ir para
            </button>
          </form>
        </div>
      );
    }
  }

  bindValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  getLatLng() {
    let point;
    if (this.props.selectedTab === GoToTabConstants.POS_GEO) {
      point = CoordinateConverter.latLngToPoint(this.state.lat,
                                                this.state.lng);
    } else {
      point = CoordinateConverter.utmToPoint(this.state.datum,
                                             this.state.zone,
                                             this.state.east,
                                             this.state.north);
    }
    return L.latLng(...point);
  }

  goToCoordinate = (e) => {
    e.preventDefault();
    Actions.goToCoordinate(this.getLatLng());
  }
}
