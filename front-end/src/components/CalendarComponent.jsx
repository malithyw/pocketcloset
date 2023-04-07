import React from "react";
import { PropTypes } from "prop-types";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

function fakeFetch(date, events, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const month = dayjs(date).month();
      const year = dayjs(date).year();

      const daysToHighlight = [];
      events.forEach((k) => {
        let iso = k.date.split("-");
        if (
          parseInt(iso[1]) === month + 1 &&
          parseInt(iso[0]) === year &&
          daysToHighlight.indexOf(parseInt(iso[2])) === -1
        ) {
          daysToHighlight.push(parseInt(iso[2]));
        }
      });

      resolve({ daysToHighlight });
    }, 800);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}

const initialValue = dayjs(new Date().toISOString().split("T")[0]);

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "✔️" : 0}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

ServerDay.propTypes = {
  day: PropTypes.object.isRequired,
  highlightedDays: PropTypes.arrayOf(PropTypes.number),
  outsideCurrentMonth: PropTypes.bool.isRequired,
};

const CalendarComponent = ({ events, setCurrentDay }) => {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, events, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    if (selectedDate !== null) {
      fetchHighlightedDays(selectedDate);
    } else {
      fetchHighlightedDays(initialValue);
    }
  }, [events]);

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  function convert(str) {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = (date.getDate());
    return [date.getFullYear(), mnth, day].join("-");
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disablePast
        views={["month", "day"]}
        renderLoading={() => <DayCalendarSkeleton />}
        onMonthChange={handleMonthChange}
        loading={isLoading}
        slots={{
          day: ServerDay,
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
        onChange={(date) => {
          setCurrentDay(convert(date));
          // changed the following
          setSelectedDate(convert(date));
        }}
      />
    </LocalizationProvider>
  );
};

export default CalendarComponent;
