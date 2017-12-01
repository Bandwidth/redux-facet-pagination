import { compose } from 'recompose';
import facet, { createStructuredFacetSelector } from '@bandwidth/redux-facet/immutable';
import withPagination from '../../src/immutable';
import selectors from '../selectors/cats';
import List from '../components/List';
import actions from '../actions/cats';

export default compose(
  facet(
    'catsList',
    createStructuredFacetSelector({
      pageCount: selectors.createPageCountSelector,
      items: selectors.createPageSelector,
    }),
    dispatch => ({
      list: () => dispatch(actions.list()),
    }),
  ),
  withPagination(),
)(List);
