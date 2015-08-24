import React from 'react';

// Styles
import 'leaflet/dist/leaflet.css';
import 'purecss';
import 'material-design-lite/material.min.css';
import '../css/lib/buttons.css';
import '../css/lib/glyphicons.css';
import '../css/lib/style.css';
import '../css/app.scss';

// JS
import 'material-design-lite/material.min.js';
import './lib/buttons';

// React
import App from './components/app';

React.render(<App />, document.body);
