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
import { useState, useEffect } from "react";
import { db, auth } from "../pages/Login";
import { ref, push, onValue, remove, update } from "firebase/database";
import deleteicon from "../pages/icons/delete-02.png";

import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import { updateEvent, deleteEvent } from "./staticEvents";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UpcomingEvents = ({ eventMap, eventMapModifier, setAboveEvents, setVisibility }) => {
  const [updateKey, setUpdateKey] = React.useState(-1);
  const [deleteKey, setDeleteKey] = React.useState(-1);
  const [outfitKey, setOutfitKey] = React.useState(-1);
  const [eventTitle, setEventTitle] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [eventIsAllDay, setEventIsAllDay] = React.useState(false);
  const [eventStartTime, setEventStartTime] = React.useState("");
  const [eventOutfit, setEventOutfit] = React.useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const user = auth.currentUser.uid;
  const [showSavedOutfits, setShowSavedOutfits] = useState(false);

  const timeDisplayHandler = (event) => {
    return event.isAllDay ? "All-Day Event" : `Starts at ${event.startTime}`;
  };

  const navigate = useNavigate();

  const routeChange = () => {
    setEventOutfit([]);
    let path = "/closet";
    navigate(path);
  };

  useEffect(() => {
    const deleteWithKey = () => {
      let newMap = new Map(eventMap);
      deleteEvent(deleteKey, newMap);
      eventMapModifier(newMap);
      setAboveEvents(newMap);
    };

    if (deleteKey !== -1) {
      deleteWithKey();
    }

    const outfitsRef = ref(db, `users/${user}/closet/outfits`);
    onValue(outfitsRef, (snap) => {
      const outfitsArray = [];
      const keys = [];
      snap.forEach((childSnap) => {
        const childData = childSnap.val();
        outfitsArray.push(childData);
        keys.push(childSnap.key);
      });
      setSavedOutfits(outfitsArray);
    });
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
      outfit: eventMap.get(updateKey).outfit,
    };

    let newMap = new Map(eventMap);

    updateEvent(eventData, updateKey, newMap);
    eventMapModifier(newMap);
    setAboveEvents(newMap);
    closeReset();
    setUpdateKey(-1);
  };

  const handleRemoveThenClose = () => {
    let eventData = {
      title: eventMap.get(outfitKey).title,
      date: eventMap.get(outfitKey).date,
      isAllDay: eventMap.get(outfitKey).isAllDay,
      startTime: eventMap.get(outfitKey).startTime,
      hasOutfit: false,
      outfit: [],
    };

    let newMap = new Map(eventMap);

    updateEvent(eventData, outfitKey, newMap);
    eventMapModifier(newMap);
    setAboveEvents(newMap);
    setEventOutfit([]);
    setOutfitKey(-1);
  };

  const handleSaveThenClose = () => {
    let eventData = {
      title: eventMap.get(outfitKey).title,
      date: eventMap.get(outfitKey).date,
      isAllDay: eventMap.get(outfitKey).isAllDay,
      startTime: eventMap.get(outfitKey).startTime,
      hasOutfit: true,
      outfit: eventOutfit,
    };

    let newMap = new Map(eventMap);

    updateEvent(eventData, outfitKey, newMap);
    setEventOutfit([]);
    eventMapModifier(newMap);
    setAboveEvents(newMap);
    setOutfitKey(-1);
  };

  const buttonClick = (button) => {
    switch (button) {
      case "saved-outfits":
        setShowSavedOutfits(true);
        // console.log("saved outfits buttons clicked");
        break;
      case "close-saved-outfits":
        setShowSavedOutfits(false);
        break;
      default:
        break;
    }
  };

  function printlog() {
    // console.log(eventStartTime)
    let day = dayjs(eventDate);
    let hr = parseInt(eventStartTime.substring(0, 2));
    let min = parseInt(eventStartTime.substring(3, 5));
    // console.log("hourrr ", hr)
    // console.log("minnnn ", min)
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
    day = day.minute(min);
    // day = day.
    // console.log(day)
    return day;
  }

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
        {console.log(eventMap)}
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
                            // console.log(value.date);
                            // console.log("hereeeee ", value.startTime);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="outfit"
                          onClick={() => {
                            setEventOutfit(value.outfit);
                            setOutfitKey(entry[0]);
                          }}
                        >
                          <CheckroomIcon />
                        </IconButton>
                        <Dialog
                          open={outfitKey === entry[0]}
                          onClose={() => {
                            setOutfitKey(-1);
                          }}
                        >
                          <DialogTitle>
                            {value.hasOutfit
                              ? "Update Outfit"
                              : "Pick an Outfit"}
                          </DialogTitle>
                          <DialogContent>
                            {(value.outfit.length !== 0 ||
                              eventOutfit.length !== 0) && (
                              <Stack
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Typography variant="h6">
                                  Your Chosen Outfit
                                </Typography>
                                <div style={{ display: "inline" }}>
                                  {value.outfit.map((item, idx) => (
                                    <img
                                      key={idx}
                                      className="outfit-item"
                                      src={item.image}
                                      alt={item.name}
                                    />
                                  ))}
                                  {value.outfit.length === 0 &&
                                    eventOutfit.map((item, idx) => (
                                      <img
                                        key={idx}
                                        className="outfit-item"
                                        src={item.image}
                                        alt={item.name}
                                      />
                                    ))}
                                </div>
                              </Stack>
                            )}
                            <DialogContentText sx={{ paddingTop: "10px" }}>
                              {value.hasOutfit
                                ? "Update your outfit by simply selecting" +
                                  " a new tile from the following saved outfit choices"
                                : "Pick the outfit of your choice for this" +
                                  " event by clicking on the corresponding tile"}
                            </DialogContentText>
                            <Stack>
                              <div>
                                <Button
                                  onClick={() => buttonClick("saved-outfits")}
                                >
                                  Outfits
                                </Button>
                                {showSavedOutfits && (
                                  <div className="saved-outfits-b box">
                                    {savedOutfits.map((outfit, index) => (
                                      <Button
                                        key={index}
                                        className="outfit"
                                        onClick={() => {
                                          setEventOutfit(outfit);
                                          buttonClick("close-saved-outfits");
                                        }}
                                      >
                                        {outfit.map((item, index) => (
                                          <img
                                            key={index}
                                            className="outfit-item"
                                            src={item.image}
                                            alt={item.name}
                                          />
                                        ))}
                                      </Button>
                                    ))}
                                    <Button
                                      onClick={() =>
                                        buttonClick("close-saved-outfits")
                                      }
                                    >
                                      close
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </Stack>
                            <DialogContentText>
                              Didn't like any of your saved outfits, click on
                              the button below to make a new one!
                            </DialogContentText>
                            <Button onClick={routeChange}>Create Outfit</Button>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={() => {
                                setEventOutfit([]);
                                setOutfitKey(-1);
                              }}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleRemoveThenClose}>
                              Remove Outfit
                            </Button>
                            <Button
                              onClick={handleSaveThenClose}
                              disabled={
                                JSON.stringify(value.outfit) ===
                                JSON.stringify(eventOutfit)
                              }
                            >
                              Save
                            </Button>
                          </DialogActions>
                        </Dialog>
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
                                {/* {console.log(eventStartTime)} */}
                                <TimePicker
                                  disabled={eventIsAllDay}
                                  label="Start Time"
                                  defaultValue={printlog()}
                                  onChange={(e) => {
                                    setEventStartTime(e.format("hh:mm aa").substring(0, 8));
                                    // printlog(e);
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
                        <Stack direction="column" alignItems="flex-start">
                          <Typography variant="h6">{value.title}</Typography>
                          <Typography variant="body2">{value.date}</Typography>
                        </Stack>
                      }
                      secondary={timeDisplayHandler(value)}
                    />
                  </ListItem>
                );
              })}
              {setVisibility("show")}
          </List>
        )}
      </Stack>
    </Box>
  );
};

export default UpcomingEvents;
