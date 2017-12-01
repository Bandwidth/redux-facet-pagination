import { handleActions } from 'redux-actions';
import actions from '../actions/dogs';
import { List } from 'immutable';

const DEMO_DATA = [
  { name: 'Fido', age: 3 },
  { name: 'Buster', age: 2 },
  { name: 'Princess', age: 4 },
  { name: 'Igor', age: 7 },
  { name: 'Franco', age: 1 },
  { name: 'Oberon', age: 5 },
  { name: 'Carrie', age: 2 },
  { name: 'June', age: 1 },
];

export default handleActions({
  [actions.listDogs]: (state, { payload: { dogs } }) => new List(dogs),
}, new List(DEMO_DATA));
