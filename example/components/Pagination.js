import React from 'react';

const styles = { margin: '0 12px' };

export default ({ currentPage, pageCount, nextPage, previousPage }) => (
  <div>
    <a style={styles} href="#" onClick={previousPage}>&lt;&lt;</a>
    <span style={styles}>{currentPage}</span>
    <a
      style={styles}
      href="#"
      onClick={() => {
        if (currentPage < pageCount) {
          nextPage();
        }
      }}
    >
      &gt;&gt;
    </a>
  </div>
);
