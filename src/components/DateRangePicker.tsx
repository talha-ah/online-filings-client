import { Box } from "@mui/material"

import { Heading } from "@components/Title"
import { Button } from "@components/Button"
import { DateRangeType } from "@utils/types"
import { DateRange } from "@components/DateRange"

export const DateRangePicker = ({
  value,
  onChange,
}: {
  value: DateRangeType
  onChange: (args: DateRangeType) => void
}) => {
  return (
    <Box>
      <Box
        mb={1}
        display="flex"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Heading>Date Range</Heading>
        <Button
          size="small"
          variant="text"
          onClick={() => onChange([null, null])}
        >
          Clear Range
        </Button>
      </Box>

      <DateRange value={value} onChange={onChange} />
    </Box>
  )
}
