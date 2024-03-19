import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { UserOutlined, UnorderedListOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = () => {
  const theme = useTheme();

  const [selectedIndex] = useState(0);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
      <ListItemButton selected={selectedIndex === 1} component={RouterLink} to="/login">
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary="登入" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} component={RouterLink} to="/register">
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="註冊" />
      </ListItemButton>

      {/* <ListItemButton selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary="註冊" />
      </ListItemButton> */}
    </List>
  );
};

export default SettingTab;
