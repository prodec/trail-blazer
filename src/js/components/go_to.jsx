import React from 'react';
import { goTo } from '../constants/constants';
import classNames from 'classnames';

export default class GoTo extends React.Component {
  constructor() {
    super();
    this.state = { selectedTab: goTo.POS_GEO };
  }

  render() {
    let goToKeys = Object.keys(goTo);
    let width = `${100 / goToKeys.length}%`;
    let tabs = goToKeys.map(key => {
      return (
        <Tab selectedTab={this.state.selectedTab}
          value={goTo[key]}
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
    this.state = { zone: '', datum: '' };
    this._bindValue = this._bindValue.bind(this);
  }

  render() {
    if (this.props.selectedTab === goTo.POS_GEO) {
      return (
        <div id="goto-body">
          <form className="pure-form">
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="lat" type="text" name="lat" placeholder="Latitude"
                  value={this.state.lat} onChange={this._bindValue} />
              </div>
              <input required className="pure-input-1" key="lon" type="text" name="lon" placeholder="Longitude"
                value={this.state.lon} onChange={this._bindValue} />
              <button className="button button-royal button-capitalize submit" type="button">
                ir para
              </button>
          </form>
        </div>
      );
    } else {
      return (
        <div id="goto-body">
          <form className="pure-form">
            <div className="pure-g">
              <div className="pure-u-1 l-box-top l-box-bottom">
                <input required className="pure-input-1" key="north" type="text" name="north" placeholder="Norte"
                  value={this.state.north} onChange={this._bindValue} />
              </div>
              <div className="pure-u-1 l-box-bottom">
                <input required className="pure-input-1" key="east" type="text" name="east" placeholder="Leste"
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
            <button className="button button-royal button-capitalize submit" type="button"
              onClick={this._sendCoordinates}>
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

  _sendCoordinates() {

  }
}
