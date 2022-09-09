import { useEffect, useState } from "react"

import { DateRangePicker } from "@mui/lab"
import { TextField, Box } from "@mui/material"
import { LocalizationProvider } from "@mui/lab"
import AdapterDayjs from "@mui/lab/AdapterDayjs"

import { DateRangeType } from "@utils/types"

export const DateRange = ({
  value,
  onChange,
}: {
  value: DateRangeType
  onChange: (args: DateRangeType) => void
}) => {
  const [dateRange, setDateRange] = useState<DateRangeType>([null, null])

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      onChange(dateRange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  useEffect(() => {
    setDateRange(value)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker
        endText="To"
        startText="From"
        value={dateRange}
        onChange={setDateRange}
        renderInput={(startProps: any, endProps: any) => (
          <Box
            sx={{
              gap: 2,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField {...startProps} size="small" fullWidth />
            <TextField {...endProps} size="small" fullWidth />
          </Box>
        )}
      />
    </LocalizationProvider>
  )
}
