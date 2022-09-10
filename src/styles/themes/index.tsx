import { useMemo } from "react"

import { CssBaseline, StyledEngineProvider } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import Palette from "./palette"
import Typography from "./typography"
import componentsOverride from "./overrides"

export default function ThemeCustomization({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 400,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      shape: {
        borderRadius: 4,
      },
      palette: Palette("light"),
      typography: Typography,
    }),
    []
  )

  const customTheme = createTheme(theme)
  customTheme.components = componentsOverride(customTheme)

  return (
    <StyledEngineProvider injectFirst>
      {/* Inject Emotion before JSS */}
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
