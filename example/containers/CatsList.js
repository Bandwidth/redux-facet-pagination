import { compose } from 'recompose';
import facet, { createStructuredFacetSelector } from '@bandwidth/redux-facet/immutable';
import withPaginatedData from '../../src/immutable';
import selectors from '../selectors/cats';
import List from '../components/List';
import actions from '../actions/cats';

export default compose(
  facet(
    'catsList',
    null,
    dispatch => ({
      list: () => dispatch(actions.list()),
    }),
  ),
  withPaginatedData(selectors.selectCats, { dataPropName: 'items' }),
)(List);
