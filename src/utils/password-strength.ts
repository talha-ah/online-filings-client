// has number
const hasNumber = (input: string) => new RegExp(/[0-9]/).test(input)

// has mix of small and capitals
const hasMixed = (input: string) =>
  new RegExp(/[a-z]/).test(input) && new RegExp(/[A-Z]/).test(input)

// has special chars
const hasSpecial = (input: string) =>
  new RegExp(/[!#@$%^&*)(+=._-]/).test(input)

// set color based on password strength
export const strengthColor = (count: number) => {
  if (count < 2) return { label: "Poor", color: "error.main" }
  if (count < 3) return { label: "Weak", color: "warning.main" }
  if (count < 4) return { label: "Normal", color: "warning.dark" }
  if (count < 5) return { label: "Good", color: "success.main" }
  if (count < 6) return { label: "Strong", color: "success.dark" }
  return { label: "Poor", color: "error.main" }
}

// password strength indicator
export const strengthIndicator = (input: string) => {
  let strengths = 0
  if (input.length > 5) strengths += 1
  if (input.length > 7) strengths += 1
  if (hasNumber(input)) strengths += 1
  if (hasSpecial(input)) strengths += 1
  if (hasMixed(input)) strengths += 1
  return strengths
}
