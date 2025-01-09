const ArrayUtils = {
  sumByKeys: <T, K extends keyof T, S extends keyof T>(
    array: T[],
    keys: T[K][],
    matchKey: K,
    sumKey: S
  ): number => {
    const map = new Map(array.map((item) => [item[matchKey], item]));
    return keys.reduce((sum: number, key) => {
      const item = map.get(key);
      return item ? sum + (item[sumKey] as number) : sum;
    }, 0);
  }
}

export default ArrayUtils;
