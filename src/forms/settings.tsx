import { useEffect, useState } from "react"

import { Box } from "@mui/material"
import { Grid } from "@mui/material"
import { TextField } from "@mui/material"

import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Button } from "@components/Button"
import { ENDPOINTS } from "@utils/constants"
import { useAppContext, AuthTypes } from "@contexts/index"

export function UpdateProfile() {
  const [api] = useApi()
  const { state, dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string | undefined>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string | undefined>("")

  useEffect(() => {
    setFirstName(state.auth.user.first_name)
    setLastName(state.auth.user.last_name)
    setEmail(state.auth.user.email)
    setPhone(state.auth.user.phone)
  }, [state.auth.user])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      if (!firstName || !email) {
        setError("Please fill the required fields")
        return
      }

      const body = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      }

      const response = await api({
        method: "PUT",
        uri: ENDPOINTS.profile,
        body: JSON.stringify(body),
        message: "Profile updated successfully",
      })

      dispatch({
        type: AuthTypes.SET_USER,
        payload: { user: response?.data },
      })
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
        sx={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              name="firstName"
              value={firstName}
              label="First Name"
              autoComplete="given-name"
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              value={lastName}
              label="Last Name"
              autoComplete="family-name"
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              value={email}
              autoComplete="email"
              label="Email Address"
              onChange={(event) => setEmail(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              autoComplete="phone"
              onChange={(event) => setPhone(event.target.value)}
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
          <Button type="submit" loading={loading} variant="text">
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export function UpdatePassword() {
  const [api] = useApi()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [password, setPassword] = useState<string>("")
  const [oldPassword, setOldPassword] = useState<string>("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      if (!password || !oldPassword) {
        setError("Please fill all fields")
        return
      }

      const body = {
        old_password: oldPassword,
        password: password,
      }

      await api({
        method: "PATCH",
        uri: ENDPOINTS.profile,
        body: JSON.stringify(body),
        message: "Password updated successfully",
      })

      setPassword("")
      setOldPassword("")
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
        sx={{ width: "100%" }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              label="Current Password"
              autoComplete="current-password"
              onChange={(event) => setOldPassword(event.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              required
              fullWidth
              id="password"
              type="password"
              name="password"
              value={password}
              label="New Password"
              onChange={(event) => setPassword(event.target.value)}
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
          <Button type="submit" loading={loading} variant="text">
            Update
          </Button>
        </Box>
      </Box>
    </Box>
  )
}