import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import makeData, { dependentFamilyRange, RowType } from "./makeData";

function Table({
  columns,
  data,
}: {
  columns: ColumnDef<RowType>[];
  data: RowType[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Render the UI for your table
  return (
    <MaUTable stickyHeader size="small">
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </MaUTable>
  );
}

function App() {
  const formatLocale = (info: CellContext<RowType, any>) =>
    info.getValue().toLocaleString();
  const formatAmount = (info: CellContext<RowType, any>) =>
    info.getValue() ? `₩${info.getValue().toLocaleString()}` : "-";

  const columnHelper = createColumnHelper<RowType>();

  const columns = [
    columnHelper.group({
      header: "월급여액(천원)\n[비과세 및 학자금 제외]",
      columns: [
        columnHelper.accessor("minInclusive", {
          cell: formatLocale,
          header: "이상",
        }),
        columnHelper.accessor("maxExclusive", {
          cell: formatLocale,
          header: "미만",
        }),
      ],
    }),
    columnHelper.group({
      header: "계산 과정 (1인 기준)",
      columns: [
        columnHelper.accessor("total", {
          cell: formatAmount,
          header: "총급여액",
        }),
        columnHelper.accessor("taxBase", {
          cell: formatAmount,
          header: "과세표준",
        }),
        columnHelper.accessor("calculatedTax", {
          cell: formatAmount,
          header: "산출세액",
        }),
        columnHelper.accessor("determinatedTax", {
          cell: formatAmount,
          header: "결정세액",
        }),
      ],
    }),
    columnHelper.group({
      header: "공제대상가족의 수",
      columns: dependentFamilyRange.map((i) =>
        columnHelper.accessor((row) => row[i], {
          cell: formatAmount,
          header: `${i}`,
        })
      ),
    }),
  ];

  const [data, setData] = React.useState(() => makeData("2024-02-29"));

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
