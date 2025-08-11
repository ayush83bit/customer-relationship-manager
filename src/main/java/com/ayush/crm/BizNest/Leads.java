package com.ayush.crm.BizNest;

import jakarta.persistence.*;

@Entity
public class Leads {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String phone;
    private String source;  // website, referral, etc.
    private String status;  // new, contacted, converted
    private String company; // Added missing field

    // No-arg constructor (required by JPA)
    public Leads() {}

    // Updated all-args constructor
    public Leads(Long id, String name, String email, String phone,
                 String source, String status, String company) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.source = source;
        this.status = status;
        this.company = company; // Added
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    // Added getter and setter for company
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    // Updated Builder class
    public static class Builder {
        private Long id;
        private String name;
        private String email;
        private String phone;
        private String source;
        private String status;
        private String company; // Added

        public Builder() {}

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder source(String source) {
            this.source = source;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        // Added company builder method
        public Builder company(String company) {
            this.company = company;
            return this;
        }

        public Leads build() {
            return new Leads(id, name, email, phone, source, status, company);
        }
    }

    // Static method to start the builder
    public static Builder builder() {
        return new Builder();
    }
}