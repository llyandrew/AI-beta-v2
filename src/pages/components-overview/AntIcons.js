
import FileUpload from './FileUpload';
import FileChoose from './FileChoose';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// material-ui
import {
  Grid,
  Typography,
  Button
} from '@mui/material';

// ==============================|| AI beta 評鑑檢查 ||============================== //

const AntIconsDefault = () => {
  const buttonStyle = {
    fontSize: '24px',
    background: 'linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)',
  };
  return (
  <Grid>
    <Grid >
      <Typography variant="h2" style={{ fontSize: '30px', color: '#0250c5' }}>評鑑 AI Beta</Typography> <br /> <br />
      <Typography style={{ fontSize: '20px', color: 'gray' }}>歡迎您來到這裡!</Typography> <br />
      <Typography style={{ fontSize: '20px', color: 'gray' }}>您可能會想知道接下來該怎麼做。</Typography>
      <Typography style={{ fontSize: '20px', color: 'gray' }}>可以閱覽下方的 [政府評鑑規範與Jubo系統模組] 開始檢視您需要準備的評鑑工作。</Typography> <br />
      <br />
    </Grid>   

    <Grid>
      <iframe src="https://www.twaea.org.tw/m/406-1772-3655,r186.php?Lang=zh-tw" width="100%" height="500px" title="嵌入的網站"></iframe>
      <br /><br /><br />
    </Grid>

    <Grid >
      <Typography variant="h2" style={{ fontSize: '30px', color: '#0250c5' }}>評鑑準備</Typography> <br /> <br />
      <Typography style={{ fontSize: '20px', color: 'gray' }}>AI Beta協助你更快的查閱準備資料是否完整，並且知道哪些檔案需要調整。</Typography>
      <Typography style={{ fontSize: '20px', color: 'gray' }}>讓你在評鑑前更快速與安心地準備檔案。</Typography> <br />
      <Typography style={{ fontSize: '20px', color: 'gray' }}>以下提供不同類型的範本供您參考 !</Typography> <br /><br />

      {/* <Grid>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=QiKaVs3dH64"
          title="YouTube video"
          allowfullscreen
        ></iframe>
      </Grid> */}

    </Grid> 

    <Grid >
      <FileChoose/>
      <br /><br />
    </Grid>

    <Grid  container rowSpacing={8} columnSpacing={5}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="上次AI評鑑時間" count="11/25" extra="完成度為81%" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3} container direction="row" alignItems="flex-shrink">
        <Button variant="contained" color="primary" style={buttonStyle}>開始進行AI評鑑檢查</Button>
      </Grid>
    </Grid>
    <br /> <br />
    <FileUpload /> 
  </Grid>

//linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)
  );
};

export default AntIconsDefault;
