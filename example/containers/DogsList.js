import { compose } from 'recompose';
import facet, { createStructuredFacetSelector } from '@bandwidth/redux-facet/immutable';
import withPaginatedData from '../../src/immutable';
import selectors from '../selectors/dogs';
import List from '../components/List';
import actions from '../actions/dogs';

export default compose(
  facet(
    'dogsList',
    null,
    dispatch => ({
      list: () => dispatch(actions.list()),
    }),
  ),
  withPaginatedData(selectors.selectDogs, { dataPropName: 'items' }),
)(List);
