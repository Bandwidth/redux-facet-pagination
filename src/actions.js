import { createActions } from 'redux-actions';

const NAMESPACE = '@@redux-facet-pagination';

const actions = createActions({
  [NAMESPACE]: {
    SET_PAGE: (page, pageSize) => ({ page, pageSize }),
  },
});

export default actions.reduxFacetPagination;
