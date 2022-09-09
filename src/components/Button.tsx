import { Button as MuiButton } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { ButtonProps as MuiButtonProps } from "@mui/material/Button"

interface ButtonProps extends MuiButtonProps {
  loading?: boolean
}

export function Button({ loading, ...props }: ButtonProps) {
  return loading ? (
    <LoadingButton variant="contained" loading={loading} {...props}>
      {props.children}
    </LoadingButton>
  ) : (
    <MuiButton variant="contained" {...props}>
      {props.children}
    </MuiButton>
  )
}
