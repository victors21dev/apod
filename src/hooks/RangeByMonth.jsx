function RangeByMonth(monthIndex) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();
  const jsMonthIndex = monthIndex - 1;
  const firstDayOfMonth = new Date(currentYear, jsMonthIndex, 1);
  let lastDayOfMonth = new Date(currentYear, jsMonthIndex + 1, 0);

  if (monthIndex >= currentMonth) {
    if (monthIndex === currentMonth) {
      lastDayOfMonth = new Date(currentYear, jsMonthIndex, currentDay);
    } else {
      lastDayOfMonth = today;
    }
  }
  const formatDate = (date) => {
    const y = 2025;
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return {
    firstDay: formatDate(firstDayOfMonth),
    lastDay: formatDate(lastDayOfMonth),
  };
}

export default RangeByMonth;
