import { createPaginationSelectors } from '../../src/immutable';

const itemsSelector = state => state.get('cats').toJS();

export default createPaginationSelectors(itemsSelector);
