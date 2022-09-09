import * as React from "react"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"
import Menu from "@mui/icons-material/Menu"
import useMediaQuery from "@mui/material/useMediaQuery"
import { styled, Theme, useTheme } from "@mui/material/styles"

import { ActionHeader } from "@layouts/Drawer/Header"
import { DRAWER_WIDTH, APP_BAR_HEIGHT } from "@utils/constants"

import Drawer from "./Content"

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean
}>(({ theme, open }) => ({
  padding: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

const Children = styled("div")(({ theme }) => ({
  overflow: "auto",
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  /* width */
  "&::-webkit-scrollbar": {
    width: 5,
    backgroundColor: "transparent",
  },
  /* Track */
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  /* Thumb */
  "&::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: "#babac0",
  },
  /* Thumb:hover */
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#babac0",
  },
  /* Button (top and bottom of the scrollbar) */
  "&::-webkit-scrollbar-button": {
    display: "none",
  },
}))

export const DrawerLayout = ({
  title,
  actions,
  children,
  withBackButton,
}: {
  title?: string
  withBackButton?: boolean
  actions?: React.ReactNode
  children: React.ReactNode
}) => {
  const theme = useTheme()

  const [open, setOpen] = useState(true)
  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`)

  const triggerDrawer = () => setOpen((s) => !s)

  useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Drawer open={open} isMobile={isMobile} triggerDrawer={triggerDrawer} />

      <Main open={open || isMobile}>
        {title && (
          <Box sx={{ px: 2 }}>
            <ActionHeader title={title} withBackButton={withBackButton}>
              {actions}
            </ActionHeader>
          </Box>
        )}
        <Children
          sx={{
            width: "100%",
            height: `calc(100% - ${APP_BAR_HEIGHT}px)`,
          }}
        >
          {children}
        </Children>
      </Main>

      {isMobile && (
        <Box
          sx={(theme: Theme) => ({
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2.6),
          })}
        >
          <Fab color="primary" onClick={triggerDrawer} size="medium">
            <Menu />
          </Fab>
        </Box>
      )}
    </Box>
  )
}
