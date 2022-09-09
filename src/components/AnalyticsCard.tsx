import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"

import { Color } from "@utils/types"
import { numberWithCommas } from "@utils/common"

const Card = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  width: "100%",
  height: "100%",
}))

export const AnalyticsCard = ({
  color,
  title,
  count,
  percentage,
  isLoss,
  diff,
}: {
  title?: string
  count?: string
  percentage?: number
  isLoss?: boolean
  diff?: number
  color?: Color
}) => (
  <Card variant="outlined">
    <Stack spacing={0.5}>
      <Typography variant="subtitle2">{title}</Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" color="inherit">
              {numberWithCommas(count)}
            </Typography>
            {percentage ? (
              <Chip
                size="small"
                color={color}
                variant="outlined"
                sx={{ marginLeft: 1 }}
                label={`${percentage.toFixed(2)}%`}
                icon={
                  <>
                    {!isLoss && (
                      <TrendingUpIcon
                        sx={{
                          pl: 0.5,
                          color: "inherit",
                        }}
                      />
                    )}
                    {isLoss && (
                      <TrendingDownIcon
                        sx={{
                          pl: 0.5,
                          color: "inherit",
                        }}
                      />
                    )}
                  </>
                }
              />
            ) : (
              ""
            )}
            {diff ? (
              <Chip
                size="small"
                color={color}
                variant="outlined"
                sx={{ marginLeft: 1 }}
                label={`${isLoss ? "Less" : "Extra"}: ${numberWithCommas(
                  diff
                )}`}
              />
            ) : (
              ""
            )}
          </Box>
        </Grid>
      </Grid>
    </Stack>
  </Card>
)
