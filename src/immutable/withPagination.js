import createWithPagination from '../factories/createWithPagination';
import selectors from './selectors';
import createSelectors from './createSelectors';
import facet, { withFacetData } from '@bandwidth/redux-facet/immutable';

export default createWithPagination(selectors, createSelectors, facet, withFacetData);
