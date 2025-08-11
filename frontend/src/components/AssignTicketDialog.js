import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';
import api from '../services/api';

const AssignTicketDialog = ({ open, onClose, ticket, onAssign }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api/departments');
        setDepartments(response.data);
        setSelectedDepartment(ticket?.departmentId || response.data[0]?.id || '');
      } catch (error) {
        console.error('Error loading departments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open) fetchData();
  }, [open, ticket]);

  // ... rest of your component code ...

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Assign Ticket #{ticket?.id}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Department</InputLabel>
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept.id} value={dept.id}>
                  {dept.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </FormControl>
      </DialogContent>
      {/* Dialog actions... */}
    </Dialog>
  );
};

// Add this at the bottom of the file (if not present)
export default AssignTicketDialog;