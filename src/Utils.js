import { getAllByAltText } from "@testing-library/react";
import LoopList from "./components/LoopList";

export const between = (time, min, max) => {
    if (time > min) {
      if (time < max) {
        return true
      }
    }
  return false;
};

export const convertToMinutes = (time) => {
  let minutes = parseInt(time / 60);
  let seconds = Math.round(60 * (time / 60 - minutes)).toString();
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

export const convertToSeconds = (time) => {
  let arr = time.split(":");
  var [minutes, seconds] = arr;
  var totalSeconds = parseInt(minutes) * 60;
  totalSeconds += parseInt(seconds);
  return totalSeconds;
};

export const validateName = (title, otherItems) => {
  let invalidSubstrings = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "+",
  ];
  if (title === "") {
    return ("Please provide a non-empty loop name")
  } else if (invalidSubstrings.some((str) => title.includes(str))) {
    return ("Invalid character included");
  } else if (otherItems.some(item => title === item.key)){
    return ("Title is already in use")
  } else{}
    return("");
  }