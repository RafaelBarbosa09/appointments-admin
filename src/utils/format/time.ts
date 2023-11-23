export const formatTime = (value: string) => {
    const cleanedValue = value.replace(/\D/g, '');
    let formattedValue = '';

    if (cleanedValue.length >= 3) {
        formattedValue = `${cleanedValue.slice(0, 2)}:${cleanedValue.slice(2, 4)}`;
    } else {
        formattedValue = cleanedValue;
    }

    return formattedValue;
};