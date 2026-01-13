import {
  Box,
  ListItem,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {Link} from "react-router-dom";
import {navLinks} from "../../../scripts/NavbarLinks";

export default function NavDrawer() {
  return (
    <>
      <Box sx={{width: 200}}>
        <nav>
          <List>
            {navLinks &&
              navLinks.map((item) => {
                return (
                  <ListItem disablePadding key={item.label}>
                    <ListItemButton component={Link} to={item.href}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
          </List>
        </nav>
      </Box>
    </>
  );
}
