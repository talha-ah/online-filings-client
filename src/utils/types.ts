import React from "react"

export type T = Awaited<Promise<Response>>

export type ThemeMode = "light" | "dark"

export type DateRangeType = [Date | null, Date | null]

export type Interval = "day" | "week" | "month" | "year"

export type Color =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"

export type ActionType = {
  type: string
  payload: any
}

export type Freeze<T> = {
  readonly [P in keyof T]: T[P]
}

export type Metadata = {
  [key: string]: any
}

export type AuthStateType = {
  user: User
  token: string
  isAuth: boolean
  loading: boolean
  theme: ThemeMode
  refresh_token: string
}

export type NavLink = {
  type: string
  href?: string
  label: string
  color?: string
  exact?: boolean
  children?: NavLink[]
  icon?: React.ReactElement
}

export type MenuLink = {
  type: string
  href?: string
  label: string
  icon?: React.ReactElement
  onClick?: () => void
}

export type Response =
  | {
      data: any
      message: string
      success: boolean
      pagination?: Pagination
    }
  | undefined

export type Pagination = {
  page: number
  limit: number
  total_pages: number
  total_count: number
}

export type DataTableHeader = {
  id: string
  label: string
  align?: "right" | "inherit" | "left" | "center" | "justify"
  width?: string | number
  minWidth?: string | number
  sortable?: boolean
  sort?: string
  filterable?: boolean
  filter?: string
  format?: (value: any) => string
  render?: (value: any) => React.ReactNode
}

export type User = {
  _id: string
  name: string
  first_name: string
  last_name?: string
  email: string
  phone?: string
  role: string
  status?: "active" | "inactive"
}

export type QueryType = "author" | "article" | "co-author"

export type Invite = {
  _id: string
  name: string
  first_name: string
  last_name?: string
  email: string
  organization_id: string
}
