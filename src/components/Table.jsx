import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styled, { keyframes } from "styled-components";

const Table = ({ columns = [], data = [], loading = false }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr className="loading-row">
              <td colSpan={columns.length || 1} className="loading">
                <Spinner />
              </td>
            </tr>
          ) : data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="no-data-row">
              <td colSpan={columns.length || 1} className="no-data">
                No Data Available
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
};

export default Table;

// Spinner Animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  width: 30px;
  height: 30px;
  border: 4px solid rgba(0, 0, 0, 0.2);
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const StyledTableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: var(--primary-color);
    color: white;
    font-size: var(--font-size-sm);
  }

  th,
  td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:hover {
    background-color: #ddd;
  }

  .loading,
  .no-data {
    text-align: center;
    font-weight: bold;
    padding: 20px;
    color: #888;
  }
`;
