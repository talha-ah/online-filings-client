export default function DialogActions(theme) {
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          paddingBottom: theme.spacing(2),
        },
        // standard: {
        //   minWidth: theme.spacing(2),
        //   height: theme.spacing(2),
        //   padding: theme.spacing(0.5),
        // },
      },
    },
  }
}
