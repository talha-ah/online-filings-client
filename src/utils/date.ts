import dayjs from "dayjs"

export default class DateUtility {
  static getLocaleDate = () => {
    return new Date().toLocaleString()
  }

  static formatDate = (
    date: Date | string,
    format = "MMM DD, YYYY hh:mm A"
  ) => {
    if (!date) return ""

    return dayjs(date).format(format)
  }
}
