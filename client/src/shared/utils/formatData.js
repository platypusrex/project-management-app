const defaultOptions = {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric'
};

export function formatDate (date, options) {
  const dateOptions = {...defaultOptions, ...options};
  const dateObj = new Date(date);

  return dateObj.toLocaleString(undefined, dateOptions);
}
