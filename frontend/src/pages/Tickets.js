import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  CircularProgress,
  Tooltip
} from '@mui/material';
import { MoreVert, Assignment, CheckCircle, PersonAdd, Add } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { getTickets, assignTicket, resolveTicket, raiseTicket } from '../services/api';
import AssignTicketDialog from '../components/AssignTicketDialog';
import TicketForm from '../components/TicketForm';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [ticketFormOpen, setTicketFormOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event, ticket) => {
    setAnchorEl(event.currentTarget);
    setSelectedTicket(ticket);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTicket(null);
  };

  const handleAssign = async (ticketId, departmentId) => {
    try {
      const updatedTicket = await assignTicket(ticketId, departmentId);
      setTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t));
    } catch (error) {
      console.error('Error assigning ticket:', error);
    }
  };

  const handleResolve = async (ticketId) => {
    try {
      const updatedTicket = await resolveTicket(ticketId);
      setTickets(tickets.map(t => t.id === ticketId ? updatedTicket : t));
      handleMenuClose();
    } catch (error) {
      console.error('Error resolving ticket:', error);
    }
  };

  const handleCreateTicket = async (ticketData) => {
    try {
      const newTicket = await raiseTicket(ticketData);
      setTickets([newTicket, ...tickets]);
      setTicketFormOpen(false);
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return <Assignment color="warning" />;
      case 'resolved': return <CheckCircle color="success" />;
      case 'assigned': return <PersonAdd color="info" />;
      default: return <Assignment />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'warning';
      case 'resolved': return 'success';
      case 'assigned': return 'info';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Tickets Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setTicketFormOpen(true)}
        >
          Create Ticket
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} hover>
                <TableCell>#{ticket.id}</TableCell>
                <TableCell>
                  <Tooltip title={ticket.description}>
                    <span>{ticket.subject}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={getStatusIcon(ticket.status)}
                    label={ticket.status}
                    color={getStatusColor(ticket.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  {ticket.assignedTo || 'Unassigned'}
                </TableCell>
                <TableCell>
                  {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'Invalid Date'}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={(e) => handleMenuOpen(e, ticket)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          setAssignDialogOpen(true);
          handleMenuClose();
        }}>
          Assign Ticket
        </MenuItem>
        <MenuItem
          onClick={() => handleResolve(selectedTicket?.id)}
          disabled={selectedTicket?.status === 'Resolved'}
        >
          Mark as Resolved
        </MenuItem>
      </Menu>

      <AssignTicketDialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
        ticket={selectedTicket}
        onAssign={handleAssign}
      />

      <TicketForm
        open={ticketFormOpen}
        onClose={() => setTicketFormOpen(false)}
        onSave={handleCreateTicket}
      />
    </Box>
  );
};

export default Tickets;