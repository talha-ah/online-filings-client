import { useRouter } from "next/router"

import {
  Theme,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material"

import { NavLink } from "@utils/types"

const NavItem = ({ item }: { item: NavLink }) => {
  const router = useRouter()

  const Icon = item.icon
  const isExternal = item.href?.startsWith("http")
  const isSelected = item.href
    ? item.exact
      ? router.asPath === item.href
      : router.asPath.startsWith(item.href)
    : false

  const itemHandler = () => {
    if (item.href) {
      if (isExternal) {
        window.open(item.href, "_blank")
      } else {
        router.push(item.href)
      }
    }
  }

  return (
    <ListItemButton
      key={item.label}
      onClick={itemHandler}
      selected={isSelected}
      sx={(theme: Theme) => ({
        mb: 1,
      })}
    >
      {Icon && (
        <ListItemIcon
          sx={{
            mr: 1,
            width: 32,
            height: 32,
            minWidth: 24,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Icon}
        </ListItemIcon>
      )}
      <ListItemText primary={item.label} disableTypography />
    </ListItemButton>
  )
}

export default NavItem
