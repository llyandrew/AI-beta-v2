import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
//import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

function createData(trackingNo, name, fat, carbs) {
  return { trackingNo, name, fat, carbs };
}

// const rowsA = [
//   createData(1, '工作人員權益相關制度訂定及執行情形', 0, 0),
//   createData(2, '出入機構之管理', 100, 1),
//   createData(3, '業務計畫及營運方針之擬定與執行情形', 0, 0),
//   createData(4, '過去查核缺失及前次評鑑建議事項改善情形', 0, 0),
//   createData(5, '機構內性侵害及性騷擾事件防治機制建置情形', 100, 1),
//   createData(6, '危機或緊急事件風險管理情形', 100, 1),
//   createData(7, '業務負責人實', 25, 2),
//   createData(8, '聘用工作人員設置情形', 89, 2),
//   createData(9, '工作人員教育訓練計畫訂定及辦理情形', 50, 2),
//   createData(10, '新進工作人員職前訓練', 100, 1)
// ];

const rowsB = [
  createData(1, '定期召開服務品質會議及其辦理情形', 0, 0),
  createData(2, '個案服務計畫與評值及管理情形', 100, 1),
  createData(3, '服務對象適應輔導或支持措施', 0, 0),
  createData(4, '跨專業整合照護執行情形', 0, 0),
  createData(5, '服務對象團體或社區活動辦理情形', 100, 1),
  createData(6, '社區資源聯結及運用情形', 100, 1),
  createData(7, '與家屬互動及提供服務情形', 25, 2),
  createData(8, '提供服務對象例行及必要之醫療服務情形', 89, 2),
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
    label: '項目編號'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: '項目細項'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'AI通過率%'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: '完成狀態'
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
      title = 'empty file';
      break;
    case 1:
      color = 'success';
      title = 'success';
      break;
    case 2:
      color = 'warning';
      title = 'Rejected';
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

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

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
            {stableSort(rowsB, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo); 
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
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
                  {/* <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
