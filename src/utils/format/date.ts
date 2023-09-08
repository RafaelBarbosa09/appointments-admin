export const formatDateTime = (date: Date): string => {
  if (!date) return '';

  const locale = 'pt-BR';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const now = new Date();

  if (isSameDay(date, now) &&
    isSameMonth(date, now) &&
    isSameYear(date, now)) {
    return 'hoje, ' + new Date(date).toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }

  return new Date(date).toLocaleDateString(locale, options);
}

const isSameDay = (date1: Date, date2: Date): boolean => {
  return new Date(date1).getDate() === date2.getDate();
}

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return new Date(date1).getMonth() === date2.getMonth();
}

const isSameYear = (date1: Date, date2: Date): boolean => {
  return new Date(date1).getFullYear() === date2.getFullYear();
}