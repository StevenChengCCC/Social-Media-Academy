import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

const amplifyConfigModules = import.meta.glob('./aws-exports.{js,ts}', {
  eager: true,
  import: 'default',
});

const amplifyConfig =
  amplifyConfigModules['./aws-exports.js'] ??
  amplifyConfigModules['./aws-exports.ts'] ??
  {};

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

Amplify.configure(amplifyConfig);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);