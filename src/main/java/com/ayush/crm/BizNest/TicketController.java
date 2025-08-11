// Assuming we are keeping your existing structure and fixing only where needed
// This includes a TicketController class to expose the POST API properly

package com.ayush.crm.BizNest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/raise")
    public Ticket raiseTicket(@RequestBody RaiseTicketRequest request) {
        return ticketService.raiseTicket(
                request.getLeadId(),
                request.getSubject(),
                request.getDescription()
        );
    }


    @PostMapping("/assign")
    public Ticket assignTicket(@RequestBody AssignTicketRequest request) {
        return ticketService.assignTicket(
                request.getTicketId(),
                request.getDepartmentId()
        );
    }

    @PostMapping("/resolve")
    public Ticket resolveTicket(@RequestBody ResolveTicketRequest request) {
        return ticketService.resolveTicket(request.getTicketId());
    }

    @GetMapping("/all")
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    // DTOs
    public static class RaiseTicketRequest {
        private Long leadId;
        private String subject;
        private String description;

        public Long getLeadId() { return leadId; }
        public void setLeadId(Long leadId) { this.leadId = leadId; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }

    public static class AssignTicketRequest {
        private Long ticketId;
        private Long departmentId;

        public Long getTicketId() { return ticketId; }
        public void setTicketId(Long ticketId) { this.ticketId = ticketId; }
        public Long getDepartmentId() { return departmentId; }
        public void setDepartmentId(Long departmentId) { this.departmentId = departmentId; }
    }

    public static class ResolveTicketRequest {
        private Long ticketId;

        public Long getTicketId() { return ticketId; }
        public void setTicketId(Long ticketId) { this.ticketId = ticketId; }
    }
}
