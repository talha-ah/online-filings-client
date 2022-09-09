import React from "react"
import router from "next/router"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { IconButton } from "@components/IconButton"

export const BackButton = () => {
  return (
    <IconButton onClick={() => router.back()}>
      <ArrowBackIcon fontSize="inherit" />
    </IconButton>
  )
}
