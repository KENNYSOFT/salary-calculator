const 근로소득간이세액표_기준일자 = {
  "2015-06-30": {
    근로소득공제율: "2014-01-01",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2013-03-26",
    종합소득세율: "2014-01-01",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
  "2017-02-03": {
    근로소득공제율: "2014-01-01",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2013-03-26",
    종합소득세율: "2016-12-20",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
  "2018-02-13": {
    근로소득공제율: "2014-01-01",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2017-03-27",
    종합소득세율: "2017-12-19",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
  "2020-02-11": {
    근로소득공제율: "2019-12-31",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2017-03-27",
    종합소득세율: "2017-12-19",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
  "2021-02-17": {
    근로소득공제율: "2019-12-31",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2017-03-27",
    종합소득세율: "2020-12-29",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
  "2023-02-28": {
    근로소득공제율: "2019-12-31",
    특별소득공제_및_특별세액공제_중_일부: "2015-06-30",
    국민연금_기준소득월액_상한액: "2017-03-27",
    종합소득세율: "2022-12-31",
    근로소득세액공제율: "2014-01-01",
    근로소득세액공제_한도: "2014-01-01",
  },
};

const 근로소득공제율 = {
  // 구 소득세법(2019. 12. 31. 법률 제16834호로 개정되기 전의 것) 제47조 제1항.
  "2014-01-01": {
    0: { percent: 70, compensation: 0 },
    5_000_001: { percent: 40, compensation: 1_500_000 },
    15_000_001: { percent: 15, compensation: 5_250_000 },
    45_000_001: { percent: 5, compensation: 9_750_000 },
    100_000_001: { percent: 2, compensation: 12_750_000 },
  },
  // 소득세법 제47조 제1항.
  "2019-12-31": {
    0: { percent: 70, compensation: 0 },
    5_000_001: { percent: 40, compensation: 1_500_000 },
    15_000_001: { percent: 15, compensation: 5_250_000 },
    45_000_001: { percent: 5, compensation: 9_750_000 },
    100_000_001: { percent: 2, compensation: 12_750_000 },
    // TODO: "공제액이 2천만원을 초과하는 경우에는 2천만원을 공제한다."
  },
};

const 특별소득공제_및_특별세액공제_중_일부 = {
  // 소득세법 시행령 제189조 제1항.
  "2015-06-30": {
    1: {
      0: (total) => 3_100_000 + total * 0.04,
      30_000_001: (total) =>
        3_100_000 + total * 0.04 - (total - 30_000_000) * 0.05,
      45_000_001: (total) => 3_100_000 + total * 0.015,
      70_000_001: (total) => 3_100_000 + total * 0.005,
    },
    2: {
      0: (total) => 3_600_000 + total * 0.04,
      30_000_001: (total) =>
        3_600_000 + total * 0.04 - (total - 30_000_000) * 0.05,
      45_000_001: (total) => 3_600_000 + total * 0.02,
      70_000_001: (total) => 3_600_000 + total * 0.01,
    },
    3: {
      0: (total) =>
        5_000_000 + total * 0.07 + Math.max(total - 40_000_000, 0) * 0.04,
      30_000_001: (total) =>
        5_000_000 +
        total * 0.07 -
        (total - 30_000_000) * 0.05 +
        Math.max(total - 40_000_000, 0) * 0.04,
      45_000_001: (total) =>
        5_000_000 + total * 0.05 + Math.max(total - 40_000_000, 0) * 0.04,
      70_000_001: (total) =>
        5_000_000 + total * 0.03 + Math.max(total - 40_000_000, 0) * 0.04,
    },
  },
};

const 국민연금_기준소득월액_상한액 = {
  // 구 국민연금 기준소득월액 하한액과 상한액(2014. 3. 28. 보건복지부고시 제2014-47호로 개정되기 전의 것) 제1호 (가)목.
  "2013-03-26": 3_980_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2015. 3. 27. 보건복지부고시 제2015-56호로 개정되기 전의 것) 제1호 (가)목.
  "2014-03-28": 4_080_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2016. 3. 23. 보건복지부고시 제2016-41호로 개정되기 전의 것) 제1호 (가)목.
  "2015-03-27": 4_210_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2017. 3. 27. 보건복지부고시 제2017-54호로 개정되기 전의 것) 제1호 (가)목.
  "2016-03-23": 4_340_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2018. 3. 27. 보건복지부고시 제2018-54호로 개정되기 전의 것) 제1호 (가)목.
  "2017-03-27": 4_490_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2019. 3. 29. 보건복지부고시 제2019-56호로 개정되기 전의 것) 제1호 (가)목.
  "2018-03-27": 4_680_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2020. 3. 31. 보건복지부고시 제2020-66호로 개정되기 전의 것) 제1호 (가)목.
  "2019-03-29": 4_860_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2021. 3. 31. 보건복지부고시 제2021-96호로 개정되기 전의 것) 제1호 (가)목.
  "2020-03-31": 5_030_000,
  // 구 국민연금 기준소득월액 하한액과 상한액(2022. 3. 31. 보건복지부고시 제2022-71호로 개정되기 전의 것) 제1호 (가)목.
  "2021-03-31": 5_240_000,
  // 국민연금 기준소득월액 하한액과 상한액 제1호 (가)목.
  "2022-03-31": 5_530_000,
};

const 종합소득세율 = {
  // 구 소득세법(2016. 12. 20. 법률 제14389호로 개정되기 전의 것) 제55조 제1항.
  "2014-01-01": {
    0: { percent: 6, compensation: 0 },
    12_000_001: { percent: 15, compensation: -1_080_000 },
    46_000_001: { percent: 24, compensation: -5_220_000 },
    88_000_001: { percent: 35, compensation: -14_900_000 },
    150_000_001: { percent: 38, compensation: -19_400_000 },
  },
  // 구 소득세법(2017. 12. 19. 법률 제15225호로 개정되기 전의 것) 제55조 제1항.
  "2016-12-20": {
    0: { percent: 6, compensation: 0 },
    12_000_001: { percent: 15, compensation: -1_080_000 },
    46_000_001: { percent: 24, compensation: -5_220_000 },
    88_000_001: { percent: 35, compensation: -14_900_000 },
    150_000_001: { percent: 38, compensation: -19_400_000 },
    500_000_001: { percent: 40, compensation: -29_400_000 },
  },
  // 구 소득세법(2020. 12. 29. 법률 제17757호로 개정되기 전의 것) 제55조 제1항.
  "2017-12-19": {
    0: { percent: 6, compensation: 0 },
    12_000_001: { percent: 15, compensation: -1_080_000 },
    46_000_001: { percent: 24, compensation: -5_220_000 },
    88_000_001: { percent: 35, compensation: -14_900_000 },
    150_000_001: { percent: 38, compensation: -19_400_000 },
    300_000_001: { percent: 40, compensation: -25_400_000 },
    500_000_001: { percent: 42, compensation: -35_400_000 },
  },
  // 구 소득세법(2022. 12. 31. 법률 제19196호로 개정되기 전의 것) 제55조 제1항.
  "2020-12-29": {
    0: { percent: 6, compensation: 0 },
    12_000_001: { percent: 15, compensation: -1_080_000 },
    46_000_001: { percent: 24, compensation: -5_220_000 },
    88_000_001: { percent: 35, compensation: -14_900_000 },
    150_000_001: { percent: 38, compensation: -19_400_000 },
    300_000_001: { percent: 40, compensation: -25_400_000 },
    500_000_001: { percent: 42, compensation: -35_400_000 },
    1_000_000_001: { percent: 45, compensation: -65_400_000 },
  },
  // 소득세법 제55조 제1항.
  "2022-12-31": {
    0: { percent: 6, compensation: 0 },
    14_000_001: { percent: 15, compensation: -1_260_000 },
    50_000_001: { percent: 24, compensation: -5_760_000 },
    88_000_001: { percent: 35, compensation: -15_440_000 },
    150_000_001: { percent: 38, compensation: -19_940_000 },
    300_000_001: { percent: 40, compensation: -25_940_000 },
    500_000_001: { percent: 42, compensation: -35_940_000 },
    1_000_000_001: { percent: 45, compensation: -65_940_000 },
  },
};

const 근로소득세액공제율 = {
  // 구 소득세법(2015. 5. 13. 법률 제13282호로 개정되기 전의 것) 제59조 제1항.
  "2014-01-01": {
    0: { percent: 55, compensation: 0 },
    500_001: { percent: 30, compensation: 125_000 },
  },
  // 소득세법 제59조 제1항.
  "2015-05-13": {
    0: { percent: 55, compensation: 0 },
    1_300_001: { percent: 30, compensation: 325_000 },
  },
};

const 근로소득세액공제_한도 = {
  // 구 소득세법(2015. 5. 13. 법률 제13282호로 개정되기 전의 것) 제59조 제2항.
  "2014-01-01": {
    0: (_) => 660_000,
    55_000_001: (total) =>
      Math.max(660_000 - (total - 55_000_000) * 0.5, 630_000),
    70_000_001: (total) =>
      Math.max(630_000 - (total - 70_000_000) * 0.5, 500_000),
  },
  // 구 소득세법(2022. 12. 31. 법률 제19196호로 개정되기 전의 것) 제59조 제2항.
  "2015-05-13": {
    0: () => 740_000,
    33_000_001: (total) =>
      Math.max(740_000 - (total - 33_000_000) * 0.008, 660_000),
    70_000_001: (total) =>
      Math.max(660_000 - (total - 70_000_000) * 0.5, 500_000),
  },
  // 소득세법 제59조 제2항.
  "2022-12-31": {
    0: () => 740_000,
    33_000_001: (total) =>
      Math.max(740_000 - (total - 33_000_000) * 0.008, 660_000),
    70_000_001: (total) =>
      Math.max(660_000 - (total - 70_000_000) * 0.5, 500_000),
    120_000_001: (total) =>
      Math.max(500_000 - (total - 120_000_000) * 0.5, 200_000),
  },
};

export const articles = {
  근로소득공제율,
  특별소득공제_및_특별세액공제_중_일부,
  국민연금_기준소득월액_상한액,
  종합소득세율,
  근로소득세액공제율,
  근로소득세액공제_한도,
};

const findAppliedRange = (obj, value) => {
  const keys = Object.keys(obj);
  return obj[
    keys.find(
      (k, i) =>
        value >= keys[i] && (i === keys.length - 1 || value < keys[i + 1])
    )
  ];
};

const calculateProgressive = (obj, value) => {
  return (
    (value * findAppliedRange(obj, value).percent) / 100 +
    findAppliedRange(obj, value).compensation
  );
};

const range = (len) => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const floor = (num, precision) => {
  const factor = Math.pow(10, precision);
  return Math.floor(num * factor) / factor;
};

const calculate = (revision, monthly, family) => {
  const appliedArticles = Object.fromEntries(
    Object.entries(근로소득간이세액표_기준일자[revision]).map(
      ([key, date]) => [key, articles[key][date]]
    )
  );
  const total = monthly * 12;
  const taxBase =
    total -
    calculateProgressive(appliedArticles.근로소득공제율, total) -
    family * 1_500_000 -
    findAppliedRange(
      findAppliedRange(
        appliedArticles.특별소득공제_및_특별세액공제_중_일부,
        family
      ),
      total
    )(total) -
    floor(
      Math.min(
        floor(monthly, -3),
        appliedArticles.국민연금_기준소득월액_상한액
      ) * 0.045,
      -1
    ) *
      12;
  if (taxBase <= 0) {
    return {
      total,
    };
  }
  const calculatedTax = calculateProgressive(
    appliedArticles.종합소득세율,
    taxBase
  );
  const determinatedTax =
    calculatedTax -
    Math.min(
      calculateProgressive(
        appliedArticles.근로소득세액공제율,
        calculatedTax
      ),
      findAppliedRange(appliedArticles.근로소득세액공제_한도, total)(total)
    );
  return {
    total,
    taxBase,
    calculatedTax: Math.round(calculatedTax),
    determinatedTax: Math.round(determinatedTax),
    monthlyWithholdingText:
      determinatedTax < 12_000 ? undefined : floor(determinatedTax / 12, -1),
  };
};

const newRow = (revision, minInclusive, interval) => {
  const maxExclusive = minInclusive + interval;
  const monthly = ((minInclusive + maxExclusive) / 2) * 1_000;
  return {
    minInclusive,
    maxExclusive,
    ...calculate(revision, monthly, 1),
    ...Object.fromEntries(
      range(11).map((i) => [
        i + 1,
        calculate(revision, monthly, i + 1).monthlyWithholdingText,
      ])
    ),
  };
};

export default function makeData(revision) {
  return [
    ...range(146)
      .map((i) => 770 + i * 5)
      .map((d) => newRow(revision, d, 5)),
    ...range(150)
      .map((i) => 1500 + i * 10)
      .map((d) => newRow(revision, d, 10)),
    ...range(350)
      .map((i) => 3000 + i * 20)
      .map((d) => newRow(revision, d, 20)),
    newRow(revision, 10000, 0),
  ];
}
