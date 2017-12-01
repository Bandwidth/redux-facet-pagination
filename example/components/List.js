import React from 'react';
import Item from './Item';
import Pagination from './Pagination';

export default ({ items, currentPage, pageCount, nextPage, previousPage, pageSize }) => (
  <div style={{ display: 'flex', flexDirection: 'column', padding: '12px' }}>
    {items.map(item => <Item key={item.name}>{item.name}, {item.age}</Item>)}
    <Pagination currentPage={currentPage} pageCount={pageCount} nextPage={nextPage} previousPage={previousPage} />
    <div>Page size: {pageSize}</div>
  </div>
);
