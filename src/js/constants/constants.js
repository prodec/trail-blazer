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
  GO_TO_MODE: null
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
  CHANGE_CURSOR: null,
  CHANGE_MODE: null,
  ADD_MARKER: null,
  REMOVE_MARKER: null
});

export const EventConstants = keyMirror({
  CHANGE: null,
  CHANGE_CURSOR: null,
  CHANGE_MAP: null,
  CHANGE_GO_TO: null,
  ADD_MARKER: null,
  REMOVE_MARKER: null
});

export const GoToTabConstants = {
  POS_GEO: 'geo',
  POS_UTM: 'utm'
};

export const SettingConstants = {
  DEFAULT_PROJECTION: 'EPSG:4326',
  MAP_PROJECTION: 'EPSG:4326'
};
