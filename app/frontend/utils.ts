export const getCSRFToken = () => {
  const element = document.querySelector('[name="csrf-token"]');

  if (element instanceof HTMLMetaElement) {
    return element.content;
  }
  return '';
};
