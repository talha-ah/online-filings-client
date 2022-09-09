import * as React from "react"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export type Option = {
  label: string
  value: string
}

export const ToggleButtons = ({
  value,
  options,
  onClick,
}: {
  value: string
  options: Option[]
  onClick: (arg: any) => void
}) => {
  return (
    <ToggleButtonGroup
      size="small"
      value={value}
      exclusive={true}
      // onChange={handleChange}
    >
      {options.map((option: Option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          aria-label={option.label}
          onClick={() => onClick(option)}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
