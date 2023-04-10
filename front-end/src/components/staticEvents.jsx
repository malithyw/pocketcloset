// static events as a foundation for dynamic interactions in the app

/**
 * EVENT Props:
 * -----------
 * title: String        // event title
 * date: String         // event date
 * isAllDay: Bool       // all day status for event
 * startTime: String    // event start time
 * hasOutfit: Bool      // outfit planned status
 */

const EVENTS = new Map();
let UID = 0;
const TODAY = new Date().toISOString().split("T")[0];

// const createUID = () => {
//   return UID++;
// };

// EVENTS.set(createUID(), {
//   title: "University",
//   date: TODAY,
//   isAllDay: false,
//   startTime: "9:30 am",
//   hasOutfit: false,
// });

// EVENTS.set(createUID(), {
//   title: "Dinner with Friends",
//   date: TODAY,
//   isAllDay: false,
//   startTime: "7:00 pm",
//   hasOutfit: false,
// });

const addEvent = (eventData, map) => {
  let eventObj = {
    title: eventData.title,
    date: eventData.date,
    isAllDay: eventData.isAllDay,
    startTime: eventData.startTime,
    hasOutfit: eventData.hasOutfit,
    outfit: eventData.outfit,
  };

  map.set(map.size + 1, eventObj);
};

const updateEvent = (eventData, uid, map) => {
  let eventObj = map.get(uid);

  eventObj.title = eventData.title;
  eventObj.date = eventData.date;
  eventObj.isAllDay = eventData.isAllDay;
  eventObj.startTime = eventData.startTime;
  eventObj.hasOutfit = eventData.hasOutfit;
  eventObj.outfit = eventData.outfit;
};

const deleteEvent = (uid, map) => {
  map.delete(uid);
};

export { EVENTS, addEvent, updateEvent, deleteEvent };
