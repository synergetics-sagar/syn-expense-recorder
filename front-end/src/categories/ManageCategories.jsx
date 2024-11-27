import React from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';

const ManageCategories = () => {
  return (
    <Box
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        maxWidth: 800, // Restrict width on larger screens
        margin: '0 auto', // Center horizontally
      }}
    >
      {/* Title */}
      <Typography variant="h4" component="h1">
        Manage Categories
      </Typography>

      {/* Add Category Form */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', sm: 'nowrap' }, // Adjust layout for mobile
          gap: 2,
        }}
      >
        <TextField
          label="Category Title"
          variant="outlined"
          required
          sx={{
            flex: 1, // Expand text field to fill space
            minWidth: '200px',
          }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            minWidth: 48,
            height: 48,
            borderRadius: '50%', // Make circular
          }}
        >
          <Add /> {/* Add icon */}
        </Button>
      </Box>

      {/* Categories Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sample Row */}
            <TableRow>
              <TableCell>Sample Category</TableCell>
              <TableCell>
                <IconButton color="primary" aria-label="edit">
                  <Edit />
                </IconButton>
                <IconButton color="secondary" aria-label="delete">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageCategories;
