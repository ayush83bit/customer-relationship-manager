package com.ayush.crm.BizNest;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final LeadRepository leadRepository;  // ✅ Fixed name
    private final DepartmentRepository departmentRepository;

    public DataLoader(LeadRepository leadRepository,  // ✅ Fixed constructor parameter
                      DepartmentRepository departmentRepository) {
        this.leadRepository = leadRepository;  // ✅ Fixed assignment
        this.departmentRepository = departmentRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // --- Seed Leads ---
        if (leadRepository.count() == 0) {  // ✅ Fixed reference
            List<Leads> leadsList = List.of(
                    Leads.builder()
                            .name("John Doe")
                            .email("john@example.com")
                            .phone("9999999999")
                            .source("Referral")
                            .status("New")
                            .build(),
                    Leads.builder()
                            .name("Priya Sharma")
                            .email("priya@gmail.com")
                            .phone("8888888888")
                            .source("LinkedIn")
                            .status("Contacted")
                            .build()
            );
            leadRepository.saveAll(leadsList);  // ✅ Fixed reference
            System.out.println("✔️ Sample leads inserted");
        }

        // --- Seed Departments ---
        if (departmentRepository.count() == 0) {
            List<Department> depts = List.of(
                    new Department(null, "Sales"),
                    new Department(null, "Marketing"),
                    new Department(null, "Customer Support"),
                    new Department(null, "Technical Support"),
                    new Department(null, "Finance"),
                    new Department(null, "Human Resources"),
                    new Department(null, "IT & Infrastructure"),
                    new Department(null, "Product Management"),
                    new Department(null, "Operations")
            );
            departmentRepository.saveAll(depts);
            System.out.println("✔️ Departments seeded");
        }
    }
}
