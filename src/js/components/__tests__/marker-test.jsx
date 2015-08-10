import $ from 'jquery';
import React from 'react/addons';

const { addons: { TestUtils } } = React;

jest
  .dontMock('../marker')
  .dontMock('../../stores/store')
  .dontMock('../../constants/constants')
  .dontMock('keymirror');

describe('Marker', () => {
  let Marker = require('../marker');
  let Actions = require('../../actions/actions');
  let marker;
    
  beforeEach(() => {
    marker = TestUtils.renderIntoDocument(<Marker />);
  });

  it('changes the active marker icon', () => {
    let icon = marker.refs[1];

    TestUtils.Simulate.click(icon)
    expect(marker.state.active).toEqual('helicopter'); 
  });

  it('adds a marker icon', () => {
    let e =  { latlng: [1, 2] };

    marker.addMarker(e);
    expect(Actions.addMarker).toBeCalled();
  });

  it('updates text content', () => {
    let node = TestUtils.findRenderedDOMComponentWithTag(marker, 'textarea');
    let value = 'newtext';

    TestUtils.Simulate.change(node, { target: { value } });
    expect(marker.state.text).toEqual(value);
  });
});
