import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import CatsList from './containers/CatsList';
import DogsList from './containers/DogsList';

const store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <div style={{ fontFamily: 'sans-serif', padding: '12px' }}>
      <h1>redux-facet-pagination example app</h1>
      <p>
        In this example app, we see how individual facets can wire in pagination,
        which helps us paginate collections of different items without duplicating
        code.
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          height: '100%',
        }}
      >
        <CatsList name="Cats" pageSize={2} />
        <DogsList name="Dogs" pageSize={3} />
      </div>
    </div>
  </Provider>,
  document.getElementById('main'),
);
