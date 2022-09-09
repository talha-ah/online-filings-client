import { alpha } from "@mui/material/styles"

export default function OutlinedInput(theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          /* width */
          "&::-webkit-scrollbar": {
            width: 5,
            backgroundColor: "transparent",
          },
          /* Track */
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          /* Thumb */
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#babac0",
          },
          /* Thumb:hover */
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#babac0",
          },
          /* Button (top and bottom of the scrollbar) */
          "&::-webkit-scrollbar-button": {
            display: "none",
          },
        },
        // notchedOutline: {
        //   borderColor: theme.palette.grey[300],
        // },
        // root: {
        //   "&:hover .MuiOutlinedInput-notchedOutline": {
        //     borderColor: theme.palette.primary.light,
        //   },
        //   "&.Mui-focused": {
        //     boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
        //     "& .MuiOutlinedInput-notchedOutline": {
        //       border: `1px solid ${theme.palette.primary.light}`,
        //     },
        //   },
        //   "&.Mui-error": {
        //     "&:hover .MuiOutlinedInput-notchedOutline": {
        //       borderColor: theme.palette.error.light,
        //     },
        //     "&.Mui-focused": {
        //       boxShadow: `0 0 0 2px ${alpha(theme.palette.error.main, 0.2)}`,
        //       "& .MuiOutlinedInput-notchedOutline": {
        //         border: `1px solid ${theme.palette.error.light}`,
        //       },
        //     },
        //   },
        // },
        // inputSizeSmall: {
        //   padding: "7.5px 8px 7.5px 12px",
        // },
        // inputMultiline: {
        //   padding: 0,
        // },
      },
    },
  }
}
