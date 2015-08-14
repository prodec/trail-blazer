import $ from 'jquery';
import React from 'react/addons';

const { addons: { TestUtils } } = React;

jest
  .dontMock('../menu')
  .dontMock('../../constants/constants')
  .dontMock('../../stores/store')
  .dontMock('../../stores/modeStore')
  .dontMock('keymirror')

describe('Menu', () => {
  let Menu = require('../menu');
  let Actions = require('../../actions/actions');
  let ModeConstants = require('../../constants/constants').ModeConstants;
  let menu;

  const modes = {
    goto: ModeConstants.GO_TO_MODE,
    marker: ModeConstants.MARKER_MODE 
  }
    
  beforeEach(() => {
    menu = TestUtils.renderIntoDocument(<Menu />);
  });

  it('changes the mode based on the menu choice', () => {
    Object.keys(modes).forEach((key) => {
      let node = React.findDOMNode(menu.refs[key]);

      TestUtils.Simulate.click(node);
      expect(Actions.changeMode).toBeCalledWith(modes[key]);
    });
  });

  it('sets an active section', () => {
    let node = React.findDOMNode(menu.refs.marker);

    TestUtils.Simulate.click(node);
    expect(menu.state.active).toEqual('marker');
  });

  it('toggles off the panel if the section activated is active one', () => {
      let node = React.findDOMNode(menu.refs.marker);

      TestUtils.Simulate.click(node);
      TestUtils.Simulate.click(node);
      expect(menu.state.active).toBeNull();
  });
});
