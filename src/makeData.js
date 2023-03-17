// 구 소득세법(2015. 12. 15. 법률 제13558호로 개정되기 전의 것) 제47조 제1항.
const 근로소득공제율 = {
  0: { ratio: 0.7, compensation: 0 },
  5_000_001: { ratio: 0.4, compensation: 1_500_000 },
  15_000_001: { ratio: 0.15, compensation: 5_250_000 },
  45_000_001: { ratio: 0.05, compensation: 9_750_000 },
  100_000_001: { ratio: 0.02, compensation: 12_750_000 },
};

// 소득세법 시행령 제189조 제1항.
const 특별소득공제_및_특별세액공제_중_일부 = {
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
};

// 소득세법 제55조 제1항.
const 종합소득세율 = {
  0: { ratio: 0.06, compensation: 0 },
  14_000_001: { ratio: 0.15, compensation: -1_260_000 },
  50_000_001: { ratio: 0.24, compensation: -5_760_000 },
  88_000_001: { ratio: 0.35, compensation: -15_440_000 },
  150_000_001: { ratio: 0.38, compensation: -19_940_000 },
  300_000_001: { ratio: 0.4, compensation: -25_940_000 },
  500_000_001: { ratio: 0.42, compensation: -35_940_000 },
  1_000_000_001: { ratio: 0.45, compensation: -65_940_000 },
};

// 구 소득세법(2015. 5. 13. 법률 제13282호로 개정되기 전의 것) 제59조 제1항.
const 근로소득세액공제율 = {
  0: { ratio: 0.55, compensation: 0 },
  500_001: { ratio: 0.3, compensation: 125_000 },
};

// 구 소득세법(2015. 5. 13. 법률 제13282호로 개정되기 전의 것) 제59조 제2항.
const 근로소득세액공제_한도 = {
  0: () => 660_000,
  55_000_001: (total) =>
    Math.max(660_000 - (total - 55_000_000) * 0.5, 630_000),
  70_000_001: (total) =>
    Math.max(630_000 - (total - 70_000_000) * 0.5, 500_000),
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
    (value * (findAppliedRange(obj, value).ratio * 100)) / 100 +
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

const calculate = (monthly, family) => {
  const total = monthly * 12;
  const taxBase =
    total -
    calculateProgressive(근로소득공제율, total) -
    family * 1_500_000 -
    findAppliedRange(
      findAppliedRange(특별소득공제_및_특별세액공제_중_일부, family),
      total
    )(total) -
    floor(Math.min(floor(monthly, -3), 4_490_000) * 0.045, -1) * 12;
  if (taxBase <= 0) {
    return {
      total,
    };
  }
  const calculatedTax = calculateProgressive(종합소득세율, taxBase);
  const determinatedTax =
    calculatedTax -
    Math.min(
      calculateProgressive(근로소득세액공제율, calculatedTax),
      findAppliedRange(근로소득세액공제_한도, total)(total)
    );
  return {
    total,
    taxBase,
    calculatedTax: Math.round(calculatedTax),
    determinatedTax: Math.round(determinatedTax),
    monthlyWithholdingText:
      determinatedTax < 12_000 ? 0 : floor(determinatedTax / 12, -1),
  };
};

const newRow = (minInclusive, interval) => {
  const maxExclusive = minInclusive + interval;
  const monthly = ((minInclusive + maxExclusive) / 2) * 1_000;
  return {
    minInclusive,
    maxExclusive,
    ...calculate(monthly, 1),
    ...Object.fromEntries(
      range(11).map((i) => [
        i + 1,
        calculate(monthly, i + 1).monthlyWithholdingText,
      ])
    ),
  };
};

export default function makeData() {
  return [
    ...range(146)
      .map((i) => 770 + i * 5)
      .map((d) => newRow(d, 5)),
    ...range(150)
      .map((i) => 1500 + i * 10)
      .map((d) => newRow(d, 10)),
    ...range(350)
      .map((i) => 3000 + i * 20)
      .map((d) => newRow(d, 20)),
    newRow(10000, 0),
  ];
}
