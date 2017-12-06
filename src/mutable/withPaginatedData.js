import createWithPaginatedData from '../factories/createWithPaginatedData';
import selectors from './selectors';
import withPagination from './withPagination';

export default createWithPaginatedData(selectors, withPagination);
