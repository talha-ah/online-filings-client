import { useState } from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import FormControlLabel from "@mui/material/FormControlLabel"

import Link from "@components/Link"
import { useApi } from "@hooks/useApi"
import { Alert } from "@components/Alert"
import { Button } from "@components/Button"
import { ENDPOINTS } from "@utils/constants"
import { AuthTypes, useAppContext } from "@contexts/index"

export function LoginForm() {
  const [api] = useApi()
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        email: data.get("email"),
        password: data.get("password"),
      }

      const response = await api({
        method: "POST",
        uri: ENDPOINTS.login,
        body: JSON.stringify(body),
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: {
          ...response?.data,
          token: response?.data.access_token,
        },
      })

      router.replace("/app")
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
      <Typography component="h1" variant="h4">
        Sign in
      </Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, maxWidth: "xs" }}
      >
        <TextField
          required
          autoFocus
          fullWidth
          id="email"
          name="email"
          margin="normal"
          autoComplete="email"
          label="Email Address"
          defaultValue="manohar@pawar.com"
        />
        <TextField
          required
          fullWidth
          id="password"
          margin="normal"
          name="password"
          type="password"
          label="Password"
          defaultValue="password!2"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 2 }} fullWidth loading={loading}>
          Sign In
        </Button>
        <Box
          sx={{
            mt: 2,
            gap: 1,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          Don&apos;t have an account?
          <Link href="/auth/register">Register here</Link>
        </Box>
      </Box>
    </Box>
  )
}

export function Registerform() {
  const [api] = useApi()
  const router = useRouter()
  const { dispatch } = useAppContext()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        first_name: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password"),
        email: data.get("email"),
        phone: data.get("phone"),
      }

      const response = await api({
        method: "POST",
        uri: ENDPOINTS.register,
        body: JSON.stringify(body),
        message: "Registered successfully",
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: {
          ...response?.data,
          token: response?.data.access_token,
        },
      })

      router.replace("/app")
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
      <Typography component="h1" variant="h4">
        Sign up
      </Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, maxWidth: "xs" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              autoFocus
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              label="Email Address"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone"
              autoComplete="phone"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              label="I want to receive updates"
              control={<Checkbox value="allowExtraEmails" color="primary" />}
            />
          </Grid>
        </Grid>
        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 2 }} fullWidth loading={loading}>
          Sign Up
        </Button>

        <Box
          sx={{
            mt: 2,
            gap: 1,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          Already have an account?
          <Link href="/auth/login">Sign in</Link>
        </Box>
      </Box>
    </Box>
  )
}

export function RecoverPasswordRequestForm() {
  const [api] = useApi()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      await api({
        method: "POST",
        uri: `${ENDPOINTS.recoverPassword}/${data.get("email")}`,
        message: "Password reset link sent",
      })

      router.replace("/auth/login")
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
      <Typography component="h1" variant="h4">
        Recover Password
      </Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, maxWidth: "xs" }}
      >
        <TextField
          required
          autoFocus
          fullWidth
          id="email"
          name="email"
          margin="normal"
          autoComplete="email"
          label="Email Address"
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 2 }} fullWidth loading={loading}>
          Recover Password
        </Button>
        <Box
          sx={{
            mt: 2,
            gap: 1,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Link href="/auth/login">{"Already have an account? Sign in"}</Link>
        </Box>
      </Box>
    </Box>
  )
}

export function AcceptInviteForm({
  name,
  token,
}: {
  name: string
  token: string
}) {
  const [api] = useApi()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        password: data.get("password"),
      }

      if (body.password !== data.get("confirmPassword")) {
        throw new Error("Passwords do not match")
      }

      await api({
        method: "POST",
        uri: `${ENDPOINTS.acceptInvite}/${token}`,
        body: JSON.stringify(body),
        message: "Registered successfully",
      })

      router.replace("/auth/login")
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
      <Typography component="h1" variant="h4">
        {name} - Complete your registration
      </Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, maxWidth: "xs" }}
      >
        <TextField
          required
          fullWidth
          id="password"
          type="password"
          margin="normal"
          name="password"
          label="Password"
          autoComplete="new-password"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          label="Confirm Password"
          autoComplete="confirm-password"
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 2 }} fullWidth loading={loading}>
          Accept Invite
        </Button>
      </Box>
    </Box>
  )
}

export function RecoverPasswordForm({ token }: { token: string }) {
  const [api] = useApi()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      setError(null)
      setLoading(true)

      const data = new FormData(event.currentTarget)

      const body = {
        password: data.get("password"),
      }

      if (body.password !== data.get("confirmPassword")) {
        throw new Error("Passwords do not match")
      }

      await api({
        method: "PUT",
        uri: `${ENDPOINTS.recoverPassword}/${token}`,
        body: JSON.stringify(body),
        message: "Password updated successfully",
      })

      router.replace("/auth/login")
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
      <Typography component="h1" variant="h4">
        Enter your new password
      </Typography>

      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 4, maxWidth: "xs" }}
      >
        <TextField
          required
          fullWidth
          id="password"
          margin="normal"
          name="password"
          type="password"
          label="New Password"
          autoComplete="new-password"
        />
        <TextField
          required
          fullWidth
          margin="normal"
          id="confirmPassword"
          name="confirmPassword"
          type="confirmPassword"
          label="Confirm Password"
          autoComplete="confirm-password"
        />

        <Alert type="error" message={error} />
        <Button type="submit" sx={{ mt: 2 }} fullWidth loading={loading}>
          Update Password
        </Button>
      </Box>
    </Box>
  )
}
