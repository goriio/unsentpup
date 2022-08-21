import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);

export function dateFormat(date: string | number | Date) {
  return dayjs(date).utc().tz(dayjs.tz.guess()).format('MMM D, YYYY h:mm A');
}

export default dayjs;
