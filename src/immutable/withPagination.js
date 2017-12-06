import createWithPagination from '../factories/createWithPagination';
import selectors from './selectors';
import createSelectors from './createSelectors';

export default createWithPagination(selectors, createSelectors);
