import { createSelector } from 'reselect';
import { createPaginationSelectors } from '../../src/immutable';

const itemsSelector = state => state.get('dogs').toJS();

export default createPaginationSelectors(itemsSelector);
