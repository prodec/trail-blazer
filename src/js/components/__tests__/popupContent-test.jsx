import $ from 'jquery';
import React from 'react/addons';

const { addons: { TestUtils } } = React;

jest
  .dontMock('../popupContent')
  .dontMock('../../constants/constants')
  .dontMock('keymirror');

describe('PopupContent', () => {
  let PopupContent = require('../popupContent');
  let Actions = require('../../actions/actions');
  let popupContent;

  const originalText = "hi";
  const marker = {};
    
  beforeEach(() => {
    let ui = <PopupContent text={originalText} marker={marker} />
    popupContent = TestUtils.renderIntoDocument(ui);
  });

  let fillContent = (value) => {
    let editLink = TestUtils.findRenderedDOMComponentWithClass(popupContent, 'edit-link');
    TestUtils.Simulate.click(editLink);

    let textArea = TestUtils.findRenderedDOMComponentWithTag(popupContent, 'textarea');
    TestUtils.Simulate.change(textArea, { target: { value } });
  };

  let saveContent = (value) => {
    fillContent(value);
    let saveLink = TestUtils.findRenderedDOMComponentWithClass(popupContent, 'save-link');
    TestUtils.Simulate.click(saveLink);
  }

  it('store the original text value', () => {
    expect(popupContent.state.originalText).toEqual(originalText);
  });

  it('updates the actual stored content', () => {
    const value = 'newtext';

    fillContent(value);
    expect(popupContent.state.text).toEqual(value);
  });

  it('changes the state of editing', () => {
    expect(popupContent.state.editing).toBeFalsy();

    let editLink = TestUtils.findRenderedDOMComponentWithClass(popupContent, 'edit-link');
    TestUtils.Simulate.click(editLink);

    expect(popupContent.state.editing).toBeTruthy();
  });

  it('saves the content', () => {
    let value = "text";

    saveContent(value);
    expect(Actions.updateMarker).toBeCalledWith(popupContent.state.marker,
                                                popupContent.state.text);
  });

  it('changes the editing state after save', () => {
    let value = "text";

    saveContent(value);
    expect(popupContent.state.editing).toBeFalsy();
  });

  it('returns the content to original value after cancel the editing', () => {
    let value = "text";

    fillContent(value);
    let cancelLink = TestUtils.findRenderedDOMComponentWithClass(popupContent, 'cancel-link');
    TestUtils.Simulate.click(cancelLink);
    expect(popupContent.state.text).toEqual(originalText);
  });
});
