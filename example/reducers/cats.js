import { handleActions } from 'redux-actions';
import actions from '../actions/cats';
import { List } from 'immutable';

const DEMO_DATA = [
  { name: 'Tiger', age: 2 },
  { name: 'Courtney', age: 3 },
  { name: 'Wink', age: 1 },
  { name: 'Percy', age: 4 },
  { name: 'Ellen', age: 7 },
  { name: 'Meep', age: 1 },
  { name: 'Xerxes', age: 4 },
];

export default handleActions({
  [actions.listCats]: (state, { payload: { cats } }) => new List(cats),
}, new List(DEMO_DATA));
