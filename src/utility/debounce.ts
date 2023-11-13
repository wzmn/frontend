export function debounce(
  callback: (...args: any) => void,
  delay: number = 500
) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
