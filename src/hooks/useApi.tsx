import { useRouter } from "next/router"

import { useSnackbar } from "notistack"
import { useLayoutEffect, useEffect, useRef } from "react"

import DateUtility from "@utils/date"
import { BASE_URL } from "@utils/constants"
import { Response, T } from "@utils/types"
import { getBrowserItem } from "@utils/browser-utility"
import { useAppContext, AuthTypes } from "@contexts/index"

const useBrowserLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

export const useApi = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { enqueueSnackbar } = useSnackbar()

  let controller: any = null

  const isMounted = useRef(false)
  useBrowserLayoutEffect((): (() => void) => {
    controller = new AbortController()

    isMounted.current = true
    return (): void => {
      isMounted.current = false
      controller.abort()
    }
  }, [])

  const api = async ({
    uri,
    body,
    headers,
    message,
    method = "GET",
  }: {
    body?: any
    uri: string
    headers?: any
    method?: string
    message?: string
  }): Promise<T> => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const token = getBrowserItem()
      if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`)
      }

      const response = await fetch(BASE_URL + uri, {
        body,
        method,
        signal: controller?.signal,
        headers: headers || myHeaders,
      })

      if (!response.ok) throw response

      const data: Response = await response.json()

      if (process && process.env.NODE_ENV === "development") {
        console.log(`[Response at ${DateUtility.getLocaleDate()}]:`, data)
      }

      if (message) {
        enqueueSnackbar(message, {
          variant: "success",
          autoHideDuration: 3000,
        })
      }

      if (isMounted.current) {
        // can be used to set local state if needed
        return data
      }
    } catch (err: any) {
      // need to assign to a variable to prevent error when we do error.json() below
      let error = err

      if (!isErrorWithMessage(err)) {
        error = await error.json()
        error = {
          message: error.detail || error.message,
          status: err.status,
        }
      } else {
        error = {
          message: err.message,
          status: error.status || 500,
        }
      }

      if (process && process.env.NODE_ENV === "development") {
        console.log(`[Error at ${DateUtility.getLocaleDate()}]:`, error)
        body && console.log(`Error for Body`, JSON.parse(body))
      }

      let status = error.status

      // if (status === 403) {
      //   // 401 : Token expired / invalid
      //   // Ask to relogin
      //   dispatch({ type: AuthTypes.LOGOUT })
      //   router.replace("/")

      //   // TODO: Use refresh token to get new token
      // } else
      if (status) {
        if (!Array.isArray(error.message)) {
          enqueueSnackbar(error?.message, {
            variant: "error",
            autoHideDuration: 3000,
          })
        }

        throw error
      } else {
        throw error
      }
    }
  }

  return [api]
}

type ErrorWithMessage = {
  message: string
  status?: number
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  )
}
