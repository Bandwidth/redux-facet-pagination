import createWithPagination from '../factories/createWithPagination';
import selectors from './selectors';
import createSelectors from './createSelectors';
import facet, { withFacetData } from '@bandwidth/redux-facet';

export default createWithPagination(selectors, createSelectors, facet, withFacetData);
