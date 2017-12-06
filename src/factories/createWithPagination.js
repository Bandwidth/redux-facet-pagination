import { compose, lifecycle } from 'recompose';
import actions from '../actions';
import { connect as defaultConnect } from 'react-redux';
import { defaultsDeep, pick } from 'lodash';

export default (selectors, createSelectors) => (selectItems, options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect });

  const createMapStateToProps = (selectItems) => {
    /* if selectItems is a selector function */
    if (typeof selectItems === 'function') {
      const advancedSelectors = createSelectors(selectItems);

      return (state, ownProps) => {
        const items = selectItems(state);
        return {
          currentPage: selectors.createCurrentPageSelector(ownProps.facetName)(state),
          pageSize: selectors.createPageSizeSelector(ownProps.facetName)(state) || ownProps.pageSize,
          pageCount: advancedSelectors.createPageCountSelector(ownProps.facetName)(state),
        };
      };
    /* if selectItems is a prop name */
    } else if (typeof selectItems === 'string') {
      return (state, ownProps) => {
        return {
          currentPage: selectors.createCurrentPageSelector(ownProps.facetName)(state),
          pageSize: selectors.createPageSizeSelector(ownProps.facetName)(state) || ownProps.pageSize,
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

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    nextPage: () => {
      if (stateProps.pageCount) {
        dispatchProps.setPage(Math.min(stateProps.pageCount - 1, stateProps.currentPage + 1));
      } else {
        dispatchProps.setPage(stateProps.currentPage + 1);
      }
    },
    previousPage: () => {
      dispatchProps.setPage(Math.max(0, stateProps.currentPage - 1))
    },
  });

  return compose(
    defaultedOptions.connect(
      mapStateToProps,
      mapDispatchToProps,
      mergeProps,
      // pass through connect options from HOC options
      pick(defaultedOptions, [
        'pure',
        'areStatesEqual',
        'areOwnPropsEqual',
        'areStatePropsEqual',
        'areMergedPropsEqual',
        'storeKey',
      ]),
    ),
    lifecycle({
      componentDidMount() {
        this.props.setPage(this.props.currentPage, this.props.pageSize || 10);
      },
    }),
  );
};
