import keyMirror from 'keymirror';

export const ActionConstants = keyMirror({
  ADD_MAP: null,
  CHANGE_CURSOR: null
});

export const EventConstants = keyMirror({
  CHANGE: null,
  CHANGE_CURSOR: null,
  CHANGE_MAP: null
});

export const GoToTabConstants = {
  POS_GEO: 'geo',
  POS_UTM: 'utm'
};

export const SettingConstants = {
  DEFAULT_PROJECTION: 'EPSG:4326',
  MAP_PROJECTION: 'EPSG:4326'
};
