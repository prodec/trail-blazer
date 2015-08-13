import keyMirror from 'keymirror';

export const CursorConstants = {
  CURSOR_CROSSHAIR: 'crosshair',
  CURSOR_GRAB: ''
};

export const MenuConstants = {
  MENU_ITEMS: ['goto', 'marker', 'line', 'battery', 'tie']
};

export const ModeConstants = keyMirror({
  GO_TO_MODE: null,
  MARKER_MODE: null,
  PLAN_MODE: null,
  VIEW_MODE: null
});

export const MarkerConstants = {
  ICON_ANCHOR: [16, 35],
  ICONS: ['radio-station', 'helicopter', 'high-building', 'mountains', 'power-line', 'birds', 'tree'],
  POPUP_OFFSET: [0, -26]
};

export const ActionConstants = keyMirror({
  ADD_ITEM: null,
  ADD_MAP: null,
  ADD_MARKER: null,
  CHANGE_MODE: null,
  ERROR_HANDLE: null,
  GO_TO: null,
  MAP_CENTER_REGISTER: null,
  REMOVE_ITEM: null,
  REMOVE_MARKER: null,
  SAVE_MARKER_CONTENT: null,
  MOVE_MOUSE_ON_MAP: null,
});

export const EndpointConstants = {
  WIND_SPEED_FETCH: '/api/windSpeed/'
};

export const EventConstants = keyMirror({
  CHANGE: null
});

export const GoToTabConstants = {
  POS_GEO: 'geo',
  POS_UTM: 'utm'
};

export const SettingConstants = {
  DEBOUNCE_INTERVAL: 100,
  DEFAULT_PROJECTION: 'EPSG:4326',
  MAP_PROJECTION: 'EPSG:4326',
  ZOOM: 17
};
