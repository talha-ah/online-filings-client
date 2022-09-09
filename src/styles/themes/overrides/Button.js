export default function Button(theme) {
  const disabledStyle = {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
    },
  }

  return {
    MuiButton: {
      defaultProps: {
        // size: "small",
        // disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 400,
          textTransform: "none",
          // borderRadius: theme.shape.borderRadius,
        },
        contained: {
          // ...disabledStyle,
        },
        outlined: {
          // ...disabledStyle,
        },
      },
    },
  }
}
