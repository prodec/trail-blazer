import React from 'react';
import { GoToTabConstants } from '../constants/constants';
import classNames from 'classnames';
import CoordinateConverter from '../utils/coordinateConverter';
import Actions from '../actions/actions';

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
          setSelectedTab={this.setSelectedTab.bind(this)} />
      );
    });

    return (
      <div id="goto-tabs">
        {tabs}
        <Form selectedTab={this.state.selectedTab} />
      </div>
    );
  }

  setSelectedTab(e) {
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
      { 'active': this.isActive() }
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

  isActive() {
    return this.props.selectedTab === this.props.value;
  }
}

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lon: null,
      north: null,
      east: null,
      zone: '',
      datum: ''
    };
    this.bindValue = this.bindValue.bind(this);
    this.goToCoordinate = this.goToCoordinate.bind(this);
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
              <input required className="pure-input-1" key="lon" type="number" step="any" name="lon" placeholder="Longitude"
                value={this.state.lon} onChange={this.bindValue} />
              <button className="button button-royal button-capitalize submit" type="submit">
                ir para
              </button>
          </form>
        </div>
      );
    } else {
      return (
        <div id="goto-body">
          <form className="pure-form" onSubmit={this.goToCoordinate}>
            <div className="pure-g">
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="north" type="number" step="any" name="north" placeholder="Norte"
                  value={this.state.north} onChange={this.bindValue} />
              </div>
              <div className="pure-u-1 l-box-bottom">
                <input required className="pure-input-1" key="east" type="number" step="any" name="east" placeholder="Leste"
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

  bindValue(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getLatLon() {
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

  goToCoordinate(e) {
    e.preventDefault();
    Actions.goToCoordinate(this.getLatLon());
  }
}
