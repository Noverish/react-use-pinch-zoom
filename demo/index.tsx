import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Default from './pages/default';
import ZoomScale from './pages/zoom-scale';
import OnTransform from './pages/on-transform';
import SizeDiff from './pages/size-diff';
import Hierarchy from './pages/hierarchy';
import Div from './pages/div';

const App = () => {
  return (
    <>
      <h1 className="display-2">React-Use-Pinch-Zoom Demo</h1>
      <a href="https://github.com/Noverish/react-use-pinch-zoom">Github</a>
      <br />
      <a href="https://www.npmjs.com/package/react-use-pinch-zoom">NPM</a>
      <Default />
      <ZoomScale />
      <OnTransform />
      <SizeDiff />
      <Hierarchy />
      <Div />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
