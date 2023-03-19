import { readFile, utils } from "xlsx";
import makeData, {
  근로소득공제율,
  종합소득세율,
  근로소득세액공제율,
} from "./makeData";

describe("누진제", () => {
  const testProgressiveCompensation = (ranges) => {
    const rangeEntries = Object.entries(ranges);
    for (let i = 1; i < rangeEntries.length; i++) {
      expect(
        ((rangeEntries[i][0] - 1) * (rangeEntries[i][1].ratio * 100)) / 100 +
          rangeEntries[i][1].compensation
      ).toBe(
        ((rangeEntries[i][0] - 1) * (rangeEntries[i - 1][1].ratio * 100)) /
          100 +
          rangeEntries[i - 1][1].compensation
      );
    }
  };
  it("근로소득공제율", () => {
    testProgressiveCompensation(근로소득공제율);
  });
  it("종합소득세율", () => {
    testProgressiveCompensation(종합소득세율);
  });
  it("근로소득세액공제율", () => {
    testProgressiveCompensation(근로소득세액공제율);
  });
});

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
