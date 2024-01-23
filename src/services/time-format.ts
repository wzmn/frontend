import moment from "moment";

export default function TimeFormat(
  date: string | Date,
  format: string = "DD/MM/YYYY hh:mm a"
) {
  const gmtDateTime = moment.utc(date, "YYYY-MM-DD HH");
  const local = gmtDateTime.local().format(format);
  return local;
}
