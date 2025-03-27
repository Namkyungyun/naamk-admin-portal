"use client";

import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

dayjs.locale("ko");

const dayjsToString = (value) => {
  if (value) {
    const date = dayjs(value).startOf("day").toISOString();
    return date;
  }
  return null;
};

export function RangeDatePicker({
  isReset = false,
  isRequired = false,
  useDefault = true,
  defaultPeriod = 3,
  maxPeriod = 6, // 1주일
  onCallback,
}) {
  const [dates, setDates] = useState([null, null]);
  const [validation, setValidation] = useState(true);

  //// init
  useEffect(() => {
    if (useDefault) {
      setDates([dayjs().subtract(defaultPeriod, "day"), dayjs()]);
    }
  }, []);

  useEffect(() => {
    if (isReset) {
      if (useDefault) {
      }
      const start = useDefault ? dayjs().subtract(defaultPeriod, "day") : null;
      const end = useDefault ? dayjs() : null;
      const result = isRequired ? start != null && end != null : true;

      setDates([start, end]);
      onCallbackDates(result, start, end);
    }
  }, [isReset]);

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

  /// 상태값 넣기 && onCallback
  const onCalendarChange = (dates) => {
    if (dates) {
      const start = dates[0];
      const end = dates[1];

      setDates([start, end]);

      // onCallback
      const result = start != null && end != null;
      onCallbackDates(result, start, end);
      setValidation(result);
    }
  };

  /// 초기화
  const onOpenChange = (open) => {
    if (open) {
      setDates([null, null]);

      isRequired
        ? onCallbackDates(isRequired, null, null)
        : onCallbackDates(!isRequired, null, null);
    }
  };

  const onCallbackDates = (result, startDate, endDate) => {
    onCallback({
      result: result,
      startDate: dayjsToString(startDate),
      endDate: dayjsToString(endDate),
    });
  };

  return (
    <>
      <div>
        <RangePicker
          status={isRequired || !validation ? "error" : null}
          disabledDate={disabledDate}
          onCalendarChange={onCalendarChange}
          onOpenChange={onOpenChange}
          value={dates}
          maxDate={dayjs()}
          style={{
            width: "100%",
            fontSize: "9px",
          }}
        />
      </div>
    </>
  );
}
