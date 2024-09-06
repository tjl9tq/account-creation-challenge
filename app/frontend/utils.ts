export const getCSRFToken = () => document.querySelector('[name="csrf-token"]')?.getAttribute('content') ?? '';

export const isProd = () => {
  // TODO: update with env variables
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(callback: T, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) window.clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};
