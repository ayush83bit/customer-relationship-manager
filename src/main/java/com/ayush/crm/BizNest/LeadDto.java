package com.ayush.crm.BizNest;

public class LeadDto {
    private String name;
    private String email;
    private String phone;
    private String source;
    private String status;
    private String company;

    // Getters and Setters
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

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
}