import { createActions } from 'redux-actions';

export default createActions({
  listCats: cats => ({ cats }),
});
