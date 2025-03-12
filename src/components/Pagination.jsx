import React from "react";
import styled from "styled-components";

const Pagination = ({ page, setPage, totalPages }) => {
  const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <PaginationWrapper>
      {/* First & Prev Buttons */}

      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
      >
        {"<"}
      </button>

      {/* Page Numbers */}
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={page === pageNumber ? "active" : ""}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next & Last Buttons */}
      <button
        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        disabled={page === totalPages}
      >
        {">"}
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 15px;

  button {
    padding: 8px 12px;
    border: none;
    background-color: var(--slate-color);
    color: white;
    cursor: pointer;
    border-radius: 5px;

    &:disabled {
      background-color: var(--slate-color);
      cursor: not-allowed;
    }

    &.active {
      background-color: var(--primary-color);
      font-weight: bold;
    }
  }
`;
