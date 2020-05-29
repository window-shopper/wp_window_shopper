import React from 'react';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Snacky from './Snacky';
import config from '../../config';
import { routes } from '../../consts';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import ViewButton from './ViewButton';

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const headCells = [
  {
    id: 'productBoxName', numeric: false, label: 'Name',
  },
  {
    id: 'template', numeric: false, label: 'Template',
  },
  {
    id: 'lastModified', numeric: true, label: 'Last Modified',
  },
  {
    id: 'category', numeric: true, label: 'Category',
  },
  {
    id: 'shortcode', numeric: true, label: 'Shortcode',
  },
  {
    id: '_', numeric: false, label: null,
  },
];

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable({ productBoxes, refetch }) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('productBoxName');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [snackyShortcode, setSnackyShortcode] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, productBoxes.length - page * rowsPerPage);

  return (
    <div
      style={{
        width: '100%', margin: 'auto',
      }}
      className={classes.root}
    >
      <Snacky handleClose={handleClose} open={open} shortcode={snackyShortcode} />
      <Paper elevation={0} className={classes.paper}>
        <TableContainer style={{
          paddingLeft: '2%', paddingRight: '2%', paddingTop: 20, paddingBottom: 10,
        }}
        >
          <Table
            className={classes.table}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={productBoxes.length}
            />
            <TableBody>
              {stableSort(productBoxes.map((p) => ({ ...p, lastModified: p.lastModified || p.createdAt })), getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((productBox, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const shortcode = `[${config.shortcode} id=${productBox.productBoxID}]`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, productBox.name)}
                      tabIndex={-1}
                      key={productBox.id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {productBox.productBoxName}
                      </TableCell>
                      <TableCell align="right">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                          {productBox.templateName}
                          {/* productBox.propagating
&& <CallSplitIcon style={{ marginLeft: 8, color: 'rgba(0, 0, 0, 0.4)' }} /> */}
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                      >
                        {config.formatDate(new Date(productBox.lastModified || productBox.createdAt))}
                      </TableCell>
                      <TableCell align="right">{productBox.category || '-'}</TableCell>
                      <TableCell
                        align="right"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          copyToClipboard(shortcode);
                          setSnackyShortcode(shortcode);
                          setOpen(true);
                        }}
                      >
                        { shortcode }
                      </TableCell>
                      <TableCell style={{ paddingLeft: 60, width: 165 }} align="right">
                        <div style={{ display: 'flex', justifyContent: 'center', width: 70 }}>
                          <div style={{ margin: '0px 7px' }}>
                            <EditButton
                              hideLabel
                              template={productBox}
                              index={index}
                              page={routes.create_new_product_box}
                            />
                          </div>
                          <div style={{ margin: '0px 7px' }}>
                            <DeleteButton
                              hideLabel
                              type="productBox"
                              refetch={refetch}
                              id={productBox.productBoxID}
                            />
                          </div>
                          <div style={{ margin: '0px 7px' }}>
                            <ViewButton template={productBox} />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={productBoxes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
