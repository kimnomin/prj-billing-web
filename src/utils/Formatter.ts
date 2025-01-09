const Formatter = {
  formatDate: (dateStr: string): string => {
    const match = RegExp(/^(\d{4})(\d{2})(\d{2})?$/).exec(dateStr);
    if (match) {
      const [, year, month, day] = match;
      return `${year}. ${month}.` + (day ? ` ${day}.` : '');
    } else {
      return dateStr;
    }
  },

  formatDateToYYYYMMDD: (date: Date) => {
    const dateStr = [
      date.getFullYear(), 
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ];
    return dateStr.join('');
  },

  addComma: (value: string | number | undefined) => {
    if (value) {
      return value.toLocaleString("ko-KR");
    }
    return value;
  }
};

export default Formatter;
