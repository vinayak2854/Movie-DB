import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 m-1 bg-blue-500 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="px-4 py-2 m-1">{`Page ${page} of ${totalPages}`}</span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 m-1 bg-blue-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;