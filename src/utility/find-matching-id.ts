export function findMatchingId(
  data: any,
  id: number,
  section: string
): number | undefined {
  let index;
  data?.[section]?.some((itm: any, key: any) => {
    if (id === itm.id) {
      index = key;
      return true;
    }
  });
  return index;
}
