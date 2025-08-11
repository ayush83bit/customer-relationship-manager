package com.ayush.crm.BizNest;

import java.util.List;

public interface LeadService {
    Leads saveLead(Leads lead);
    List<Leads> getAllLeads();
    Leads getLeadById(Long id);
    Leads updateLead(Long id, Leads lead);
    void deleteLead(Long id);
}