function addZero(i) {
  if (i < 10) {
    return `0${i}`
  }
  return i
}

export default function getTime() {
  const time = new Date()
  return `${time.getHours()}:${addZero(time.getMinutes())}`
}
