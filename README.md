# customer-relationship-manager
Full-Stack Customer Relationship Manager with Spring Boot backend, MySQL database, and React frontend. Features include secure login &amp; registration APIs, lead and ticket creation/management, and an interactive dashboard for tracking business activities.

---

## Features

- Secure authentication with JWT (login & registration)  
- Lead management: create, view, update, delete leads  
- Ticket management: create, assign, track tickets  
- Interactive dashboard with key business metrics  
- Role-based access control (admin, user)  
- Responsive UI for both desktop and mobile  
- RESTful APIs powered by Spring Boot  

---

## Tech Stack

- **Frontend:** React  
- **Backend:** Spring Boot  
- **Database:** MySQL  
- **Authentication:** JWT  
- **UI Library:** (e.g., Material-UI or your choice)  

---

## Setup Instructions

### Backend Setup
1. Navigate to the backend folder  
2. Configure `application.properties` with your MySQL credentials  
3. Run the backend with `mvn spring-boot:run` or your preferred build tool  

### Frontend Setup
1. Navigate to the frontend folder  
2. Run `npm install` to install dependencies  
3. Run `npm start` to launch the frontend  

---

## API Endpoints Overview

| Endpoint           | Method | Description             |
|--------------------|--------|-------------------------|
| `/api/auth/login`  | POST   | User login              |
| `/api/auth/register` | POST   | User registration       |
| `/api/leads`       | GET, POST, PUT, DELETE | Lead management        |
| `/api/tickets`     | GET, POST, PUT, DELETE | Ticket management      |
| `/api/dashboard`   | GET    | Fetch dashboard data    |

---

## License

MIT License 
