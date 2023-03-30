import React from "react";
import Stack from "@mui/material/Stack";
import CalendarComponent from "../components/CalendarComponent";
import NewEventDialog from "../components/NewEventFormComponent";
import UpcomingEvents from "../components/UpcomingEvents";
import { EVENTS } from "../components/staticEvents";

const Calendar = () => {
  let [currentDate, setCurrentDate] = React.useState("");
  let [events, setEvents] = React.useState(EVENTS);

  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{ alignItems: "center", justifyContent: "center" }}
    >
      <CalendarComponent setCurrentDay={setCurrentDate} events={events} />
      <NewEventDialog events={events} eventsModifier={setEvents} />
      <UpcomingEvents eventMap={events} eventMapModifier={setEvents} />
    </Stack>
  );
};

export default Calendar;
