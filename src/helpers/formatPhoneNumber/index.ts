const formatPhoneNumber = (number: string) => {
  let numberFormatted = '';
  const digits = number.replace(/\D/g, '');

  for (let i = 0; i < digits.length; i++) {
    if (i === 0) {
      numberFormatted += `(${digits[i]}`;
    } else if (i === 1) {
      numberFormatted += `${digits[i]}) `;
    } else if (i === 6) {
      numberFormatted += `${digits[i]}-`;
    } else {
      numberFormatted += digits[i];
    }
  }

  return numberFormatted;
};

export { formatPhoneNumber };
