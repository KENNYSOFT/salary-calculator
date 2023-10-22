// https://stackoverflow.com/a/76176570

export const ObjectEntries = <T extends Record<PropertyKey, unknown>>(
  obj: T
): { [K in keyof T]: [K, T[K]] }[keyof T][] => {
  return Object.entries(obj) as { [K in keyof T]: [K, T[K]] }[keyof T][];
};

export const ObjectFromEntries = <
  const T extends ReadonlyArray<readonly [PropertyKey, unknown]>
>(
  entries: T
): { [K in T[number] as K[0]]: K[1] } => {
  return Object.fromEntries(entries) as { [K in T[number] as K[0]]: K[1] };
};
