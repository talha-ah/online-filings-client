import dayjs from "dayjs"

export default class DateUtility {
  static getLocaleDate = () => {
    return new Date().toLocaleString()
  }

  static strToDate = (date: Date, format = "YYYY-MM-DD") => {
    if (!date) {
      return ""
    }
    return dayjs(date, format).toDate()
  }

  static formatDate = (
    date: Date | string,
    format = "MMM DD, YYYY hh:mm A"
  ) => {
    if (!date) return ""

    return dayjs(date).format(format)
  }

  static addDays = (date: Date, days: number) =>
    dayjs(date).add(days, "days").toDate()

  static isDateAfter = (date1: Date, date2: Date) =>
    dayjs(date1).isAfter(dayjs(date2))

  static difference = (date1: Date, date2: Date, unit: any = "days") =>
    dayjs(date2).diff(date1, unit)

  // static getDays = () =>
  //   Array.apply(null, Array(7)).map((_, i) =>
  //     dayjs(i, "e")
  //       .startOf("week")
  //       .isoWeekday(i + 1)
  //       .format("dddd")
  //   )

  // static duration = (date1: Date, date2: Date) =>
  //   dayjs.duration(dayjs(date2).diff(date1))

  // static hourMinuteTime = (date1: Date, date2: any) => {
  //   if (!date2) {
  //     date2 = dayjs().utc()
  // }
  //   const diff = DateUtility.duration(date1, date2)
  //   return `${DateUtility.difference(date1, date2)}d ${diff.get("hours")}h`
  // }

  // static hoursList = () => {
  //   return Array.from({ length: 24 }, (_, i) => i).reduce(
  //     (r: any, hour: number) => {
  //       r.push(dayjs({ hour, minute: 0 }).format("h:mm A"))
  //       r.push(dayjs({ hour, minute: 30 }).format("h:mm A"))
  //       return r
  //     },
  //     []
  //   )
  // }
}
