import { useState } from "react"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"

import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Button } from "@components/Button"
import { ENDPOINTS } from "@utils/constants"

export function InviteUser({
  onClose,
  onSubmit,
}: {
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
        firstName: data.get("firstName"),
        lastName: data.get("lastName") || "",
        email: data.get("email"),
      }

      const response = await api({
        method: "POST",
        uri: ENDPOINTS.invites,
        body: JSON.stringify(body),
        message: "Invite sent successfully",
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
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
            Invite
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export function EditUser({
  value,
  onClose,
  onSubmit,
}: {
  value: any
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
        firstName: data.get("firstName"),
        lastName: data.get("lastName") || "",
        email: data.get("email"),
      }

      const response = await api({
        method: "PUT",
        uri: `${ENDPOINTS.organizationUsers}/${value._id}`,
        body: JSON.stringify(body),
        message: "User updated successfully",
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
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              defaultValue={value.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              defaultValue={value.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue={value.email}
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
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
