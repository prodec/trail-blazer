import keyMirror from 'keymirror';

export const CursorConstants = {
  CURSOR_CROSSHAIR: 'crosshair',
  CURSOR_GRAB: ''
};

export const MenuConstants = {
  MENU_ITEMS: ['goto', 'marker', 'line', 'battery', 'tie']
};

export const ModeConstants = keyMirror({
  MARKER_MODE: null,
  VIEW_MODE: null,
  GO_TO_MODE: null,
  PLAN_MODE: null
});

export const MarkerConstants = {
  ICONS: ['radio-station', 'helicopter', 'high-building', 'mountains', 'power-line', 'birds', 'tree'],
  ICON_ANCHOR: [16, 35],
  POPUP_OFFSET: [0, -26]
};

export const ActionConstants = keyMirror({
  ADD_MAP: null,
  GO_TO: null,
  ADD_ITEM: null,
  REMOVE_ITEM: null,
  CHANGE_MODE: null,
  ADD_MARKER: null,
  REMOVE_MARKER: null,
  UPDATE_MARKER: null,
  SAVE_MARKER_CONTENT: null,
  MAP_CENTER_REGISTER: null,
  MOVE_MOUSE_ON_MAP: null,
  ERROR_HANDLE: null
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
  DEFAULT_PROJECTION: 'EPSG:4326',
  MAP_PROJECTION: 'EPSG:4326',
  ZOOM: 17
};
