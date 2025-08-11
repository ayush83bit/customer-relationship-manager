package com.ayush.crm.BizNest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {

    @Autowired
    private LeadRepository leadRepository;

    @Override
    public Leads saveLead(Leads lead) {
        return leadRepository.save(lead);
    }

    @Override
    public List<Leads> getAllLeads() {
        return leadRepository.findAll();
    }

    @Override
    public Leads getLeadById(Long id) {
        return leadRepository.findById(id).orElse(null);
    }

    @Override
    public Leads updateLead(Long id, Leads lead) {
        Leads existingLead = leadRepository.findById(id).orElse(null);
        if (existingLead != null) {
            // Update ALL fields including company
            existingLead.setName(lead.getName());
            existingLead.setEmail(lead.getEmail());
            existingLead.setPhone(lead.getPhone());
            existingLead.setSource(lead.getSource());
            existingLead.setStatus(lead.getStatus());
            existingLead.setCompany(lead.getCompany());  // CRITICAL: Add this line
            return leadRepository.save(existingLead);
        }
        return null;
    }

    @Override
    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
}