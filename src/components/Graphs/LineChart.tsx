import React from "react"
import {
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart as RLineChart,
} from "recharts"

import { Paper } from "@mui/material"
import { Typography } from "@mui/material"
import { useTheme } from "@mui/material/styles"

export type Props = {
  key: string
  value: string | number
  [key: string]: any
}

const CustomTooltip = (props: any) => {
  const { active, payload, label } = props

  if (active && payload && payload.length) {
    return (
      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
        <Typography>{`${label} : ${payload[0].value}`}</Typography>
      </Paper>
    )
  }

  return null
}

export const LineChart = ({
  data = [],
  loading,
}: {
  data: Props[]
  loading?: boolean
}) => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RLineChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="key" dy={5} />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.dark}
        />
      </RLineChart>
    </ResponsiveContainer>
  )
}

// const data = [
//   {
//     key: "Page A",
//     value: 4000,
//   },
//   {
//     key: "Page B",
//     value: 3000,
//   },
//   {
//     key: "Page C",
//     value: 2000,
//   },
//   {
//     key: "Page D",
//     value: 2780,
//   },
//   {
//     key: "Page E",
//     value: 1890,
//   },
//   {
//     key: "Page F",
//     value: 2390,
//   },
//   {
//     key: "Page G",
//     value: 3490,
//   },
// ]
