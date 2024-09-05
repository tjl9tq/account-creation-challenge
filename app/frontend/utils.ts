export const getCSRFToken = () => document.querySelector('[name="csrf-token"]')?.getAttribute('content') ?? '';
