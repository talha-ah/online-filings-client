import * as React from "react"

import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"

import { Title } from "@components/Title"
import { APP_BAR_HEIGHT } from "@utils/constants"
import { BackButton } from "@components/BackButton"

export const ActionHeader = ({
  title,
  children,
  withBackButton,
}: {
  title: string
  withBackButton?: boolean
  children?: React.ReactNode
}) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        py: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: `${APP_BAR_HEIGHT}px`,
        justifyContent: "space-between",
        borderBottom: `1px solid ${theme.palette.divider}`,
      })}
    >
      <Box
        sx={{
          gap: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {withBackButton && <BackButton />}
        <Title>{title}</Title>
      </Box>

      {children}
    </Box>
  )
}
