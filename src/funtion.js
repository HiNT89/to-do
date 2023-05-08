import moment from "moment";
function convertMinutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours + " hours " + remainingMinutes + " minutes";
}
function minutesToDHM(minutes) {
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  return `${days} day(s), ${hours} hour(s), ${mins} minute(s)`;
}
const showTimeStart = (timeStart) => {
  const b = moment().format();
  const a = moment(timeStart, "YYYY-MM-DD");
  const c = -a.diff(b, "minutes");
  let result = timeStart;
  if (c < 1440) {
    result = moment(result).fromNow();
  } else if (c < 2880) {
    result = "đã tạo ngày hôm qua";
  } else {
    const date = moment(result).date();
    const month = moment(result).month() + 1;
    const year = moment(result).year();
    result = `đã tạo ${date} thg ${month} năm ${year}`;
  }
  return result;
};
const handleShowTimeEnd = (timeEnd) => {
  const timeEndFormat = new Date(timeEnd).toDateString();
  let str = `${timeEndFormat}`;
  const today = new Date().toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = tomorrow.toDateString();
  const isTomorrow = dayAfterTomorrow === timeEndFormat;
  const isToday = today === timeEndFormat;
  str = isTomorrow ? "ngày mai" : str;
  str = isToday ? " hôm nay" : str;
  return str;
};
export {
  convertMinutesToHoursAndMinutes,
  minutesToDHM,
  showTimeStart,
  handleShowTimeEnd,
};
