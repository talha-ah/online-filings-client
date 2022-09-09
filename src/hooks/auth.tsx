import { useRouter } from "next/router"
import { useEffect, useState, useMemo } from "react"

import Logout from "@mui/icons-material/Logout"
import Settings from "@mui/icons-material/Settings"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined"
import FilterCenterFocusOutlinedIcon from "@mui/icons-material/FilterCenterFocusOutlined"

import { useApi } from "@hooks/useApi"
import { ENDPOINTS } from "@utils/constants"
import { setOrgMetadata } from "@utils/browser-utility"
import { getBrowserItem } from "@utils/browser-utility"
import { AuthTypes, useAppContext } from "@contexts/index"
import { NavLink, MenuLink, Metadata } from "@utils/types"

export const useRouteLinks = () => {
  const router = useRouter()
  const { dispatch } = useAppContext()

  const NavLinks: NavLink[] = useMemo(
    () => [
      {
        type: "group",
        label: "App",
        children: [
          {
            type: "item",
            label: "Dashboard",
            href: "/app/dashboard",
            icon: <AnalyticsOutlinedIcon fontSize="small" color="primary" />,
            exact: true,
          },
          {
            type: "item",
            label: "Users",
            href: "/app/users",
            icon: (
              <FilterCenterFocusOutlinedIcon fontSize="small" color="error" />
            ),
          },
        ],
      },
    ],
    []
  )

  const MenuLinks: MenuLink[] = useMemo(
    () => [
      {
        type: "item",
        href: "/app",
        label: "Home",
        icon: <HomeOutlinedIcon fontSize="small" />,
      },
      {
        type: "item",
        label: "Settings",
        href: "/app/settings",
        icon: <Settings fontSize="small" />,
      },
      {
        type: "item",
        color: "error",
        label: "Logout",
        icon: <Logout fontSize="small" />,
        onClick: () => {
          dispatch({ type: AuthTypes.LOGOUT })
          router.push("/")
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router, dispatch]
  )

  useEffect(() => {
    let app = router.asPath.split("/app/")[1]

    if (router.asPath.split("/app/")[1]) {
      app = app.split("/")[0]
    }

    // eslint-disable-next-line
  }, [router.asPath])

  return { NavLinks, MenuLinks }
}

export const AuthWrapper = ({ children }: { children: any }) => {
  const router = useRouter()
  const { dispatch } = useAppContext()
  const { fetchMetadata } = useFetchMetadata()

  const [api] = useApi()

  const checkAuth = async () => {
    try {
      let route = "/"

      const token = getBrowserItem()

      if (!token) {
        if (router.asPath.startsWith("/app")) route = "/"
        else route = router.asPath

        dispatch({ type: AuthTypes.LOGOUT })
        router.replace(route)
        return
      }

      const response = await api({
        uri: ENDPOINTS.profile,
      })

      dispatch({
        type: AuthTypes.LOGIN,
        payload: { token, user: response?.data },
      })

      // Fetch Metadata
      fetchMetadata()

      if (router.asPath.startsWith("/app")) {
        route = router.asPath
      } else if (
        router.asPath.startsWith("/auth/login") ||
        router.asPath.startsWith("/auth/register")
      ) {
        route = "/"
      } else if (router.asPath.startsWith("/auth")) {
        route = router.asPath
      } else {
        route = "/"
      }

      router.prefetch(route)
      router.replace(route)
    } catch (error: any) {}
  }

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

  return children
}

export const useFetchMetadata = () => {
  const [api] = useApi()

  const [metadata, setMetadata] = useState<Metadata | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchMetadata = async () => {
    try {
      setLoading(true)

      // const response = await api({
      //   uri: `${ENDPOINTS.organizationMetadata}?filter=legalMessages,statuses,statusTexts`,
      // })

      // setMetadata(response?.data)

      // setOrgMetadata(response?.data )
      setOrgMetadata({})
    } catch (error) {
    } finally {
      setLoading(true)
    }
  }

  return { loading, metadata, fetchMetadata }
}
