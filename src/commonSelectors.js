const selectPageCount = (itemCount, pageSize) => Math.ceil(itemCount / pageSize);

const selectPage = (items, currentPage, pageSize = 10) =>
  items.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

export default {
  selectPage,
  selectPageCount,
};
