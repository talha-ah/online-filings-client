import { Alert as MuiAlert } from "@mui/material"

export const Alert = ({
  message,
  type = "info",
}: {
  message?: string | null
  type?: "success" | "info" | "warning" | "error"
}) => {
  return message ? (
    <MuiAlert severity={type} sx={{ mt: 2, width: "100%" }}>
      {message}
    </MuiAlert>
  ) : null
}
