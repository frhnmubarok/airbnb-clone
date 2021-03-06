import { useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';

import 'react-day-picker/lib/style.css';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export default function DateRangePicker({ datesChanged }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const format = 'dd MMM yyyy';
  const parseDate = (str, format, locale) => {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    return DateUtils.isDate(parsed) ? parsed : null;
  };
  const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });
  const numberOfNightsBetweenDates = (startDate, endDate) => {
    const start = new Date(startDate); //clone
    const end = new Date(endDate); //clone
    let dayCount = 0;

    while (end > start) {
      dayCount++;
      start.setDate(start.getDate() + 1);
    }

    return dayCount;
  };
  return (
    <div className='date-range-picker-container'>
      <div>
        <label>From:</label>
        <DayPickerInput
          formatDate={formatDate}
          format={format}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(new Date(), format)}`}
          dayPickerProps={{
            modifiers: {
              disabled: {
                before: new Date(),
              },
            },
          }}
          onDayChange={(day) => {
            setStartDate(day);
            const newEndDate = new Date(day);
            if (numberOfNightsBetweenDates(day, endDate) < 1) {
              newEndDate.setDate(newEndDate.getDate() + 1);
              setEndDate(newEndDate);
            }
            datesChanged(day, newEndDate);
          }}
        />
      </div>
      <div>
        <label>To:</label>
        <DayPickerInput
          formatDate={formatDate}
          format={format}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(new Date(), format)}`}
          dayPickerProps={{
            modifiers: {
              disabled: [
                startDate,
                {
                  before: startDate,
                },
              ],
            },
          }}
          onDayChange={(day) => {
            setEndDate(day);
            datesChanged(startDate, day);
          }}
        />
      </div>
      <style jsx>
        {`
          .date-range-picker-container div {
            display: grid;
            grid-template-columns: 30% 70%;
            padding: 10px;
          }
          label {
            padding-top: 10px;
          }
        `}
      </style>
      <style jsx global>
        {`
          .DayPickerInput input {
            width: 120px;
            padding: 10px;
            font-size: 16px;
          }
        `}
      </style>
    </div>
  );
}
