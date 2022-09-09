import * as React from "react"

import TimelineDot from "@mui/lab/TimelineDot"
import { Timeline as MTimeline } from "@mui/lab"
import TimelineItem from "@mui/lab/TimelineItem"
import TimelineContent from "@mui/lab/TimelineContent"
import { Tooltip, Typography, Box } from "@mui/material"
import TimelineSeparator from "@mui/lab/TimelineSeparator"
import TimelineConnector from "@mui/lab/TimelineConnector"

 

export const Timeline = ({
  options,
  action,
}: {
  options: any[]
  action: (args: any) => void
}) => {
  return (
    <MTimeline position="alternate" dir="row">
      {options.map((option, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot />
            {options.length !== index + 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Box
              gap={1}
              display="flex"
              alignItems="center"
              justifyContent={index % 2 === 0 ? "start" : "end"}
            >
              <Tooltip title={option.text}>
                <Typography variant="subtitle1" component="span">
                  {option.label}
                </Typography>
              </Tooltip>
              {action && action(option)}
            </Box>
          </TimelineContent>
        </TimelineItem>
      ))}
    </MTimeline>
  )
}
