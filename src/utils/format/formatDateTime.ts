export const formatDateTime = (date: Date): string => {
  const locale = 'pt-BR';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  return new Date(date).toLocaleDateString(locale, options);
}