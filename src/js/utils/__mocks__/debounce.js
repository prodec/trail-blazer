let debounce = jest.genMockFromModule('../../utils/debounce');

export default debounce.mockImplementation(fn => { return fn; });
