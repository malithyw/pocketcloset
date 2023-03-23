let eventUID = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: createEventID(),
    title: "All-day-event",
    start: todayStr,
    outfit: false,
  },
  {
    id: createEventID(),
    title: "Timed Event",
    start: todayStr + "T12:00:00",
  },
];

export function createEventID() {
  return String(eventUID++);
}
