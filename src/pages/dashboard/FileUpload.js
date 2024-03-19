import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography, Grid, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/system';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import MainCard from 'components/MainCard';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const DropzoneArea = styled('div')({
  border: 'none',
  backgroundColor: 'transparent',
  padding: 16,
  textAlign: 'center',
  cursor: 'pointer'
});

export default function FileUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [isUploadDisabled, setUploadDisabled] = useState(false); //設定檔案上傳大小限制
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(0); // 重置當前頁碼
  };

  const totalPages = Math.ceil(acceptedFiles.length / pageSize);
  const currentFiles = acceptedFiles.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePageChange = (direction) => {
    if (direction === 'prev') {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    } else if (direction === 'next') {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    }
  };

  const upload = useCallback(async () => {
    for (let file of acceptedFiles) {
      if (file.size > 6 * 1024) {
        setUploadDisabled(true);
        alert('檔案過大');
        return;
      }
    }

    const formData = new FormData();
    for (let file of acceptedFiles) {
      formData.append('files[]', file, file.path);
    }

    try {
      // Uncomment and customize the axios code for your server
      // await axios.post('https://localhost:7205/Pika/upload', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });
      alert('檔案上傳成功');
    } catch (error) {
      console.error('上傳檔案時發生錯誤:', error);
      alert('檔案上傳失敗');
    }
  }, [acceptedFiles]);

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.path} - {file.name} - {file.size} bytes - {file.type}
    </li>
  ));

  const extractCategoryNum = (path) => {
    const parts = path.split('/');
    const lastPartNum = parts[parts.length - 2];
    return lastPartNum.slice(0, 2);
  };

  const extractCategoryPath = (path) => {
    const parts = path.split('/');
    const lastPartPath = parts[parts.length - 2];
    return lastPartPath.substring(2);
  };

  return (
    <MainCard style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container justifyContent="space-between" alignItems="center">
        {files.length >= 1 && (
          <Typography variant="h6" style={{ fontSize: '17px', marginTop: '20px', alignSelf: 'flex-start' }}>
            已上傳{files.length}個檔案
          </Typography>
        )}
        {files.length >= 1 && (
          <Button
            onClick={() => upload()}
            size="large"
            startIcon={<AutoGraphIcon />}
            style={{
              backgroundColor: isUploadDisabled ? '#9c9c9c' : '#00B4BC',
              borderColor: '#00B4BC',
              color: '#FFFFFF',
              borderRadius: '999px',
              boxShadow: 'none',
              fontSize: '17px',
              marginTop: '10px'
            }}
            disabled={isUploadDisabled}
          >
            開始AI檢查
          </Button>
        )}
      </Grid>
      <div style={{ flex: 1 }}>
        <DropzoneArea {...getRootProps()}>
          <input {...getInputProps()} />
          {files.length === 0 && (
            <>
              <UploadFileIcon style={{ fontSize: '10em', color: '#8c8c8c' }} />
              <Typography style={{ fontSize: '16px' }}>{'將檔案拖曳至此處上傳'}</Typography>
              <Typography style={{ fontSize: '16px', color: '#8c8c8c' }}>{'或是點擊下方按鈕選擇檔案'}</Typography>
            </>
          )}
        </DropzoneArea>

        <aside>
          {files.length >= 1 && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>編號</TableCell>
                  <TableCell>項目</TableCell>
                  <TableCell>檔名</TableCell>
                  <TableCell>檔案大小</TableCell>
                  <TableCell>上傳進度</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentFiles.map((file) => (
                  <TableRow key={file.name}>
                    <TableCell>{extractCategoryNum(file.path)}</TableCell>
                    <TableCell> {extractCategoryPath(file.path)}</TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell>{file.size / 1000} MB</TableCell>
                    <TableCell>
                      {file.size > 6 * 1024 ? <Typography style={{ color: 'red' }}>檔案過大</Typography> : <Typography></Typography>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </aside>
      </div>
      <aside style={{ marginBottom: '5px', right: '10px', marginTop: '15px' }}>
        {acceptedFiles.length >= 1 && (
          <Grid container alignItems="center" justifyContent="flex-end">
            <Typography style={{ fontSize: '16px', marginBottom: '-10px', marginRight: '10px' }}>每頁行數：</Typography>
            <Select value={pageSize} onChange={handlePageSizeChange} style={{ marginRight: '30px', marginBottom: '-8px' }}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
            <Typography variant="h6" style={{ alignSelf: 'flex-end', marginRight: '10px' }}>{`Page ${
              currentPage + 1
            }/${totalPages}`}</Typography>
            <Button
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 0}
              style={{
                marginBottom: '-10px',
                color: currentPage === 0 ? '#e0e0e0' : '#00B4BC'
              }}
            >
              <KeyboardArrowLeftIcon />
            </Button>
            <Button
              onClick={() => handlePageChange('next')}
              disabled={currentPage === totalPages - 1}
              style={{
                marginBottom: '-10px',
                color: currentPage === totalPages - 1 ? '#e0e0e0' : '#00B4BC'
              }}
            >
              <KeyboardArrowRightIcon />
            </Button>
          </Grid>
        )}
      </aside>
    </MainCard>
  );
}
