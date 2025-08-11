import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Grid,
  CircularProgress // Added CircularProgress to replace LinearProgress
} from '@mui/material';
import { Add, MoreVert, Edit, Delete, Search } from '@mui/icons-material';
import { getLeads, createLead, updateLead, deleteLead } from '../services/api';
import LeadForm from '../components/LeadForm';
import { useAuth } from '../context/AuthContext';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getLeads();
        setLeads(data);
        setFilteredLeads(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leads:', error);
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = leads.filter(lead =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm)
    );
    setFilteredLeads(filtered);
  }, [searchTerm, leads]);

  const handleOpenForm = (lead = null) => {
    setCurrentLead(lead);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentLead(null);
  };

  const handleSaveLead = async (leadData) => {
    try {
      if (currentLead) {
        const updatedLead = await updateLead(currentLead.id, leadData);
        setLeads(leads.map(lead => lead.id === currentLead.id ? updatedLead : lead));
      } else {
        const newLead = await createLead(leadData);
        setLeads([...leads, newLead]);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      setLeads(leads.filter(lead => lead.id !== id));
      setAnchorEl(null);
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  const handleMenuOpen = (event, lead) => {
    setAnchorEl(event.currentTarget);
    setSelectedLead(lead);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLead(null);
  };

  const statusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'new': return 'info.main';
      case 'contacted': return 'warning.main';
      case 'converted': return 'success.main';
      default: return 'text.primary';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress /> {/* Fixed from LinearProgress to CircularProgress */}
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Typography variant="h4">Leads Management</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenForm()}
          >
            Add Lead
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Box sx={{
                    display: 'inline-block',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    backgroundColor: statusColor(lead.status) + '22',
                    color: statusColor(lead.status)
                  }}>
                    {lead.status}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, lead)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredLeads.length === 0 && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Typography variant="body1">No leads found</Typography>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          handleOpenForm(selectedLead);
          handleMenuClose();
        }}>
          <Edit sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedLead.id)}>
          <Delete sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <LeadForm
        open={openForm}
        onClose={handleCloseForm}
        onSave={handleSaveLead}
        lead={currentLead}
      />
    </Box>
  );
};

export default Leads;