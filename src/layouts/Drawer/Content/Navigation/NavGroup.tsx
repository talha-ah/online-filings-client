import { Box, List, Typography } from "@mui/material"

import NavItem from "./NavItem"
import { NavLink } from "@utils/types"

const NavGroup = ({ item }: { item: NavLink }) => {
  const navCollapse = item.children?.map((menuItem: NavLink) => {
    switch (menuItem.type) {
      case "item":
        return <NavItem key={menuItem.label} item={menuItem} />
      default:
        return (
          <Typography
            variant="h6"
            color="error"
            align="center"
            key={menuItem.label}
          >
            Fix - Items
          </Typography>
        )
    }
  })

  return (
    <List
      dense={true}
      // subheader={
      //   item.label && (
      //     <Box sx={{ pl: 2, mb: 1 }}>
      //       <Typography variant="body1" color="textSecondary">
      //         {item.label}
      //       </Typography>
      //     </Box>
      //   )
      // }
    >
      {navCollapse}
    </List>
  )
}

export default NavGroup
