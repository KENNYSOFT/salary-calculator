import { readFile, utils } from "xlsx";
import makeData, {
  articlesWithRevisions,
  근로소득간이세액표_개정일자,
} from "./makeData";
import { ObjectEntries, ObjectFromEntries } from "./util";

describe("누진제", () => {
  test.each(
    ObjectEntries(articlesWithRevisions).flatMap(([articleName, revisions]) =>
      ObjectEntries(revisions).map(([revisionDate, ranges]) => ({
        articleName,
        revisionDate,
        ranges,
      }))
    )
  )("$articleName $revisionDate", ({ ranges }) => {
    const rangeEntries = ObjectEntries(ranges);
    for (let i = 1; i < rangeEntries.length; i++) {
      const amount = rangeEntries[i][0] - 1;
      expect(
        (amount * rangeEntries[i][1].percent) / 100 +
          rangeEntries[i][1].compensation
      ).toBe(
        (amount * rangeEntries[i - 1][1].percent) / 100 +
          rangeEntries[i - 1][1].compensation
      );
    }
  });
});

describe("국세청 근로소득_간이세액표(조견표) 파일과 계산 결과 일치", () => {
  test.each`
    revisionDate    | headerRowCount
    ${"2014-02-21"} | ${5}
    ${"2015-06-30"} | ${3}
    ${"2017-02-03"} | ${3}
    ${"2018-02-13"} | ${5}
    ${"2020-02-11"} | ${5}
    ${"2021-02-17"} | ${5}
    ${"2023-02-28"} | ${5}
    ${"2024-02-29"} | ${6}
  `(
    "$revisionDate",
    ({
      revisionDate,
      headerRowCount,
    }: {
      revisionDate: 근로소득간이세액표_개정일자;
      headerRowCount: number;
    }) => {
      const workbook = readFile(
        `./withholding-income-tax-table/${revisionDate}-근로소득_간이세액표(조견표).xls${
          revisionDate === "2023-02-28" || revisionDate === "2024-02-29"
            ? "x"
            : ""
        }`
      );
      const expected = utils
        .sheet_to_json<(number | string)[]>(
          workbook.Sheets[
            revisionDate === "2014-02-21"
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
            ...ObjectFromEntries(
              r
                .slice(2, 13)
                .map((amount, i) => [
                  i + 1,
                  amount === "-" ? undefined : amount || undefined,
                ])
            ),
          };
        });

      const actual = makeData(revisionDate);

      for (const [i, row] of actual.entries()) {
        expect(row, i.toString()).toMatchObject(expected[i]);
      }
    }
  );
});
