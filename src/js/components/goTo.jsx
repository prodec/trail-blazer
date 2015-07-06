import React from 'react';
import { GoToTabConstants, EventConstants } from '../constants/constants';
import classNames from 'classnames';
import CoordinateConverter from '../utils/coordinateConverter';
import mapStore from '../stores/mapStore';

export default class GoTo extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: GoToTabConstants.POS_GEO };
  }

  render() {
    let tabKeys = Object.keys(GoToTabConstants);
    let width = `${100 / tabKeys.length}%`;
    let tabs = tabKeys.map(key => {
      return (
        <Tab key={key}
          selectedTab={this.state.selectedTab}
          value={GoToTabConstants[key]}
          width={width}
          setSelectedTab={this._setSelectedTab.bind(this)} />
      );
    });

    return (
      <div id="goto-tabs">
        {tabs}
        <Form selectedTab={this.state.selectedTab} />
      </div>
    );
  }

  _setSelectedTab(e) {
    this.setState({ selectedTab: e.target.value });
  }
}

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let classes = classNames([
      'button',
      'button-royal',
      'button-capitalize',
      { 'active': this._isActive() }
    ]);

    return (
      <input
        className={classes}
        style={{width: this.props.width}}
        type="button"
        value={this.props.value}
        onClick={this.props.setSelectedTab} />
    );
  }

  _isActive() {
    return this.props.selectedTab === this.props.value;
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = { map: this._getMap() };
    this._bindValue = this._bindValue.bind(this);
    this._goToCoordinate = this._goToCoordinate.bind(this);
    this._setMap = this._setMap.bind(this);
    mapStore.addChangeListener(this._setMap, EventConstants.CHANGE_MAP);
  }

  componentWillUnmount() {
    mapStore.removeChangeListener(this._setMap, EventConstants.CHANGE_MAP);
  }

  render() {
    if (this.props.selectedTab === GoToTabConstants.POS_GEO) {
      return (
        <div id="goto-body">
          <form className="pure-form" onSubmit={this._goToCoordinate}>
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="lat" type="number" step="any" name="lat" placeholder="Latitude"
                  value={this.state.lat} onChange={this._bindValue} />
              </div>
              <input required className="pure-input-1" key="lon" type="number" step="any" name="lon" placeholder="Longitude"
                value={this.state.lon} onChange={this._bindValue} />
              <button className="button button-royal button-capitalize submit" type="submit">
                ir para
              </button>
          </form>
        </div>
      );
    } else {
      return (
        <div id="goto-body">
          <form className="pure-form" onSubmit={this._goToCoordinate}>
            <div className="pure-g">
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="north" type="number" step="any" name="north" placeholder="Norte"
                  value={this.state.north} onChange={this._bindValue} />
              </div>
              <div className="pure-u-1 l-box-bottom">
                <input required className="pure-input-1" key="east" type="number" step="any" name="east" placeholder="Leste"
                  value={this.state.east} onChange={this._bindValue} />
              </div>
              <div className="pure-u-12-24 l-box-right l-box-bottom">
                <select required className="pure-input-1" key="zone" name="zone"
                  value={this.state.zone} onChange={this._bindValue}>
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
                  value={this.state.datum} onChange={this._bindValue}>
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

  _bindValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  _getLatLon() {
    let point;
    if (this.props.selectedTab === GoToTabConstants.POS_GEO) {
      point = CoordinateConverter.latLonToPoint(this.state.lon,
                                                this.state.lat);
    } else {
      point = CoordinateConverter.utmToPoint(this.state.datum,
                                             this.state.zone,
                                             this.state.east,
                                             this.state.north);
    }
    return L.latLng(...point);
  }

  _getMap() {
    return mapStore.getState().map;
  }

  _goToCoordinate(e) {
    e.preventDefault();
    let latlon = this._getLatLon();
    this._updateMarker(latlon);
    this._updateMapCenter(latlon);
  }

  _initMarker(latlon, radius = 7) {
    let circle = L.circleMarker(latlon, {
                                  radius: radius,
                                  weight: '1',
                                  color: 'green',
                                  opacity: 0.85,
                                  fillColor: '#00ff00',
                                  fillOpacity: 0.85
                                }).addTo(this.state.map);
    this.setState({ marker: circle });
    return circle;
  }

  _setMap() {
    this.setState({ map: this._getMap() });
  }

  _updateMarker(latlon) {
    let marker = this.state.marker;
    if (!marker) { marker = this._initMarker(latlon); }
    marker.setLatLng(latlon);
  }

  _updateMapCenter(latlon) {
    this.state.map.setView(latlon);
  }
}
