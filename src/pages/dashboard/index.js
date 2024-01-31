import { useState } from 'react';

// material-ui
import {
//  Avatar,
//  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
//  ListItemAvatar,
  ListItemButton,
//  ListItemSecondaryAction,
//  ListItemText,
//  MenuItem,
  Stack,
//  TextField,
  Typography
} from '@mui/material';

// project import
import SmallitemTable from './SmallitemTable';
import WeekMonthChart from './WeekMonthChart';
import BigItemChart from './BigItemChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  // const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [table, setTable] = useState('rowsA');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h2" style={{ color: '#0250c5' }}>儀表板</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="最近一次評鑑完成度" count="81%" percentage={15.3} extra="15.3%" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="距離下次評鑑時間" count="1/13" extra="剩餘4天" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="距離下次督察時間" count="12/25" extra="剩餘355天" />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid> */}

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* 分項完成度 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <br /><Typography variant="h2" style={{ color: '#0250c5' }}>評鑑進度</Typography>  <br />
          </Grid>
          <Grid item>
            <Typography variant="h4">評鑑完成進度時間表</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="medium"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                每月進度
              </Button>
              <Button
                size="medium"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                每周進度
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <WeekMonthChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
          <br /><br /><br />
            <Typography variant="h4" >各項目完成度</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h5" color="textSecondary">
                總共完成度
              </Typography>
              <Typography variant="h3">81%</Typography>
            </Stack>
          </Box>
          <BigItemChart />
        </MainCard>
      </Grid>
      {/* 項目細項完成度 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">評鑑項目細項AI符合率</Typography>
            </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="medium"
                onClick={() => setTable('rowsA')}
                color={table === 'rowsA' ? 'primary' : 'secondary'}
                variant={table === 'rowsA' ? 'outlined' : 'text'}
              >
                A項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsB')}
                color={table === 'rowsB' ? 'primary' : 'secondary'}
                variant={table === 'rowsB' ? 'outlined' : 'text'}
              >
                B項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsC')}
                color={table === 'rowsC' ? 'primary' : 'secondary'}
                variant={table === 'rowsC' ? 'outlined' : 'text'}
              >
                C項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsD')}
                color={table === 'rowsD' ? 'primary' : 'secondary'}
                variant={table === 'rowsD' ? 'outlined' : 'text'}
              >
                D項目
              </Button>
            </Stack>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <SmallitemTable table={table}/>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item><p/>
              <Typography variant="h4">細項關鍵字報告</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
              <ListItemButton divider>
                <Typography variant="h5">缺少的細項關鍵字 :</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <Typography variant="h5">長照機構<br />教育訓練</Typography>
              </ListItemButton>
            </List>
          </MainCard>
        </Grid>

            {/* 分項完成度 */}
            <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sx={{ mb: -2.25 }}>
            <br /> <Typography variant="h2" style={{ color: '#0250c5' }}>督察進度</Typography>  <br />
          </Grid>
          <Grid item>
            <Typography variant="h4">督察完成進度時間表</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="medium"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                每月進度
              </Button>
              <Button
                size="medium"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                每周進度
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <WeekMonthChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <br /><br /><br />
            <Typography variant="h4">各項目完成度</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h5" color="textSecondary">
                總共完成度
              </Typography>
              <Typography variant="h3">81%</Typography>
            </Stack>
          </Box>
          <BigItemChart />
        </MainCard>
      </Grid>
      {/* 項目細項完成度 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h4">督察細項AI符合率</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="medium"
                onClick={() => setTable('rowsA')}
                color={table === 'rowsA' ? 'primary' : 'secondary'}
                variant={table === 'rowsA' ? 'outlined' : 'text'}
              >
                A項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsB')}
                color={table === 'rowsB' ? 'primary' : 'secondary'}
                variant={table === 'rowsB' ? 'outlined' : 'text'}
              >
                B項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsC')}
                color={table === 'rowsC' ? 'primary' : 'secondary'}
                variant={table === 'rowsC' ? 'outlined' : 'text'}
              >
                C項目
              </Button>
              <Button
                size="medium"
                onClick={() => setTable('rowsD')}
                color={table === 'rowsD' ? 'primary' : 'secondary'}
                variant={table === 'rowsD' ? 'outlined' : 'text'}
              >
                D項目
              </Button>
            </Stack>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <SmallitemTable table={table}/>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item><p/>
            <Typography variant="h4">細項關鍵字報告</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <Typography variant="h5">缺少的細項關鍵字 :</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <Typography variant="h5">長照機構<br />教育訓練</Typography>
            </ListItemButton>
          </List>
        </MainCard>
      </Grid> 
      <Typography variant="h5" style={{ color: '#808080', textAlign: 'right', marginLeft: '400px' }} ><br/><br/>此為 AI 自動分析，僅確認關鍵字皆符合，請再次確認評鑑內容已填寫完整<br/></Typography>
    </Grid>
  );
};

export default DashboardDefault;
