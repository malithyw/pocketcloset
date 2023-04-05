import React from "react";
import {
  Box,
  List,
  Stack,
  Dialog,
  Button,
  ListItem,
  Checkbox,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  ListItemText,
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

import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { updateEvent, deleteEvent } from "./staticEvents";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UpcomingEvents = ({ eventMap, eventMapModifier }) => {
  const [updateKey, setUpdateKey] = React.useState(-1);
  const [deleteKey, setDeleteKey] = React.useState(-1);
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventIsAllDay, setEventIsAllDay] = React.useState(false);
  const [eventStartTime, setEventStartTime] = React.useState("");

  const timeDisplayHandler = (event) => {
    return event.isAllDay ? "All-Day Event" : `Starts at ${event.startTime}`;
  };

  const navigate = useNavigate();

  const routeChange = () => {
    let path = "/closet";
    navigate(path);
  };

  React.useEffect(() => {
    const deleteWithKey = () => {
      let newMap = new Map(eventMap);
      deleteEvent(deleteKey, newMap);
      eventMapModifier(newMap);
    };

    if (deleteKey !== -1) {
      deleteWithKey();
    }
  }, [deleteKey]);

  const closeReset = () => {
    setEventTitle("");
    setEventDate("");
    setEventIsAllDay(false);
    setEventStartTime("");
  };

  const toggleAllDay = () => {
    setEventIsAllDay(!eventIsAllDay);
  };

  const updateTime = () => {
    let day = dayjs(eventDate);
    let hr = parseInt(eventStartTime.substring(0, 2));
    let min = parseInt(eventStartTime.substring(2, 4));
    if (eventStartTime.includes("am")) {
      if (hr === 12) {
        hr = 0;
      }
    } else {
      if (hr !== 12) {
        hr += 12;
      }
    }
    day = day.hour(hr);
    return day.minute(min);
  };

  const handleClose = () => {
    closeReset();
    setUpdateKey(-1);
  };

  const handleUpdateThenClose = () => {
    let eventData = {
      title: eventTitle,
      date: eventDate,
      isAllDay: eventIsAllDay,
      startTime: eventStartTime,
      hasOutfit: eventMap.get(updateKey).hasOutfit,
    };

    let newMap = new Map(eventMap);

    updateEvent(eventData, updateKey, newMap);
    eventMapModifier(newMap);
    closeReset();
    setUpdateKey(-1);
  };

  return (
    <Box
      sx={{
        width: 1,
        maxWidth: 360,
        bgColor: "background.paper",
        paddingTop: "20px",
      }}
    >
      <Stack
        direction="column"
        spacing={1}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant="h5" component="div">
          Upcoming Events
        </Typography>
        {eventMap.size === 0 && (
          <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">
              You have no events coming up.
            </Typography>
            <Typography
              variant="body2"
              component="div"
              sx={{ textAlign: "center", paddingTop: "30px" }}
            >
              Add a new event by clicking the ADD EVENT button above!
            </Typography>
          </Stack>
        )}
        {eventMap.size !== 0 && (
          <List
            sx={{ width: "90%", maxHeight: 180, overflow: "auto", padding: 0 }}
          >
            {[...eventMap.entries()]
              .sort(function (x, y) {
                return dayjs(x[1].date).diff(dayjs(y[1].date), "day");
              })
              .map((entry, idx) => {
                let value = entry[1];
                if (dayjs(value.date).diff(dayjs(), "day") < 0) {
                  return <></>;
                }
                return (
                  <ListItem
                    divider
                    key={idx}
                    secondaryAction={
                      <Stack direction="row-reverse" spacing={0.2}>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => setDeleteKey(entry[0])}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => {
                            setUpdateKey(entry[0]);
                            setEventTitle(value.title);
                            setEventDate(value.date);
                            setEventIsAllDay(value.isAllDay);
                            setEventStartTime(value.startTime);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="outfit"
                          onClick={routeChange}
                        >
                          <CheckroomIcon />
                        </IconButton>
                        <Dialog open={updateKey !== -1} onClose={handleClose}>
                          <DialogTitle>Update Event</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Update your event by simply editing the fields you
                              wish to change.
                            </DialogContentText>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <Stack direction="column" spacing={1}>
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="event-name"
                                  label="Event Title"
                                  type="text"
                                  defaultValue={eventTitle}
                                  fullWidth
                                  onChange={(e) =>
                                    setEventTitle(e.target.value.trim())
                                  }
                                  variant="standard"
                                />
                                <DatePicker
                                  disablePast
                                  label="Date"
                                  onChange={(e) => {
                                    setEventDate(e.format("YYYY-MM-DD"));
                                  }}
                                  defaultValue={dayjs(eventDate)}
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox defaultChecked={eventIsAllDay} />
                                  }
                                  label="All Day Event"
                                  onChange={toggleAllDay}
                                />
                                <TimePicker
                                  disabled={eventIsAllDay}
                                  label="Start Time"
                                  defaultValue={updateTime}
                                  onChange={(e) => {
                                    setEventStartTime(e.format("hh:mm a"));
                                  }}
                                />
                              </Stack>
                            </LocalizationProvider>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleUpdateThenClose}>
                              Update Event
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography variant="h6">{value.title}</Typography>
                          <Typography variant="body2">{value.date}</Typography>
                        </React.Fragment>
                      }
                      secondary={timeDisplayHandler(value)}
                    />
                  </ListItem>
                );
              })}
          </List>
        )}
      </Stack>
    </Box>
  );
};

export default UpcomingEvents;
