// material-ui
import { Box, Typography, useMediaQuery } from '@mui/material';
//import { GithubOutlined } from '@ant-design/icons';

// project import
// import Search from './Search';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';
import Logo from 'components/Logo';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <>
      {/* {!matchesXs && <Search />} */}
      <Box sx={{ display: 'flex' }}>
        <Logo />
        <Typography variant="h3" color="textSecondary" style={{ marginTop: '4px', marginLeft: '10px' }}>
          評鑑雲
        </Typography>
      </Box>

      <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        {' '}
        {/* <Notification /> */}
        {!matchesXs && <Profile />}
        {matchesXs && <MobileSection />}
      </Box>
    </>
  );
};

export default HeaderContent;
