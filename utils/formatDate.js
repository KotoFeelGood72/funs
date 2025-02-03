export function formatDate(dateString, formatType = "both", locale = "ru-RU") {
  const date = new Date(dateString);

  // Форматируем только время
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  // Форматируем только дату
  const datePart = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    weekday: "short",
  }).format(date);

  // Возвращаем в зависимости от запрашиваемого формата
  if (formatType === "time") return time;
  if (formatType === "date") return datePart;
  return { time, date: datePart };
}
