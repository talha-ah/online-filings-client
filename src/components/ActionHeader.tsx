import * as React from "react"

import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"

import { Title } from "@components/Title"
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
        height: "64px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
