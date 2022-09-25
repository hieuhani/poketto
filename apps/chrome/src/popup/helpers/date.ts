export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short',
    timeStyle: 'short',
  }
) => {
  return new Intl.DateTimeFormat('en-US', options).format(date);
};
