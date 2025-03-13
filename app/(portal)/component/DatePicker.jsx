"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

const dayjsToString = (value) => {
  if (value) {
    const date = dayjs(value);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();

    return `${year}/${month}/${day}`;
  }

  return "";
};

export function RangeDatePicker({
  defaultPeriod = 3,
  maxPeriod = 6, // 1주일
  handleDates,
}) {
  const [dates, setDates] = useState([null, null]);

  //// init
  useEffect(() => {
    let startDate = dayjs().subtract(defaultPeriod, "day");
    setDates([startDate, dayjs()]);
  }, []);

  /// period
  const disabledDate = (current, { from, type }) => {
    if (from) {
      const minDate = from.add(-maxPeriod, "days");
      const maxDate = from.add(maxPeriod, "days");
      switch (type) {
        case "year":
          return (
            current.year() < minDate.year() || current.year() > maxDate.year()
          );
        case "month":
          return (
            getYearMonth(current) < getYearMonth(minDate) ||
            getYearMonth(current) > getYearMonth(maxDate)
          );
        default:
          return Math.abs(current.diff(from, "days")) >= maxPeriod + 1;
      }
    }
    return false;
  };

  /// 상태값 넣기 && callback
  const onCalendarChange = (dates) => {
    if (dates) {
      const start = dates[0];
      const end = dates[1];

      setDates([start, end]);

      // callback
      handleDates({
        result: start != null && end != null,
        startDate: dayjsToString(start),
        endDate: dayjsToString(end),
      });
    }
  };

  /// 초기화
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);
    }
  };

  return (
    <>
      <div className="my-2 flex">
        <RangePicker
          status={dates[0] && dates[1] ? null : "warning"}
          disabledDate={disabledDate}
          onCalendarChange={onCalendarChange}
          onOpenChange={onOpenChange}
          value={dates}
          maxDate={dayjs()}
        />
      </div>
    </>
  );
}
