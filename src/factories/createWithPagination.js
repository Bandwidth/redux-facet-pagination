import { compose, lifecycle } from 'recompose';
import actions from '../actions';
import { connect as defaultConnect } from 'react-redux';
import { defaultsDeep, pick } from 'lodash';

export default selectors => (options) => {
  const defaultedOptions = defaultsDeep(options, { connect: defaultConnect });

  const mapStateToProps = (state, ownProps) => ({
    currentPage: selectors.createCurrentPageSelector(ownProps.facetName)(state),
    pageSize: selectors.createPageSizeSelector(ownProps.facetName)(state) || ownProps.pageSize,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    setPage: (page = 0, pageSize = ownProps.pageSize) => ownProps.facetDispatch(actions.setPage(page, pageSize)),
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    nextPage: () => {
      if (ownProps.pageCount) {
        dispatchProps.setPage(Math.min(ownProps.pageCount - 1, stateProps.currentPage + 1));
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
        this.props.setPage(this.props.currentPage);
      },
    }),
  );
};
