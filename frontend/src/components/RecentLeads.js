// src/components/RecentLeads.js
import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RecentLeads = ({ leads = [] }) => {
  // Show only the 5 most recent leads
  const recentLeads = leads.slice(0, 5);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Recent Leads
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <Link to={`/leads/${lead.id}`} style={{ textDecoration: 'none' }}>
                    {lead.name}
                  </Link>
                </TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>
                  <Typography
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: (theme) => {
                        switch (lead.status?.toLowerCase()) {
                          case 'new': return theme.palette.info.light;
                          case 'contacted': return theme.palette.warning.light;
                          case 'converted': return theme.palette.success.light;
                          default: return theme.palette.grey[300];
                        }
                      },
                      color: (theme) => {
                        switch (lead.status?.toLowerCase()) {
                          case 'new': return theme.palette.info.dark;
                          case 'contacted': return theme.palette.warning.dark;
                          case 'converted': return theme.palette.success.dark;
                          default: return theme.palette.text.primary;
                        }
                      }
                    }}
                  >
                    {lead.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
            {recentLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No recent leads
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RecentLeads;