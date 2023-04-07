import React from "react";
import Stack from "@mui/material/Stack";
import CalendarComponent from "../components/CalendarComponent";
import NewEventDialog from "../components/NewEventFormComponent";
import UpcomingEvents from "../components/UpcomingEvents";
// import { EVENTS } from "../Login";

const Calendar = ({ aboveEvents, setAboveEvents }) => {
  let [currentDate, setCurrentDate] = React.useState("");
  let [events, setEvents] = React.useState(aboveEvents);
  console.log(aboveEvents);
  console.log(currentDate);

  return (
    <div className="screen">
      <Stack
        direction="column"
        spacing={0}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <CalendarComponent setCurrentDay={setCurrentDate} events={events} />
        <NewEventDialog
          currentDate={currentDate}
          events={events}
          eventsModifier={setEvents}
          setAboveEvents={setAboveEvents}
        />
        <UpcomingEvents
          eventMap={events}
          eventMapModifier={setEvents}
          setAboveEvents={setAboveEvents}
        />
      </Stack>
    </div>
  );
};

export default Calendar;
