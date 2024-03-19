import PropTypes from 'prop-types';

// material-ui
import { Box, Grid, Typography } from '@mui/material';

// project import
import AuthCard from './AuthCard';
import Logo from 'components/Logo';
import AuthFooter from 'components/cards/AuthFooter';

// assets
// import AuthBackground from 'assets/images/auth/AuthBackground';

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

const AuthWrapper = ({ children }) => (
  <Box sx={{ minHeight: '100vh' }}>
    {/* <AuthBackground /> */}
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        minHeight: '100vh'
      }}
    >
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: { xs: 'calc(100vh - 134px)', md: 'calc(100vh - 112px)' } }}
        >
          <Grid item xs={15} container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 5 }}>
            <Grid item>
              <Logo />
            </Grid>
            <Grid item>
              <Typography color="secondary" style={{ fontSize: '40px' }}>
                評鑑雲
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={15} sx={{ mt: 1 }}>
            <Typography variant="h4" align="center" color="secondary">
              we connect care
            </Typography>
          </Grid>
          <Grid item>
            <AuthCard>{children}</AuthCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid>
    </Grid>
  </Box>
);

AuthWrapper.propTypes = {
  children: PropTypes.node
};

export default AuthWrapper;
