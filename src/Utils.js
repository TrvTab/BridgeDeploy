
export const between = (time, min , max) => {
    if (min > time) {
      if (max < time) {
        return true
      }
    }
    return false
}

export const convertToMinutes = time => {
    let minutes = parseInt(time/60)
    let seconds = (Math.round(60*((time/60) - minutes))).toString()
    if (seconds.length === 1) {
      seconds = "0" + seconds
    }
    return minutes + ":" + seconds
  }
  
export const convertToSeconds = (time) => {
    let arr = time.split(":")
    var [minutes, seconds] = arr;
    var totalSeconds = parseInt(minutes) * 60
    totalSeconds += parseInt(seconds)
    return totalSeconds
  }