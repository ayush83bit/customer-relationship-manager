package com.ayush.crm.BizNest;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LeadRepository extends JpaRepository<Leads, Long> {
}
