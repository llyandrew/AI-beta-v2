import React, { useCallback, useState, useEffect } from 'react';
import FileDownload from './FileDownload';
import FileChoose from './FileChoose';
import FileUpload from './FileUpload';
import { Dropdown } from 'primereact/dropdown';

// material-ui
import { Box, Button, Grid, Stack, Typography, Dialog } from '@mui/material';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import CreateIcon from '@mui/icons-material/Create';

// project import
import SmallitemTable from './SmallitemTable';
import WeekMonthChart from './WeekMonthChart';
import BigItemChart from './BigItemChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const today = dayjs();

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  const [slot, setSlot] = useState('week');
  const [table, setTable] = useState('rowsA');
  const [iframeVisible, setIframeVisible] = useState(true);

  const toggleIframeVisibility = () => {
    setIframeVisible(!iframeVisible);
  };

  const [iframeUrl, setIframeUrl] = useState('');
  const [youtubeCode, setYoutubeCode] = useState('QiKaVs3dH64');

  const fetchBulletin = useCallback(async () => {
    try {
      const data = await callApi('/bulletin', 'GET', { withToken: false });
      if (data?.iframeUrl) {
        setIframeUrl(data?.iframeUrl);
      }
      if (data?.youtube) {
        setYoutubeCode(data?.youtube);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState(today);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const [selectedDate2, setSelectedDate2] = useState(today);
  const [isCalendarOpen2, setCalendarOpen2] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
  };

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };

  const toggleCalendar2 = () => {
    setCalendarOpen2(!isCalendarOpen);
  };

  const handleCloseCalendar2 = () => {
    setCalendarOpen2(false);
  };

  const formattedDate = selectedDate.format('M/D'); // 評鑑時間
  const formattedYear = selectedDate.format('YYYY');
  const daysRemaining = selectedDate.diff(today, 'day');

  const formattedDate2 = selectedDate2.format('M/D'); // 督察時間
  const formattedYear2 = selectedDate2.format('YYYY');
  const daysRemaining2 = selectedDate2.diff(today, 'day');

  useEffect(() => {
    fetchBulletin();
  }, [fetchBulletin]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '0 75px', marginLeft: '40px' }}>
      <Grid>
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
          {/* ============|| 儀表板主頁三項目 ||============ */}
          <Grid item container alignItems="center" justifyContent="space-between" sx={{ mb: -2.25 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h1" style={{ marginRight: '10px' }}>
                輕鬆評鑑從這裡開始，立即啟動評鑑雲AI
              </Typography>
              <Button
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                size="large"
                sx={{ ml: 2.5, pl: 1 }}
                startIcon={<AutoGraphIcon />}
                style={{
                  backgroundColor: '#00B4BC',
                  borderColor: '#00B4BC',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  boxShadow: 'none',
                  fontSize: '20px'
                }}
              >
                開始檢查
              </Button>
              <div></div>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3.8}>
            <AnalyticEcommerce title="最近一次評鑑完成度" count="81%" percentage={15.3} extra="15.3%" />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3.8}>
            <AnalyticEcommerce title="距離下次評鑑時間" count={formattedDate} year={formattedYear} extra={`剩餘${daysRemaining + 1}天`}>
              <Button size="extra-large" onClick={toggleCalendar} startIcon={<CreateIcon />} style={{ color: '#00B4BC' }}></Button>
            </AnalyticEcommerce>
            <Dialog open={isCalendarOpen} onClose={handleCloseCalendar} fullWidth maxWidth="xs">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={selectedDate} onChange={handleDateChange} disablePast />
              </LocalizationProvider>
            </Dialog>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3.8}>
            <AnalyticEcommerce title="距離下次督察時間" count={formattedDate2} year={formattedYear2} extra={`剩餘${daysRemaining2 + 1}天`}>
              <Button size="extra-large" onClick={toggleCalendar2} startIcon={<CreateIcon />} style={{ color: '#00B4BC' }}></Button>
            </AnalyticEcommerce>
            <Dialog open={isCalendarOpen2} onClose={handleCloseCalendar2} fullWidth maxWidth="xs">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar value={selectedDate2} onChange={handleDateChange2} disablePast />
              </LocalizationProvider>
            </Dialog>
          </Grid>

          <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

          {/* ============|| 分項完成度 ||============ */}
          <Grid item xs={12} md={7} lg={8}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">評鑑進度</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={0}>
                  <Button
                    size="medium"
                    onClick={() => setSlot('month')}
                    style={{
                      fontSize: '17px',
                      color: slot === 'month' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: slot === 'month' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
                  >
                    每月進度
                  </Button>
                  <Button
                    size="medium"
                    onClick={() => setSlot('week')}
                    style={{
                      fontSize: '17px',
                      color: slot === 'week' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: slot === 'week' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
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

          {/* ============|| 廣告業面 ||============ */}
          <Grid item xs={12} md={5} lg={3.8}>
            <div style={{ marginLeft: '10px' }}>
              {' '}
              <Grid container justifyContent="flex-end">
                <Grid item sx={{ mr: 4 }}>
                  {' '}
                  <Button size="medium" onClick={toggleIframeVisibility} style={{ color: '#00B4BC', fontSize: '17px', marginLeft: '20px' }}>
                    {iframeVisible ? '收起廣告頁面' : '展開廣告頁面'}
                  </Button>
                </Grid>
              </Grid>
              <Box sx={{ pt: 2, pr: 3 }}></Box>
              {iframeVisible && <iframe src={iframeUrl} width="90%" height="470px" title="嵌入網站"></iframe>}
            </div>
          </Grid>

          {/* ============|| AI 檢查結果 ||============ */}
          <Grid item xs={2} md={5} lg={3.7}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h4">AI 檢查結果</Typography>
                {/* <Typography variant="h5">此為 AI 自動分析，僅確認關鍵字皆符合，請再次確認評鑑內容已填寫完整</Typography> */}
              </Grid>
              <Grid item />
            </Grid>
            <br />
            <Grid>
              <span className="p-float-label" style={{ width: '100%', maxWidth: '30rem' }}>
                <Dropdown inputId="id-area" optionLabel="name" className="w-full" />
                <label htmlFor="id-area" style={{ fontSize: '1.1rem' }}>
                  檢查日期
                </label>
              </span>
            </Grid>
            <MainCard sx={{ mt: 2 }} content={false}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Stack spacing={2}>
                  <Typography variant="h5" color="textSecondary">
                    總共完成度
                  </Typography>
                  <Typography variant="h1">81%</Typography>
                </Stack>
              </Box>
              <BigItemChart />
            </MainCard>
            <br />
            <FileDownload />
            <br />
            <br />
          </Grid>

          {/* ============|| 項目細項完成度 ||============ */}
          <br />
          <br />
          <Grid item xs={12} md={7} lg={7.8}>
            <Box sx={{ p: 5, pb: 2 }}></Box>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Button
                    size="extra-large"
                    onClick={() => setTable('rowsA')}
                    style={{
                      fontSize: '17px',
                      color: table === 'rowsA' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: table === 'rowsA' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
                  >
                    A項目
                  </Button>

                  <Button
                    size="extra-large"
                    onClick={() => setTable('rowsB')}
                    style={{
                      fontSize: '17px',
                      color: table === 'rowsB' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: table === 'rowsB' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
                  >
                    B項目
                  </Button>
                  <Button
                    size="extra-large"
                    onClick={() => setTable('rowsC')}
                    style={{
                      fontSize: '17px',
                      color: table === 'rowsC' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: table === 'rowsC' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
                  >
                    C項目
                  </Button>
                  <Button
                    size="extra-large"
                    onClick={() => setTable('rowsD')}
                    style={{
                      fontSize: '17px',
                      color: table === 'rowsD' ? '#00B4BC' : '#8c8c8c',
                      borderBottom: table === 'rowsD' ? '3px solid #00B4BC' : '2px solid transparent',
                      borderRadius: '0'
                    }}
                  >
                    D項目
                  </Button>
                </Stack>
              </Grid>
              <Grid item />
            </Grid>
            <MainCard sx={{ mt: 2.2 }} content={false}>
              <SmallitemTable table={table} />
            </MainCard>
            <br />
          </Grid>

          {/* 但書
        <Typography variant="h5" style={{ color: '#808080', textAlign: 'right', marginLeft: '400px' }}>
          <br />
          <br />
          此為 AI 自動分析，僅確認關鍵字皆符合，請再次確認評鑑內容已填寫完整
          <br />
        </Typography> */}
        </Grid>

        {/* ============|| 選擇檔案下載 ||============ */}
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Grid item>
              <Typography variant="h4">評鑑範本下載</Typography>
            </Grid>
            <br />
            <FileChoose />
            <br />
            <Typography style={{ fontSize: '20px', color: 'gray' }}>下載評鑑範本後，請參考教學影片將您的資料放入範本資料夾中。</Typography>
          </Grid>

          {/* ============|| youtube影片 ||============ */}
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 4, pb: 2 }}></Box>
            <iframe
              width="90%"
              height="400"
              src={`https://www.youtube.com/embed/${youtubeCode}`}
              // src="https://www.youtube.com/embed/ZBBVYna6G98"
              // src="https://www.youtube.com/embed/QiKaVs3dH64"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Grid>
        </Grid>

        {/* ============|| AI評鑑 上傳檔案 ||============ */}
        <br />
        <Grid item>
          <Typography variant="h4">AI 評鑑檢查</Typography>
          <br />
          <FileUpload />
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardDefault;
