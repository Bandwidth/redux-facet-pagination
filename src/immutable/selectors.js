import { selectors } from '@bandwidth/redux-facet/immutable';
import reducer from './reducer';
import { createSelector } from 'reselect';
import commonSelectors from '../commonSelectors';

const createImmutablePaginationSelector = facetName => createSelector(selectors.createFacetStateSelector(facetName), facetState => facetState.get(reducer.key));

const createPaginationSelector = facetName => createSelector(createImmutablePaginationSelector(facetName), pagination => pagination.toJS());

const createCurrentPageSelector = facetName => createSelector(createImmutablePaginationSelector(facetName), pagination => pagination.get('page'));

const createPageSizeSelector = facetName => createSelector(createImmutablePaginationSelector(facetName), pagination => pagination.get('pageSize'));

export default {
  createPaginationSelector,
  createCurrentPageSelector,
  createPageSizeSelector,
  ...commonSelectors,
};
