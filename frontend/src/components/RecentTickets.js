// src/components/RecentTickets.js
import React from 'react';
import { Paper, List, ListItem, ListItemText, Typography, Divider, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import { SupportAgent, CheckCircle, Assignment } from '@mui/icons-material';

const RecentTickets = ({ tickets = [] }) => {
  // Show only the 3 most recent tickets
  const recentTickets = tickets.slice(0, 3);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return <Assignment color="warning" />;
      case 'resolved': return <CheckCircle color="success" />;
      default: return <SupportAgent color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recent Tickets
      </Typography>
      <List>
        {recentTickets.map((ticket) => (
          <React.Fragment key={ticket.id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={
                  <Link to={`/tickets/${ticket.id}`} style={{ textDecoration: 'none' }}>
                    {ticket.subject}
                  </Link>
                }
                secondary={
                  <>
                    <Chip
                      size="small"
                      icon={getStatusIcon(ticket.status)}
                      label={ticket.status}
                      sx={{ mr: 1 }}
                    />
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
        {recentTickets.length === 0 && (
          <ListItem>
            <ListItemText primary="No recent tickets" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default RecentTickets;