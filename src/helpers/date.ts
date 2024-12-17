import dayjs from "dayjs";
import ru from "dayjs/locale/ru";
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isToday from "dayjs/plugin/isToday";

dayjs.extend(calendar);
dayjs.locale(ru);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
const tz = "Europe/Moscow";

export const getFormatDate = (date: Date | string, format?: string) => {
  return dayjs.tz(new Date(date), tz).format(format ?? "DD.MM.YYYY");
};

export const getCalendarDate = (
  date: Date | string,
  format?: {
    sameDay?: string;
    nextDay?: string;
    nextWeek?: string;
  },
) => {
  return dayjs.tz(date, tz).calendar(null, {
    sameDay: format?.sameDay ?? "Сегодня",
    nextDay: format?.nextDay ?? "Завтра, D MMMM",
    nextWeek: format?.nextWeek ?? "dd, D MMMM",
  });
};

export const isTodayDate = (date: Date | string) => {
  return dayjs(date).isToday();
};
