package com.ayush.crm.BizNest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Keep your existing CORS annotation
@RestController
@RequestMapping("/leads")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping
    public ResponseEntity<Leads> createLead(@RequestBody Leads lead) {
        Leads savedLead = leadService.saveLead(lead);
        return ResponseEntity.ok(savedLead); // Added proper ResponseEntity return
    }

    @GetMapping
    public List<Leads> getAllLeads() {
        return leadService.getAllLeads(); // Kept original return type
    }

    @GetMapping("/{id}")
    public Leads getLead(@PathVariable Long id) {
        return leadService.getLeadById(id); // Kept original return type
    }

    @PutMapping("/{id}")
    public Leads updateLead(@PathVariable Long id, @RequestBody Leads lead) {
        return leadService.updateLead(id, lead); // Kept original return type
    }

    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id); // Kept original return type
    }
}