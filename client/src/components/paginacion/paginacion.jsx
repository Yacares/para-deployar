import React, { useEffect, useState } from 'react';
import './paginacion.css';  

function Paginacion({ totalItems, pageSize, currentPage, onPageChange }) {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  const pageRangeToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(pageRangeToShow / 2));
  let endPage = Math.min(startPage + pageRangeToShow - 1, totalPages);

  if (totalPages - endPage < Math.floor(pageRangeToShow / 2)) {
    startPage = Math.max(1, startPage - (Math.floor(pageRangeToShow / 2) - (totalPages - endPage)));
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className='pagination'>
      <a className='lista-pagination' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        {'<<'}
      </a>
      <a className='lista-pagination' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        {'<'}
      </a>

      {pages.map((page) => (
        <a
          className={`lista-pagination ${page === currentPage ? 'active' : ''}`}
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={page === currentPage}
        >
          {page}
        </a>
      ))}

      <a className='lista-pagination' onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
        {'>'}
      </a>
      <a className='lista-pagination' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0}>
        {'>>'}
      </a>
    
      <div className='pagination-info'>
      </div>
    </div>
  );
}

export default Paginacion;