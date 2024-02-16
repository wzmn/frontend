import moment from "moment";

export default function TimeFormat(
  date: string | Date,
  format: string = "DD/MM/YYYY hh:mm a"
) {
  const gmtDateTime = moment.utc(date);
  const local = gmtDateTime.local().format(format);
  return local;
}
