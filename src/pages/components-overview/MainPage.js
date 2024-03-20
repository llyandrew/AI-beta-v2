import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileChoose from './FileChoose';
import FileDownload from './FileDownload';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// material-ui
import { Grid, Typography, Button } from '@mui/material';

// ==============================|| AI beta 評鑑檢查 ||============================== //

const AntIconsDefault = () => {
  // const buttonStyle = {
  //   fontSize: '20px',
  //   background: 'linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)',
  // };
  const [iframeVisible, setIframeVisible] = useState(true);

  const toggleIframeVisibility = () => {
    setIframeVisible(!iframeVisible);
  };

  return (
    <Grid>
      <Grid>
        <Typography variant="h2" style={{ fontSize: '30px', color: '#0250c5' }}>
          AI BETA 評鑑
        </Typography>{' '}
        <br /> <br />
        <Typography style={{ fontSize: '20px', color: 'gray' }}>歡迎您來到這裡 !</Typography> <br />
        <Typography style={{ fontSize: '20px', color: 'gray' }}>您可能會想知道接下來該怎麼做。</Typography>
        <Typography style={{ fontSize: '20px', color: 'gray' }}>
          可以閱覽下方的 [政府評鑑規範與Jubo系統模組] 開始檢視您需要準備的評鑑工作。
        </Typography>{' '}
        <br />
      </Grid>
      <Grid>
        <Button onClick={toggleIframeVisibility}>{iframeVisible ? '收起廣告頁面' : '展開廣告頁面'}</Button>
        {iframeVisible && (
          <iframe src="https://www.twaea.org.tw/m/406-1772-3655,r186.php?Lang=zh-tw" width="100%" height="500px" title="嵌入網站"></iframe>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h2" style={{ fontSize: '30px', color: '#0250c5' }}>
            評鑑準備
          </Typography>{' '}
          <br /> <br />
          <Typography style={{ fontSize: '20px', color: 'gray' }}>
            AI Beta協助你更快的查閱準備資料是否完整，
            <br />
            並且知道哪些檔案需要調整。
          </Typography>
          <Typography style={{ fontSize: '20px', color: 'gray' }}>讓你在評鑑前更快速與安心地準備檔案。</Typography> <br />
          <Typography style={{ fontSize: '20px', color: 'gray' }}>以下提供不同類型的範本供您參考 !</Typography> <br />
          <br />
          <FileChoose />
        </Grid>

        <Grid item xs={12} md={6}>
          <br />
          <br />
          <br />
          <br />
          <br />
          <iframe
            width="90%"
            height="420"
            src="https://www.youtube.com/embed/QiKaVs3dH64"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Grid>
      </Grid>
      <Grid>
        {/* <FileChoose /> */}
        <br />
        <br />
        <br />
        <br />
        <br />
      </Grid>
      <Grid>
        <Typography variant="h2" style={{ fontSize: '30px', color: '#0250c5' }}>
          {' '}
          AI評鑑
        </Typography>{' '}
        <br /> <br />
        <Typography style={{ fontSize: '20px', color: 'gray' }}>底下可以下載上次AI Beta評鑑過後的評鑑資料，</Typography>
        <Typography style={{ fontSize: '20px', color: 'gray' }}>並提供完整的AI評鑑報告以及資訊。</Typography> <br />
        <Typography style={{ fontSize: '20px', color: 'gray' }}>
          若需要再次使用AI Beta評鑑，將檔案拖至最下方的檔案上傳區即可開始評鑑 !
        </Typography>{' '}
        <br />
        <br />
      </Grid>
      <Grid container rowSpacing={8} columnSpacing={5}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce title="上次AI評鑑時間" count="11/25" extra="完成度為81%" />
        </Grid>
        {/* <Grid item container direction="row" alignItems="flex-shrink">
          <Button variant="contained" color="primary" style={buttonStyle} raised>下載上次評鑑資料夾</Button>
        </Grid> */}
      </Grid>
      <br />
      <FileDownload />
      <br /> <br />
      <FileUpload />
    </Grid>

    //linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)
  );
};

export default AntIconsDefault;
