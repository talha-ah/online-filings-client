import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart as RBarChart,
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

export const BarChart = ({
  data = [],
  loading,
}: {
  data: Props[]
  loading?: boolean
}) => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RBarChart data={data} barSize={20}>
        <XAxis dataKey="key" />
        <YAxis />
        <Tooltip cursor={{ fill: "transparent" }} content={<CustomTooltip />} />
        <Bar
          dataKey="value"
          fill={theme.palette.primary.dark}
          background={{ fill: "transparent" }}
          radius={[+theme.shape.borderRadius, +theme.shape.borderRadius, 0, 0]}
        />
      </RBarChart>
    </ResponsiveContainer>
  )
}

// const data = [
//   { key: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { key: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { key: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { key: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { key: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { key: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { key: "Page G", uv: 3490, pv: 4300, amt: 2100 },
// ]
