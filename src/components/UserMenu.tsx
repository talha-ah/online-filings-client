import React from "react"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import Menu from "@mui/material/Menu"
import { Theme } from "@mui/material"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import AccountCircle from "@mui/icons-material/AccountCircle"

import { MenuLink } from "@utils/types"
import { useRouteLinks } from "@hooks/auth"
import { DRAWER_WIDTH } from "@utils/constants"

export const UserMenu = ({
  position = "bottom",
}: {
  position?: "bottom" | "top"
}) => {
  const router = useRouter()
  const { MenuLinks } = useRouteLinks()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const openUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const closeUserMenu = () => setAnchorElUser(null)

  return (
    <Box>
      <IconButton onClick={openUserMenu}>
        <AccountCircle sx={{ fontSize: 32 }} />
      </IconButton>
      <Menu
        keepMounted
        id="user-menu"
        anchorEl={anchorElUser}
        onClose={closeUserMenu}
        open={Boolean(anchorElUser)}
        anchorOrigin={
          position === "top"
            ? { vertical: "top", horizontal: "center" }
            : {
                vertical: "bottom",
                horizontal: "right",
              }
        }
        transformOrigin={
          position === "top"
            ? { vertical: "bottom", horizontal: "center" }
            : {
                vertical: "top",
                horizontal: "right",
              }
        }
        sx={(theme: Theme) => ({
          "& .MuiMenu-paper": {
            py: 0,
            px: 1,
            border: 1,
            boxShadow: 0,
            borderStyle: "solid",
            borderColor: "divider",
            mt: position === "top" ? -1 : 1,
            width: DRAWER_WIDTH - +theme.spacing(4).replace("px", ""),
          },
        })}
      >
        {MenuLinks.map((item: MenuLink) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              if (item.onClick) item.onClick()

              if (item.href) {
                router.push(item.href)
              }
              closeUserMenu()
            }}
          >
            {item.icon && (
              <ListItemIcon color={item.color}>{item.icon}</ListItemIcon>
            )}

            <ListItemText primary={item.label} disableTypography />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
