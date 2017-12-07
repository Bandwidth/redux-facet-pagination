import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../constants';
import commonSelectors from '../commonSelectors';

export default facetSelectors => {
  const selectPaginationFromFacetState = facetState => facetState[REDUCER_KEY];

  const createPaginationSelector = facetName => createSelector(
    facetSelectors.createFacetStateSelector(facetName),
    selectPaginationFromFacetState,
  );

  const selectCurrentPage = pagination => pagination.page;

  const createCurrentPageSelector = facetName => createSelector(
    createPaginationSelector(facetName),
    selectCurrentPage,
  );

  const selectCurrentPageFromFacetState = createSelector(
    selectPaginationFromFacetState,
    selectCurrentPage,
  );

  const selectPageSize = pagination => pagination.pageSize;

  const createPageSizeSelector = facetName => createSelector(
    createPaginationSelector(facetName),
    selectPageSize,
  );

  const selectPageSizeFromFacetState = createSelector(
    selectPaginationFromFacetState,
    selectPageSize,
  );

  return {
    createPaginationSelector,
    createCurrentPageSelector,
    createPageSizeSelector,

    selectPaginationFromFacetState,
    selectCurrentPageFromFacetState,
    selectPageSizeFromFacetState,

    ...commonSelectors,
  };
};
