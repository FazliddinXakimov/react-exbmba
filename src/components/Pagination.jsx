import React from "react";
import styled from "styled-components";

const Pagination = ({ page, setPage, pageSize = 10, count }) => {
  const totalPages = Math.ceil(count / pageSize);
  const getVisiblePages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    // Always add the first page
    if (page > 1) {
      pages.push(1);
    }

    // Add "..." if the current page is beyond page 3
    if (page > 3) {
      pages.push("...");
    }

    // Add previous page if it's greater than 1
    if (page > 2) {
      pages.push(page - 1);
    }

    // Add the current page
    pages.push(page);

    // Add the next page if it's not the last page
    if (page < totalPages - 1) {
      pages.push(page + 1);
    }

    // Add "..." if there are more pages beyond the next one
    if (page + 2 < totalPages) {
      pages.push("...");
    }

    // Always add the last page
    if (page !== totalPages) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <PaginationWrapper>
      <button
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        disabled={page === 1}
      >
        {"<"}
      </button>
      {getVisiblePages().map((pageNumber, index) =>
        typeof pageNumber === "number" ? (
          <button
            key={index}
            className={page === pageNumber ? "active" : ""}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ) : (
          <span key={index} className="dots">
            {pageNumber}
          </span>
        )
      )}
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

  .dots {
    padding: 8px 12px;
    color: var(--slate-color);
    user-select: none;
  }
`;
