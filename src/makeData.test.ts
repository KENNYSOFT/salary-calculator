import { readFile, utils } from "xlsx";
import makeData, { articlesWithRevisions, Date, Progressive } from "./makeData";

describe("누진제", () => {
  const testProgressiveCompensation = (ranges: Progressive) => {
    const rangeEntries = Object.entries(ranges);
    for (let i = 1; i < rangeEntries.length; i++) {
      const amount = parseInt(rangeEntries[i][0]) - 1;
      expect(
        (amount * rangeEntries[i][1].percent) / 100 +
          rangeEntries[i][1].compensation
      ).toBe(
        (amount * rangeEntries[i - 1][1].percent) / 100 +
          rangeEntries[i - 1][1].compensation
      );
    }
  };

  const iterateRevisions = (
    articleName: string,
    article: Record<Date, Progressive>
  ) => {
    Object.entries(article).forEach(([revision, ranges]) => {
      it(`${articleName} ${revision}`, () => {
        testProgressiveCompensation(ranges);
      });
    });
  };

  iterateRevisions("근로소득공제율", articlesWithRevisions.근로소득공제율);
  iterateRevisions("종합소득세율", articlesWithRevisions.종합소득세율);
  iterateRevisions("근로소득세액공제율", articlesWithRevisions.근로소득세액공제율);
});

describe("국세청 근로소득_간이세액표(조견표) 파일과 계산 결과 일치", () => {
  const compareCalculationFromNtsFile = (
    revision: Date,
    headerRowCount: number
  ) => {
    const workbook = readFile(
      `./withholding-income-tax-table/${revision}-근로소득_간이세액표(조견표).xls${
        revision === "2023-02-28" ? "x" : ""
      }`
    );
    const expected = utils
      .sheet_to_json<(number | string)[]>(
        workbook.Sheets[
          revision === "2014-02-21"
            ? "2014.2월 간이세액표"
            : workbook.SheetNames[0]
        ],
        { header: 1 }
      )
      .slice(headerRowCount)
      .map((r) => {
        const [minInclusive, maxExclusive] = r;
        return {
          minInclusive: minInclusive === "10,000천원" ? 10000 : minInclusive,
          maxExclusive: maxExclusive === undefined ? 10000 : maxExclusive,
          ...Object.fromEntries(
            r
              .slice(2, 13)
              .map((amount, i) => [
                i + 1,
                amount === "-" ? undefined : amount || undefined,
              ])
          ),
        };
      });

    const actual = makeData(revision);

    for (const [i, row] of actual.entries()) {
      expect(row, i.toString()).toMatchObject(expected[i]);
    }
  };

  const doTest = (revision: Date, headerRowCount: number) => {
    it(revision, () => {
      compareCalculationFromNtsFile(revision, headerRowCount);
    });
  };

  doTest("2014-02-21", 5);
  doTest("2015-06-30", 3);
  doTest("2017-02-03", 3);
  doTest("2018-02-13", 5);
  doTest("2020-02-11", 5);
  doTest("2021-02-17", 5);
  doTest("2023-02-28", 5);
});
