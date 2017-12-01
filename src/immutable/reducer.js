import { handleActions } from 'redux-actions';
import actions from '../actions';
import { fromJS } from 'immutable';
import createMount from './createMount';
import { REDUCER_KEY } from '../constants';

const reducer = handleActions({
  [actions.setPage]: (state, { payload: { page, pageSize } }) => state
    .set('page', page)
    .set('pageSize', pageSize || state.get('pageSize')),
}, fromJS({ page: 0, pageSize: null }));

reducer.key = REDUCER_KEY;

/**
 * Enables users to simply call a function to attach alert reducer
 * functionality to an existing reducer under the correct key.
 *
 * @returns an enhanced reducer
 */
reducer.mount = createMount(reducer);

export default reducer;
