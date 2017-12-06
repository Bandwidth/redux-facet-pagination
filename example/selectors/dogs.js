export default {
  selectDogs: state => state.get('dogs').toJS(),
};
