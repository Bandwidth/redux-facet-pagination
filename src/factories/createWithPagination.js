import { compose, lifecycle, withProps } from 'recompose';
import actions from '../actions';
import { defaultsDeep, pick } from 'lodash';

export default (selectors, createSelectors, facet, withFacetData) => (selectItems) => {
  const createMapStateToProps = (selectItems) => {
    /* if selectItems is a selector function */
    if (typeof selectItems === 'function') {
      const advancedSelectors = createSelectors(selectItems);

      return (facetState, ownProps, state) => {
        const items = selectItems(state);
        return {
          currentPage: selectors.selectCurrentPageFromFacetState(facetState),
          pageSize: selectors.selectPageSizeFromFacetState(facetState) || ownProps.pageSize,
          pageCount: advancedSelectors.createPageCountSelector(ownProps.facetName)(state),
        };
      };
    /* if selectItems is a prop name */
    } else if (typeof selectItems === 'string') {
      return (facetState, ownProps) => {
        return {
          currentPage: selectors.selectCurrentPageFromFacetState(facetState),
          pageSize: selectors.selectPageSizeFromFacetState(facetState) || ownProps.pageSize,
          pageCount: selectors.selectPageCount(ownProps[selectItems].length, ownProps.pageSize),
        };
      }
    } else {
      throw new Error('The first parameter of withFilteredData must be a selector function or a prop name');
    }
  }

  const mapStateToProps = createMapStateToProps(selectItems);

  const mapDispatchToProps = (dispatch, ownProps) => ({
    setPage: (page = 0, pageSize = ownProps.pageSize) => ownProps.facetDispatch(actions.setPage(page, pageSize)),
  });

  const mergeProps = (ownProps) => ({
    ...ownProps,
    nextPage: () => {
      if (ownProps.pageCount) {
        ownProps.setPage(Math.min(ownProps.pageCount - 1, ownProps.currentPage + 1));
      } else {
        ownProps.setPage(ownProps.currentPage + 1);
      }
    },
    previousPage: () => {
      ownProps.setPage(Math.max(0, ownProps.currentPage - 1))
    },
  });

  return compose(
    facet(mapDispatchToProps),
    withFacetData(mapStateToProps),
    withProps(mergeProps),
    lifecycle({
      componentDidMount() {
        this.props.setPage(this.props.currentPage, this.props.pageSize || 10);
      },
    }),
  );
};
