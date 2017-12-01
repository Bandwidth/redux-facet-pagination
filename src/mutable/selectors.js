import { selectors } from '@bandwidth/redux-facet/immutable';
import reducer from './reducer';
import { createSelector } from 'reselect';
import commonSelectors from '../commonSelectors';

const createPaginationSelector = facetName => createSelector(selectors.createFacetStateSelector(facetName), facetState => facetState[reducer.key]);

const createCurrentPageSelector = facetName => createSelector(createPaginationSelector(facetName), pagination => pagination.page);

const createPageSizeSelector = facetName => createSelector(createPaginationSelector(facetName), pagination => pagination.pageSize);

export default {
  createPaginationSelector,
  createCurrentPageSelector,
  createPageSizeSelector,
  ...commonSelectors,
};
