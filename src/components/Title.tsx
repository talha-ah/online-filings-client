import Typography from "@mui/material/Typography"

export const Title = ({
  sx = {},
  children,
}: {
  sx?: any
  children: React.ReactNode
}) => {
  return (
    <Typography variant="h5" sx={{ fontWeight: "bold", ...sx }}>
      {children}
    </Typography>
  )
}

export const Heading = ({
  sx = {},
  children,
}: {
  sx?: any
  children: React.ReactNode
}) => {
  return (
    <Typography variant="subtitle2" sx={{ ...sx }}>
      {children}
    </Typography>
  )
}
