import * as React from "react"

import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import { Theme } from "@mui/material/styles"

import { DRAWER_WIDTH, APP_BAR_HEIGHT } from "@utils/constants"

import Header from "./Header"
import Navigation from "./Navigation"
import { UserMenu } from "@components/UserMenu"

export default function DrawerLayout({
  open,
  isMobile,
  triggerDrawer,
}: {
  open: boolean
  isMobile: boolean
  triggerDrawer: () => void
}) {
  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={triggerDrawer}
      variant={isMobile ? "temporary" : "persistent"}
      sx={(theme: Theme) => ({
        flexShrink: 0,
        width: DRAWER_WIDTH,
        "& .MuiDrawer-paper": {
          px: 2,
          display: "flex",
          width: DRAWER_WIDTH,
          flexDirection: "column",
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.default,
        },
      })}
    >
      <Header />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Navigation />

        <Box
          sx={(theme: Theme) => ({
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: `${APP_BAR_HEIGHT}px`,
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
        >
          <UserMenu position="top" />
        </Box>
      </Box>
    </Drawer>
  )
}
