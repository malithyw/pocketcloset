import React from "react";
import {
  Stack,
  Button,
  Dialog,
  Checkbox,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
  DialogContentText,
} from "@mui/material";

import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { addEvent } from "./staticEvents";

const NewEventDialog = ({ events, eventsModifier, setAboveEvents }) => {
  const [open, setOpen] = React.useState(false);
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventTime, setEventTime] = React.useState("");
  const [isAllDay, setIsAllDay] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    closeReset();
    setOpen(false);
  };

  const closeReset = () => {
    setEventDate("");
    setEventTitle("");
    setEventTime("");
    setIsAllDay(false);
  };

  const handleAddThenClose = () => {
    let eventData = {
      title: eventTitle,
      date: eventDate,
      isAllDay: isAllDay,
      startTime: eventTime,
      hasOutfit: false,
    };

    let newMap = new Map(events);
    addEvent(eventData, newMap);
    eventsModifier(newMap);
    setAboveEvents(newMap);
    closeReset();
    setOpen(false);
  };

  const handleAllDayChange = () => {
    setIsAllDay(!isAllDay);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddCircleOutlinedIcon />}
      >
        Add Event
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new event to your PocketCloset calendar. Simply add an event
            title, and pick a date and time!
          </DialogContentText>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack direction="column" spacing={1}>
              <TextField
                autoFocus
                margin="dense"
                id="event-name"
                label="Event Title"
                type="text"
                fullWidth
                onChange={(e) => setEventTitle(e.target.value.trim())}
                variant="standard"
              />
              <DatePicker
                disablePast
                label="Date"
                onChange={(e) => {
                  setEventDate(dayjs(e.$d).format("YYYY-MM-DD"));
                }}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="All Day Event"
                onChange={handleAllDayChange}
              />
              <TimePicker
                disabled={isAllDay}
                label="Start Time"
                onChange={(e) => {
                  setEventTime(dayjs(e.$d).format("hh:mm a"));
                }}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleAddThenClose}
            disabled={
              eventTitle === "" ||
              eventDate === "" ||
              (!isAllDay && eventTime === "")
            }
          >
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NewEventDialog;
