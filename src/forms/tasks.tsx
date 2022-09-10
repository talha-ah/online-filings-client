import { useState } from "react"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Button } from "@components/Button"
import { ENDPOINTS } from "@utils/constants"
import { DatePicker } from "@components/DatePicker"

export function CreateTask({
  project,
  onClose,
  onSubmit,
}: {
  project: any
  onClose?: () => void
  onSubmit?: (args: any) => void
}) {
  const [api] = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        name: data.get("name"),
        projectId: project._id,
        dueAt: data.get("dueAt"),
      }

      const response = await api({
        body,
        method: "POST",
        uri: ENDPOINTS.tasks,
        message: "Task created successfully",
      })

      onSubmit && onSubmit(response?.data)
      onClose && onClose()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "100%", mt: 1 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              autoFocus
              fullWidth
              id="name"
              name="name"
              label="Name"
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              required
              fullWidth
              id="dueAt"
              name="dueAt"
              label="Due At"
            />
          </Grid>
        </Grid>

        <Alert type="error" message={error} />

        <Box
          sx={{
            pt: 2,
            gap: 2,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={onClose} variant="text">
            Cancel
          </Button>
          <Button type="submit" loading={loading} variant="text">
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
