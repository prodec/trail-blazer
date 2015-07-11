import React from 'react';
import { GoToTabConstants } from '../../constants/constants';
import Tab from './tab';
import Form from './form';

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
          ref={key}
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
