import React from "react"
import { useEffect, useState } from "react"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import useMediaQuery from "@mui/material/useMediaQuery"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { styled, useTheme, Theme } from "@mui/material/styles"

import { Logo } from "@components/Logo"
import { UserMenu } from "@components/UserMenu"
import { APP_BAR_HEIGHT } from "@utils/constants"
import { NextLinkComposed } from "@components/Link"
import { useAppContext, AuthTypes } from "@contexts/index"

const Main = styled("main")(({ theme }) => ({
  padding: 0,
  width: "100vw",
  height: "100vh",
  display: "flex",
  overflow: "hidden",
  flexDirection: "column",
  backgroundColor: theme.palette.background.default,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const Children = styled(Container)(() => ({
  height: "100%",
  overflow: "auto",
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

export const HeaderLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme()

  const isMobile = useMediaQuery(`(max-width:${theme.breakpoints.values.md}px)`)

  return (
    <Main>
      <Header isMobile={isMobile} />

      <Children maxWidth="xl">{children}</Children>
    </Main>
  )
}

const Header = ({ isMobile }: { isMobile: boolean }) => {
  const { state, dispatch } = useAppContext()

  const [open, setOpen] = useState(true)
  const toggleDrawer = () => setOpen((s) => !s)

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
      <Container maxWidth="xl" component="main">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />

          <Box
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              color="primary"
              onClick={() => {
                dispatch({ type: AuthTypes.TRIGGER_THEME })
              }}
            >
              {state.auth.theme === "light" ? (
                <DarkModeIcon fontSize="small" />
              ) : (
                <LightModeIcon fontSize="small" />
              )}
            </IconButton>

            {state.auth.user ? (
              <UserMenu />
            ) : (
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                {!isMobile && (
                  <Button
                    to="/auth/register"
                    variant="contained"
                    component={NextLinkComposed}
                  >
                    Register
                  </Button>
                )}
                <Button
                  to="/auth/login"
                  variant="outlined"
                  component={NextLinkComposed}
                >
                  Login
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}