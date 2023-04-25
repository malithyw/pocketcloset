import React from "react";
import Stack from "@mui/material/Stack";
import CalendarComponent from "../components/CalendarComponent";
import NewEventDialog from "../components/NewEventFormComponent";
import UpcomingEvents from "../components/UpcomingEvents";
import { Hearts } from "react-loader-spinner";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./Calendar.css";

const Calendar = ({ aboveEvents, setAboveEvents, background }) => {
  let [currentDate, setCurrentDate] = React.useState("");
  // let [events, setEvents] = React.useState(aboveEvents);
  // console.log("events ", events);
  console.log(currentDate);
  let [visibility, setVisibility] = React.useState("hidden");

  return (
    <div>
      {/* <div>
        {
          <Stack
            direction="column"
            spacing={0}
            visibility={visibility}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {visibility === "hidden" && (
              <Hearts
                height="200"
                width="200"
                color="#F8BACF"
                ariaLabel="hearts-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            )}
          </Stack>
        }
      </div> */}

      {
        <Stack
          direction="column"
          spacing={0}
          // visibility={visibility}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className="pad">
            <CalendarComponent
              setCurrentDay={setCurrentDate}
              events={aboveEvents}
            />
          </div>
          <NewEventDialog
            currentDate={currentDate}
            events={aboveEvents}
            eventsModifier={setAboveEvents}
            setAboveEvents={setAboveEvents}
          />
          <UpcomingEvents
            eventMap={aboveEvents}
            eventMapModifier={setAboveEvents}
            setAboveEvents={setAboveEvents}
            setVisibility={setVisibility}
          />
        </Stack>
      }
    </div>
  );
};

export default Calendar;
