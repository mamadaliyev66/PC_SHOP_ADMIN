import { isToday, isYesterday, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, subWeeks } from 'date-fns';

export function categorizeOrderDate(orderDate) {
  const date = orderDate instanceof Date ? orderDate : orderDate.toDate();

  const today = new Date();
  const thisWeekStart = startOfWeek(today, { weekStartsOn: 1 }); // Week starts on Monday
  const thisWeekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const lastWeekStart = subWeeks(thisWeekStart, 1);
  const lastWeekEnd = subWeeks(thisWeekEnd, 1);
  const thisMonthStart = startOfMonth(today);
  const thisMonthEnd = endOfMonth(today);

  if (isToday(date)) {
    return 'Bugun';
  } else if (isYesterday(date)) {
    return 'Kecha';
  } else if (isWithinInterval(date, { start: thisWeekStart, end: thisWeekEnd })) {
    return 'Shu hafta ichida';
  } else if (isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd })) {
    return 'O`tkan haftada';
  } else if (isWithinInterval(date, { start: thisMonthStart, end: thisMonthEnd })) {
    return 'Shu oyda';
  } else {
    return 'Older';
  }
}
