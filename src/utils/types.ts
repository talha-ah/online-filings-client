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
  sort?: string
  filter?: string
  sortable?: boolean
  filterable?: boolean
  width?: string | number
  minWidth?: string | number
  format?: (value: any) => string
  render?: (value: any) => React.ReactNode
  align?: "right" | "inherit" | "left" | "center" | "justify"
}

export type Task = {
  _id: string
  dueAt: Date
  name: string
  status: "pending" | "completed"
}

export type Project = {
  _id: string
  dueAt: Date
  name: string
  tasks: Task[]
  status: "pending" | "completed"
}
