import React from "react"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import { NextLinkComposed } from "@components/Link"

export default function NotFoundTitle() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "red",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          lineHeight: 1,
          // color: theme.colorScheme === "dark" ? theme.colors.dark[4]: theme.colors.gray[2],
          color: "#fff",
          fontWeight: 900,
          // marginBottom: theme.spacing.xl * 1.5,
          marginBottom: 1.5,
          textAlign: "center",

          fontSize: {
            xs: 120,
            md: 220,
          },
        }}
      >
        404
      </Box>
      <Box
        sx={{
          fontSize: 38,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        You have found a secret place.
      </Box>
      <Box
        sx={{
          maxWidth: 500,
          margin: "auto",
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
        }}
      >
        Unfortunately, this is only a 404 page. You may have mistyped the
        address, or the page has been moved to another URL.
      </Box>
      <Stack spacing={2} direction="row">
        <Button
          to="/"
          size="small"
          variant="contained"
          component={NextLinkComposed}
        >
          Take me back to home page
        </Button>
      </Stack>
    </Box>
  )
}
