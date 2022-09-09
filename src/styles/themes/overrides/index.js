import { merge } from "lodash"

import Badge from "./Badge"
import Button from "./Button"
import CardContent from "./CardContent"
import Checkbox from "./Checkbox"
import Chip from "./Chip"
import InputBase from "./InputBase"
import IconButton from "./IconButton"
import InputLabel from "./InputLabel"
import LinearProgress from "./LinearProgress"
import Link from "./Link"
import ListItemIcon from "./ListItemIcon"
import OutlinedInput from "./OutlinedInput"
import DialogActions from "./DialogActions"
import Tab from "./Tab"
import TableCell from "./TableCell"
import Tabs from "./Tabs"
import Typography from "./Typography"
import Paper from "./Paper"
import Grid from "./Grid"
import MenuItem from "./MenuItem"
import ToggleButton from "./ToggleButton"
import MuiListItemButton from "./MuiListItemButton"

export default function ComponentsOverrides(theme) {
  return merge(
    Button(theme),
    // Badge(theme),
    // CardContent(),
    // Checkbox(theme),
    Chip(theme),
    // IconButton(theme),
    InputBase(theme),
    InputLabel(theme),
    // LinearProgress(),
    // Link(),
    // ListItemIcon(),
    OutlinedInput(theme),
    DialogActions(theme),
    // Tab(theme),
    // TableCell(theme),
    // Tabs(),
    // Typography(),
    // Paper(theme),
    ToggleButton(theme),
    Grid(theme),
    MenuItem(theme),
    MuiListItemButton(theme)
  )
}
