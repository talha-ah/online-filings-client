import * as React from "react"

import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import { Select as MuiSelect } from "@mui/material"
import { SelectChangeEvent } from "@mui/material/Select"

type SelectOption = {
  value: string
  label: string
}

export const Select = ({
  value,
  label,
  onChange,
  options = [],
  placeholder,
  size = "small",
  fullWidth = false,
}: {
  value: string
  label?: string
  fullWidth?: boolean
  placeholder?: string
  size?: "medium" | "small"
  onChange: (event: SelectChangeEvent) => void
  options: SelectOption[] | (() => SelectOption[])
}) => {
  return (
    <FormControl fullWidth={fullWidth} size={size} sx={{ minWidth: 200 }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect value={value} label={label} onChange={onChange}>
        {placeholder && <MenuItem value={""}>{placeholder}</MenuItem>}
        {(typeof options === "function" ? options() : options).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
