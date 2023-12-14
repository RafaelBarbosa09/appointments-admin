export const formatDateTime = (date: Date): string => {
  if (!date) return '';

  const locale = 'pt-BR';

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Sao_Paulo',
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const now = new Date();
  const zonedDate = new Date(date);
  zonedDate.setHours(zonedDate.getHours() + 3);

  if (isSameDay(date, now) &&
    isSameMonth(date, now) &&
    isSameYear(date, now)) {
    return 'hoje, ' + zonedDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
  }

  return zonedDate.toLocaleDateString(locale, options);
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

export const formatDateInput = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
  let formattedValue = '';

  if (cleanedValue.length > 2) {
    formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}/${cleanedValue.slice(4, 8)}`;
  } else {
    formattedValue = cleanedValue;
  }

  return formattedValue;
};

export const formatDateForDatabase = (date: string) => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}`;
}