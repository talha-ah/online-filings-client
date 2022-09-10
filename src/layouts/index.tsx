import * as React from "react"

import Box from "@mui/material/Box"
import { styled, Theme } from "@mui/material/styles"

import { SIDEBAR_WIDTH } from "@utils/constants"
import { APP_BAR_HEIGHT } from "@utils/constants"

const Main = styled("main")(({ theme }) => ({
  width: "100%",
  height: "100%",
  padding: theme.spacing(2),
}))

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100vw",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Box
        sx={(theme: Theme) => ({
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: theme.spacing(2),
          height: `${APP_BAR_HEIGHT}px`,
          justifyContent: "space-between",
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        {children}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
        }}
      >
        <Box
          sx={(theme: Theme) => ({
            px: 2,
            display: "flex",
            width: SIDEBAR_WIDTH,
            flexDirection: "column",
            borderRight: `1px solid ${theme.palette.divider}`,
          })}
        >
          Projects
        </Box>

        <Main>{children}</Main>
      </Box>
    </Box>
  )
}
