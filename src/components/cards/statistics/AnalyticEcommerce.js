import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, year, isLoss, extra, children }) => (
  <MainCard contentSX={{ p: 2.25, position: 'relative' }}>
    <Stack spacing={0.5}>
      <Typography variant="h4" color="textSecondary">
        {title}
      </Typography>
      <Grid container alignItems="center">
        <Grid item>
          <Typography variant="h2" color="inherit">
            {count}
          </Typography>
        </Grid>
        {year && (
          <Typography variant="h4" color="textSecondary" sx={{ ml: 0.75, pl: 1 }}>
            {year}
          </Typography>
        )}
        {percentage && (
          <Grid item>
            <Chip
              variant="combined"
              color={color}
              icon={
                <>
                  {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                  {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                </>
              }
              label={`${percentage}%`}
              sx={{ ml: 1.25, pl: 1, backgroundColor: '#00B4BC' }}
              size="small"
            />
          </Grid>
        )}
      </Grid>
    </Stack>
    <Box sx={{ pt: 3, position: 'absolute', top: 0, right: 0 }}>
      {children} {/* Render additional components or buttons here */}
    </Box>
    <Box sx={{ pt: 3 }}>
      <Typography variant="caption" color="textSecondary">
        {' '}
        <Typography component="span" variant="h5" sx={{ color: '#00B4BC' }}>
          {extra}
        </Typography>{' '}
      </Typography>
    </Box>
  </MainCard>
);

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
  color: 'primary'
};

export default AnalyticEcommerce;
