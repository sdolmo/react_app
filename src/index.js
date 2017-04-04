import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './css/style.css';
import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

const Root = () => {
  return (
    <Router>
      <div>
        <Route exact path='/' component={StorePicker} />
        <Route path='/store/:storeId' component={App} />
      </div>
    </Router>
  )
}

render(<Root/>, document.querySelector('#root'));
