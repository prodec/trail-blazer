import keyMirror from 'keymirror';

export const MenuConstants = keyMirror({
  MENU_ITEMS: ['goto', 'marker', 'line', 'battery', 'tie']
)};

export const MarkerConstants = keyMirror({
  ICONS: ['radio-station', 'helicopter', 'high-building', 'mountains', 'power-line', 'birds', 'tree']
)};

export const ActionConstants = keyMirror({
  ADD_MAP: null,
  GO_TO: null,
  ADD_ITEM: null,
  REMOVE_ITEM: null,
  CHANGE_CURSOR: null
});

export const EventConstants = keyMirror({
  CHANGE: null,
  CHANGE_CURSOR: null,
  CHANGE_MAP: null,
  CHANGE_GO_TO: null,
  CHANGE_CURSOR: null,
});

export const GoToTabConstants = {
  POS_GEO: 'geo',
  POS_UTM: 'utm'
};

export const SettingConstants = {
  DEFAULT_PROJECTION: 'EPSG:4326',
  MAP_PROJECTION: 'EPSG:4326'
};
