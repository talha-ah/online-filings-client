export default function MenuItem(theme) {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          height: theme.spacing(5.5),
          borderRadius: +theme.shape.borderRadius,
        },
      },
    },
  }
}
