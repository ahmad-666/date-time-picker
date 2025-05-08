import dayjs from 'dayjs';
//* Init plugins ...............................
import jalali from '@zoomit/dayjs-jalali-plugin';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import toObject from 'dayjs/plugin/toObject';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
//* Create dayjs custom instance ...................
const dayjsExtended = dayjs;
dayjsExtended.extend(jalali);
dayjsExtended.extend(utc);
dayjsExtended.extend(customParseFormat);
dayjsExtended.extend(objectSupport);
dayjsExtended.extend(toObject);
dayjsExtended.extend(duration);
dayjsExtended.extend(isBetween);
//* Exports ...................
export default dayjsExtended;

/*
On localhost our system is both server/browser but on online site host is nextjs server and each user's browser is final browser.
src/App/page.tsx:
    const currentD = dayjs() //find current date on nextjs server like layout,pages,... and use that as point in time that will be same for all users even if they have different time,date,timezone on their systems.
*/
