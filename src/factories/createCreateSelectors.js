import { createSelector } from 'reselect';

export default paginationSelectors => itemsSelector => {
  const createPageSelector = facetName => createSelector(
    itemsSelector,
    paginationSelectors.createCurrentPageSelector(facetName),
    paginationSelectors.createPageSizeSelector(facetName),
    paginationSelectors.selectPage,
  );

  const itemsCountSelector = createSelector(
    itemsSelector,
    items => items.length ? items.length : (items.size || 0),
  );

  const createPageCountSelector = facetName => createSelector(
    itemsCountSelector,
    paginationSelectors.createPageSizeSelector(facetName),
    paginationSelectors.selectPageCount,
  );

  return {
    createPageSelector,
    createPageCountSelector,
  };
};
