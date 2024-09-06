export const getCSRFToken = () => document.querySelector('[name="csrf-token"]')?.getAttribute('content') ?? '';

export const isProd = () => {
  // TODO: update with env variables
  return false;
};
