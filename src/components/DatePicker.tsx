import { Dayjs } from "dayjs"
import { TextField } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"

export const DatePicker = ({
  value,
  onChange,
  ...props
}: {
  value?: Dayjs | null
  onChange?: (args: Dayjs | null) => void
  [key: string]: any
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DesktopDatePicker
        value={value}
        onChange={onChange}
        inputFormat="MM/DD/YYYY"
        renderInput={(params) => <TextField {...params} {...props} />}
      /> */}
      <TextField
        {...props}
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </LocalizationProvider>
  )
}
