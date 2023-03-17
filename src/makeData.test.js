import { readFile, utils } from "xlsx";
import makeData from "./makeData";

it("2023-02-28", () => {
  const workbook = readFile(
    "./withholding-income-tax-table/2023-02-28-근로소득_간이세액표(조견표).xlsx"
  );
  const expected = utils
    .sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 })
    .slice(5)
    .map((r) => {
      const [minInclusive, maxExclusive] = r;
      return {
        minInclusive,
        maxExclusive,
        ...Object.fromEntries(
          r.slice(2, 13).map((amount, i) => [i + 1, amount || undefined])
        ),
      };
    });

  const actual = makeData();

  for (const [i, row] of actual.entries()) {
    expect(row, i.toString()).toMatchObject(expected[i]);
  }
});
