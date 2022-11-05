import React from 'react';
import ReactDOM from 'react-dom/client';
import Render from './Render'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Render state={"state"}/>
  </React.StrictMode>
);
// hot reloading. It works by replacing a module of the application
// during runtime with an updated one so that it’s available for instant use.
module.hot.accept();