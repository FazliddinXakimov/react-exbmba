import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import styled from "styled-components";

// Styled Table Component
const Table = ({ columns = [], data = [] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          {table.getHeaderGroups()?.map((headerGroup) => (
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
          {table.getRowModel().rows.length > 0 ? (
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

const StyledTableContainer = styled.div`
  width: 100%;
  overflow-x: auto; /* Enable horizontal scrolling */
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
`;

const StyledTable = styled.table`
  width: 100%;
  min-width: 600px; /* Ensure the table is wider than the container */
  border-collapse: collapse;
  white-space: nowrap; /* Prevent line breaks */

  thead {
    background-color: var(--primary-color);
    color: white;
  }

  th,
  td {
    padding: 12px 15px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tbody tr:not(.no-data-row):hover {
    background-color: #ddd;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  .no-data {
    text-align: center;
    font-weight: bold;
    padding: 20px;
    color: #888;
  }
`;
