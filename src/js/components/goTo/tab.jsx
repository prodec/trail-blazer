import React from 'react';
import classNames from 'classnames';

export default class Tab extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let classes = classNames(
      'button',
      'button-royal',
      'button-capitalize',
      { 'active': this.isActive() }
    );

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
