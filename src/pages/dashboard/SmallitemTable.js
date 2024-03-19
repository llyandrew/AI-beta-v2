import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

// third-party
//import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(trackingNo, name, fat, carbs) {
  return { trackingNo, name, fat, carbs };
}

const rowsA = [
  createData(1, '工作人員權益相關制度訂定及執行情形', 0, 0),
  createData(2, '出入機構之管理', 100, 1),
  createData(3, '業務計畫及營運方針之擬定與執行情形', 0, 0),
  createData(4, '過去查核缺失及前次評鑑建議事項改善情形', 0, 0),
  createData(5, '機構內性侵害及性騷擾事件防治機制建置情形', 100, 1),
  createData(6, '危機或緊急事件風險管理情形', 100, 1),
  createData(7, '業務負責人實', 25, 2),
  createData(8, '聘用工作人員設置情形', 89, 2),
  createData(9, '工作人員教育訓練計畫訂定及辦理情形', 50, 2),
  createData(10, '新進工作人員職前訓練', 100, 1)
];

const rowsB = [
  createData(1, '定期召開服務品質會議及其辦理情形', 0, 0),
  createData(2, '個案服務計畫與評值及管理情形', 100, 1),
  createData(3, '服務對象適應輔導或支持措施', 0, 0),
  createData(4, '跨專業整合照護執行情形', 0, 0),
  createData(5, '服務對象團體或社區活動辦理情形', 100, 1),
  createData(6, '社區資源聯結及運用情形', 100, 1),
  createData(7, '與家屬互動及提供服務情形', 25, 2),
  createData(8, '提供服務對象例行及必要之醫療服務情形', 89, 2)
];

const rowsC = [
  createData(1, '休憩設備設置', 0, 0),
  createData(2, '日常活動場所使用', 100, 1),
  createData(3, '廚房及用餐環境清潔衛生', 0, 0),
  createData(4, '緊急呼叫系統運作', 0, 0),
  createData(5, '餐飲衛生', 100, 1),
  createData(6, '消防安全管理', 100, 1),
  createData(7, '建築物公共安全檢查簽證申報', 25, 2),
  createData(8, '疏散避難逃生系統設置', 89, 2),
  createData(9, '訂定符合長照機構特性及需求之緊急災害應變計畫及作業程序', 50, 2),
  createData(10, '機構環境清潔及病媒防治措施', 100, 1),
  createData(11, '器材維護與管理', 89, 2),
  createData(12, '具有急救物品', 89, 2),
  createData(13, '機構飲用供水設備安全及清潔', 89, 2)
];

const rowsD = [
  createData(1, '長照機構辦理安全保險事項', 0, 0),
  createData(2, '與服務對象或家屬訂定服務契約', 100, 1),
  createData(3, '收費標準與開立收據', 0, 0),
  createData(4, '意見反應、申訴機制的訂定與處理', 0, 0),
  createData(5, '服務滿意度調查', 100, 1)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: '編號'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: '項目'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'AI符合率%'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: '符合狀態'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'error';
      title = '未上傳檔案';
      break;
    case 1:
      color = 'success';
      title = '符合';
      break;
    case 2:
      color = 'warning';
      title = '不符合';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const OrderTable = ({ table }) => {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selectedRow, setSelectedRow] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (trackingNo) => {
    setExpandedRow((prevExpandedRow) => (prevExpandedRow === trackingNo ? null : trackingNo));
    if (selectedRow === trackingNo) {
      setSelectedRow(null);
    } else {
      setSelectedRow(trackingNo);
    }
  };

  const isSelected = (trackingNo) => selectedRow === trackingNo;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(
              table === 'rowsA' ? rowsA : table === 'rowsB' ? rowsB : table === 'rowsC' ? rowsC : rowsD,
              getComparator(order, orderBy)
            ).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <React.Fragment key={row.trackingNo}>
                  <TableRow
                    hover
                    onClick={() => handleRowClick(row.trackingNo)}
                    role="checkbox"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.trackingNo}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" align="left">
                      <Link color="secondary" component={RouterLink} to="">
                        {row.trackingNo}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="left">
                      <OrderStatus status={row.carbs} />
                    </TableCell>
                    <TableCell display="flex" justifyContent="flex-end" marginRight={1}>
                      {expandedRow === row.trackingNo ? (
                        <ExpandLessOutlinedIcon color="disabled" />
                      ) : (
                        <ExpandMoreOutlinedIcon color="disabled" />
                      )}
                    </TableCell>
                    {/* <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                  </TableRow>
                  {isItemSelected && (
                    <TableRow>
                      <TableCell colSpan={4} align="left">
                        <Box margin={1} marginLeft="14.6%">
                          {' '}
                          <Typography variant="h6" gutterBottom component="div" color="textSecondary">
                            缺少所需評鑑關鍵字:
                          </Typography>
                          <Typography variant="body2" component="div" color="textSecondary">
                            服務理念、照館專員、復健服務
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

OrderTable.propTypes = {
  table: PropTypes.array.isRequired
};

export default OrderTable;
