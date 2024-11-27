import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Edit, Delete, Add, FilterList } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const ManageExpenses = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [expenses, setExpenses] = useState([
    { description: 'Lunch', amount: 20, date: '2024-01-01', category: 'Food' },
    { description: 'Uber Ride', amount: 15, date: '2024-01-02', category: 'Transport' }
  ]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [openFilterPopup, setOpenFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    fromDate: '',
    toDate: '',
    categories: []
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSort = (column) => {
    const sortedExpenses = [...expenses].sort((a, b) => {
      if (column === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (column === 'amount') {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });
    setExpenses(sortedExpenses);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDateChange = (value, setter) => {
    setter(value ? value.format('YYYY-MM-DD') : null); // Store date in yyyy-mm-dd format
  };

  const handleOpenFilterPopup = () => setOpenFilterPopup(true);
  const handleCloseFilterPopup = () => setOpenFilterPopup(false);

  const handleApplyFilters = () => {
    setFilters({
      fromDate,
      toDate,
      categories: selectedCategories
    });
    handleCloseFilterPopup();
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Title */}
      <Typography variant="h4" component="h1">
        Manage Expenses
      </Typography>

      {/* Filters Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FilterList />}
          onClick={handleOpenFilterPopup}
        >
          Filters
        </Button>
      </Box>

      {/* Filter Popup */}
      <Dialog
        open={openFilterPopup}
        onClose={handleCloseFilterPopup}
        TransitionComponent={Slide}
        direction="up"
      >
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* From Date Picker */}
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newDate) => handleDateChange(newDate, setFromDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
            {/* To Date Picker */}
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newDate) => handleDateChange(newDate, setToDate)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <FormControl sx={{ minWidth: '100%', marginTop: 2 }}>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={selectedCategories}
              onChange={(e) => setSelectedCategories(e.target.value)}
              label="Categories"
              renderValue={(selected) => selected.join(', ')}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Transport">Transport</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilterPopup} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApplyFilters} color="primary">
            Apply Filters
          </Button>
        </DialogActions>
      </Dialog>

      {/* Expenses Table */}
      <Box sx={{ overflowX: 'auto', marginTop: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => handleSort('description')}>
                  <strong>Description</strong>
                </TableCell>
                <TableCell onClick={() => handleSort('amount')}>
                  <strong>Amount</strong>
                </TableCell>
                <TableCell onClick={() => handleSort('date')}>
                  <strong>Date</strong>
                </TableCell>
                {/* Actions column is only fixed in mobile */}
                <TableCell
                  sx={{
                    position: isMobile ? 'sticky' : 'initial',
                    right: 0,
                    backgroundColor: 'white',
                    zIndex: 1,
                  }}
                >
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                  <TableCell
                    sx={{
                      position: isMobile ? 'sticky' : 'initial',
                      right: 0,
                      backgroundColor: 'white',
                      zIndex: 1,
                    }}
                  >
                    <IconButton color="primary" aria-label="edit">
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Floating Action Button */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: '50%',
            minWidth: 56,
            height: 56,
          }}
        >
          <Add />
        </Button>
      </Box>
    </Box>
  );
};

export default ManageExpenses;
