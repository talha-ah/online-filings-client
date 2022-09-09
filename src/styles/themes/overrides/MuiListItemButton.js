export default function MenuItem(theme) {
  return {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          height: theme.spacing(5.5),
          borderRadius: +theme.shape.borderRadius,
        },
      },
    },
  }
}
