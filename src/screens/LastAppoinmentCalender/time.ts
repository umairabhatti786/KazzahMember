import moment from 'moment';
import {log} from 'react-native-reanimated';

function findDuration(startTime: string, endTime: string): number {
  let start = new Date('1970-01-01 ' + startTime).getTime();
  let end = new Date('1970-01-01 ' + endTime).getTime();

  if (end < start) {
    end += 24 * 60 * 60 * 1000;
  }

  let duration = (end - start) / (60 * 1000);
  return duration;
}

function getAvailableTimeSlots(
  workingHours: Array<{startTime: string; endTime: string}>,
  breakTimes: any[],
): Array<{startTime: string; endTime: string}> {
  let availableTimeSlots = [];

  workingHours.forEach(workHour => {
    let start = new Date('1970-01-01 ' + workHour.startTime);
    let end = new Date('1970-01-01 ' + workHour.endTime);

    breakTimes = breakTimes.map(
      (time: {startTime: string; endTime: string}) => {
        return {
          start: new Date('1970-01-01 ' + time.startTime),
          end: new Date('1970-01-01 ' + time.endTime),
        };
      },
    );

    breakTimes.sort(
      (a: {start: number}, b: {start: number}) => a.start - b.start,
    );

    for (let i = 0; i < breakTimes.length; i++) {
      let currBreak = breakTimes[i];

      if (start < currBreak.start && end > currBreak.end) {
        availableTimeSlots.push({
          startTime: convertInto12hourTime(start),
          endTime: convertInto12hourTime(currBreak.start),
        });

        start = currBreak.end;
      } else if (start < currBreak.start) {
        availableTimeSlots.push({
          startTime: convertInto12hourTime(start),
          endTime: convertInto12hourTime(currBreak.start),
        });
        break;
      } else if (start < currBreak.end) {
        start = currBreak.end;
      }
    }

    if (start < end) {
      availableTimeSlots.push({
        startTime: convertInto12hourTime(start),
        endTime: convertInto12hourTime(end),
      });
    }
  });

  return availableTimeSlots;
}

export function convertUTCDateToLocalDate(date: any) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

export const convertTime12to24 = time12h =>
  moment(time12h, 'hh:mm A').format('HH:mm:ss');
export const dateTime = (date: any, time: any) =>
  new Date(
    convertUTCDateToLocalDate(
      new Date(moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').utc(true)),
    ),
  );

function getAvailableTimeSlotsWithSingle(workHours: any, breakTimes: any[]) {
  const listBreakTimes = breakTimes.map(e => {
    return [e.startTime, e.endTime];
  });

  const result = excludeTimeRanges(
    workHours.startTime,
    workHours.endTime,
    listBreakTimes,
  );

  return result;
}

function excludeTimeRanges(start, end, excludeRanges) {
  const startDt = dateTime('1970-01-01', convertTime12to24(start));
  const endDt = dateTime('1970-01-01', convertTime12to24(end));

  excludeRanges.sort(
    (a, b) =>
      dateTime('1970-01-01', convertTime12to24(a[0])) -
      dateTime('1970-01-01', convertTime12to24(b[0])),
  );

  // Iterate over excludeRanges and split the start/end range as needed
  const result = [];
  let currentStartDt = startDt;

  for (let i = 0; i < excludeRanges.length; i++) {
    const excludeStartDt = dateTime(
      '1970-01-01',
      convertTime12to24(excludeRanges[i][0]),
    );
    const excludeEndDt = dateTime(
      '1970-01-01',
      convertTime12to24(excludeRanges[i][1]),
    );

    // Check if the excluded range overlaps with the current segment
    if (
      (excludeStartDt < currentStartDt && excludeEndDt < currentStartDt) ||
      (excludeStartDt > endDt && excludeEndDt > endDt)
    ) {
      // No overlap, skip to the next segment
      continue;
    } else if (excludeStartDt <= currentStartDt && excludeEndDt >= endDt) {
      // The excluded range covers the entire segment, skip to the end
      currentStartDt = endDt;
      break;
    } else {
      // Split the segment into two parts, before and after the excluded range
      if (excludeStartDt > currentStartDt) {
        result.push({
          startTime: convertInto12hourTime(currentStartDt),
          endTime: convertInto12hourTime(excludeStartDt),
        });
      }
      currentStartDt = excludeEndDt;
    }
  }

  // Add the final segment after the last excluded range
  if (currentStartDt < endDt) {
    result.push({
      startTime: convertInto12hourTime(currentStartDt),
      endTime: convertInto12hourTime(endDt),
    });
  }

  return result;
}

function roundTimeQuarterHour(time) {
  var timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.round(timeToReturn.getMilliseconds() / 1000) * 1000,
  );
  timeToReturn.setSeconds(Math.round(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.round(timeToReturn.getMinutes() / 15) * 15);
  return timeToReturn;
}

function findSlots(slots: any, duration: number): Array<any> {
  let result = [];
  for (let slot of slots) {
    let start = dateTime('1970-01-01', convertTime12to24(slot.startTime));
    let end = dateTime('1970-01-01', convertTime12to24(slot.endTime));
    let diff = (Number(end) - Number(start)) / 60000;
    let numOfSlots = Math.floor(diff / duration);
    if (numOfSlots > 0) {
      for (let i = 0; i < numOfSlots; i++) {
        let startTime = new Date(start.getTime() + i * duration * 60000);
        let endTime = new Date(startTime.getTime() + duration * 60000);
        result.push({
          startTime: convertInto12hourTime(roundTimeQuarterHour(startTime)),
          endTime: convertInto12hourTime(roundTimeQuarterHour(endTime)),
        });
      }
    }
  }

  result = result.filter(
    (item, i, ar) =>
      ar.findIndex(
        e => e.startTime == item.startTime && e.endTime != e.startTime,
      ) === i,
  );

  return result;
}

export function convertInto12hourTime(time: Date): string {
  const date = moment.utc(time).local(true);
  const formattedTime = date.format('h:mm a');
  return formattedTime;
  return time;
}

function removeMinutesFromGiven(time: string, minutesToRemove: number): string {
  let timeAsDate = dateTime('1970-01-01', convertTime12to24(time));

  let timeInMs = timeAsDate.getTime();
  let removedTimeInMs = timeInMs - minutesToRemove * 60000;
  let removedTimeAsDate = new Date(removedTimeInMs);

  return convertInto12hourTime(removedTimeAsDate);
}

export const getMinBtwRange = (start: any, end: any) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const res = Math.round((endTime - startTime) / 1000 / 60);

  return res;
};

const time = {
  removeMin: removeMinutesFromGiven,
};

function getDaysBetween(startDate: any, endDate: any) {
  let dates = [];
  let currentDate = new Date(startDate);
  endDate = new Date(endDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export {
  findDuration,
  getAvailableTimeSlots,
  findSlots,
  getAvailableTimeSlotsWithSingle,
  getDaysBetween,
  roundTimeQuarterHour,
};

export default time;
