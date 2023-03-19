import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { Column, useTable } from "react-table";

import makeData, { RowType } from "./makeData";

function Table({
  columns,
  data,
}: {
  columns: Column<RowType>[];
  data: RowType[];
}) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()} stickyHeader size="small">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

function App() {
  const formatLocale = ({ value }: { value: number }) => value.toLocaleString();
  const formatAmount = ({ value }: { value: number }) =>
    value ? `₩${value.toLocaleString()}` : "-";

  const columns = React.useMemo(
    () => [
      {
        Header: "월급여액(천원)\n[비과세 및 학자금 제외]",
        columns: [
          {
            Header: "이상",
            accessor: "minInclusive",
            Cell: formatLocale,
          },
          {
            Header: "미만",
            accessor: "maxExclusive",
            Cell: formatLocale,
          },
        ],
      },
      {
        Header: "계산 과정 (1인 기준)",
        columns: [
          {
            Header: "총급여액",
            accessor: "total",
            Cell: formatAmount,
          },
          {
            Header: "과세표준",
            accessor: "taxBase",
            Cell: formatAmount,
          },
          {
            Header: "산출세액",
            accessor: "calculatedTax",
            Cell: formatAmount,
          },
          {
            Header: "결정세액",
            accessor: "determinatedTax",
            Cell: formatAmount,
          },
        ],
      },
      {
        Header: "공제대상가족의 수",
        columns: new Array(11).fill(undefined).map((_, i) => ({
          Header: `${i + 1}`,
          accessor: `${i + 1}`,
          Cell: formatAmount,
        })),
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData("2023-02-28"), []);

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
