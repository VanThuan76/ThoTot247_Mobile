import moment from "moment";

const isToday = (dateString?: string): boolean => {
  if (dateString === undefined || dateString === null) {
    return false;
  }
  return moment().isSame(dateString, "day");
};

const withTimeout = (millis: number) =>
  new Promise((resolve: any) => setTimeout(resolve, millis));

export { isToday, withTimeout };
