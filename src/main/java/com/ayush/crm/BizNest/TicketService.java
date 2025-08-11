package com.ayush.crm.BizNest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    public Ticket raiseTicket(Long leadId, String subject, String description) {
        Leads lead = leadRepository.findById(leadId).orElse(null);
        if (lead == null) return null;

        Ticket ticket = new Ticket();
        ticket.setSubject(subject);
        ticket.setDescription(description);
        ticket.setLead(lead);

        ticket.setStatus("Open");
        return ticketRepository.save(ticket);
    }

    public Ticket assignTicket(Long ticketId, Long departmentId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        Department dept = departmentRepository.findById(departmentId).orElse(null);
        if (ticket == null || dept == null) return null;

        ticket.setAssignedDepartment(dept);
        ticket.setStatus("Assigned");
        return ticketRepository.save(ticket);
    }

    public Ticket resolveTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket == null) return null;

        ticket.setStatus("Resolved");
        return ticketRepository.save(ticket);
    }

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }
}
