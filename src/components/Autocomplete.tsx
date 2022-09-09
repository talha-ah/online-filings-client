import { TextField } from "@mui/material"
import { Autocomplete as MAutocomplete } from "@mui/material"

export interface OptionObject {
  readonly key: string
  readonly value: string
  [key: string]: any
}

export const AutocompleteObject = ({
  value,
  label,
  loading,
  options,
  onChange,
  inputValue,
  onInputChange,
}: {
  label?: string
  loading: boolean
  inputValue?: string
  value: OptionObject | null
  onChange: (value: any) => void
  onInputChange: (e: any) => void
  options: ReadonlyArray<OptionObject>
}) => {
  return (
    <MAutocomplete
      clearOnBlur
      value={value}
      options={options}
      loading={loading}
      sx={{ width: 200 }}
      inputValue={inputValue}
      loadingText="Loading..."
      id="search-autocomplete"
      getOptionLabel={(option) => option.value}
      onChange={(event, newValue) => onChange(newValue)}
      onInputChange={(event, newValue) => onInputChange(newValue)}
      isOptionEqualToValue={(option, value) => option.key === value.key}
      renderInput={(params) => (
        <TextField {...params} size="small" label={label} />
      )}
    />
  )
}

export const Autocomplete = ({
  value,
  label,
  loading,
  options,
  onChange,
  inputValue,
  onInputChange,
}: {
  label?: string
  value?: string
  loading: boolean
  inputValue?: string
  onChange: (value: any) => void
  options: ReadonlyArray<string>
  onInputChange: (e: any) => void
}) => {
  return (
    <MAutocomplete
      clearOnBlur
      value={value}
      options={options}
      loading={loading}
      sx={{ width: 200 }}
      inputValue={inputValue}
      loadingText="Loading..."
      id="search-autocomplete"
      noOptionsText="Search..."
      getOptionLabel={(option) => option}
      onChange={(event, newValue) => onChange(newValue)}
      isOptionEqualToValue={(option, value) => option === value}
      onInputChange={(event, newValue) => onInputChange(newValue)}
      renderInput={(params) => (
        <TextField {...params} size="small" label={label} />
      )}
    />
  )
}
