import { Tooltip } from "@mui/material"
import { CircularProgress } from "@mui/material"
import { IconButton as MuiIconButton } from "@mui/material"
import { ButtonProps as MuiButtonProps } from "@mui/material/Button"

interface ButtonProps extends MuiButtonProps {
  tooltip?: string
  loading?: boolean
}

// eslint-disable-next-line react/display-name
export const IconButton = ({ loading, tooltip, ...props }: ButtonProps) => {
  return tooltip ? (
    <Tooltip title={tooltip}>
      <MuiIconButton variant="contained" disabled={loading} {...props}>
        {loading ? <CircularProgress size={16} /> : props.children}
      </MuiIconButton>
    </Tooltip>
  ) : (
    <MuiIconButton variant="contained" disabled={loading} {...props}>
      {loading ? <CircularProgress size={16} /> : props.children}
    </MuiIconButton>
  )
}
