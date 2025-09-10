<p align="center">
  <img src="https://storage.googleapis.com/gemini-prod-us-west1-assets/images/688849b3922d365f17127e2a48a0f968" alt="Project Banner">
</p>

<h1 align="center">IVR Modernization Middleware - Milestone 2</h1>

<p align="center">
  <strong>Team:</strong> Conversational AI Integrators<br>
  <strong>Member:</strong> Aravind (Project Lead / Full-Stack Developer)<br>
  <strong>Date:</strong> September 10, 2025
</p>

---

## Introduction

The goal of this project is to modernize a legacy VXML-based IVR (Interactive Voice Response) system by integrating it with modern conversational AI platforms like Azure Communication Services (ACS) and a Bot Application Platform (BAP).

This document covers **Milestone 2**, which focuses on the development and successful implementation of a Node.js middleware. This middleware serves as the central integration layer, capable of routing requests to mocked ACS and BAP services and handling their responses.

---

## System Architecture

The architecture is designed around the middleware, which acts as a central hub, decoupling the legacy IVR from the modern backend services.

![System Architecture Diagram](./docs/architecture.png)

The flow is as follows: The **Legacy IVR** captures a user's keypress and sends it to the **Middleware**. The Middleware's controller analyzes the input and routes the request to the appropriate mock service (**ACS** for transfers or **BAP** for self-service). The mock service returns a predefined response, which the middleware formats and sends back to the IVR to be played to the user.

---

## Setup and Installation

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- A REST client like [Thunder Client](https://www.thunderclient.com/) (for VS Code) or Postman.

### **Commands**

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run the Server:**
    ```bash
    npm start
    ```
    This will start the server using `nodemon` for automatic reloading on file changes, which is configured in the `package.json` file.

---

## Folder Structure

The project is organized into a modular structure to ensure a clear separation of concerns.

- **`server.js`**: The main entry point that starts the Express server.
- **`/src/api/routes`**: Defines the API endpoints and maps them to controller functions.
- **`/src/api/controllers`**: Contains the core business logic for handling requests and orchestrating responses.
- **`/src/api/services`**: Contains the mocked logic for ACS and BAP services, simulating their behavior.
- **`/docs`**: Stores project documentation and diagrams, including `architecture.png`.

---

## API Endpoints

The middleware uses a single endpoint to receive IVR requests and internal mock endpoints.

### **Main Endpoint**

- `POST /api/ivr/handle-input`: This is the primary endpoint that receives the user's digit from the legacy IVR. It forwards the request internally to either the mock ACS or BAP service based on the input.

### **Mock Endpoints**

- `POST /api/mock-bap-bot`: This is a dummy bot endpoint that simulates the BAP's response for self-service queries.

### **Sample Request/Response**

**Request (from IVR to Middleware)**

```json
{
    "sessionId": "session-xyz-12345",
    "inputType": "DTMF",
    "inputValue": "1"
}
Response (from Middleware to IVR)

JSON

{
    "sessionId": "session-xyz-12345",
    "responseText": "Your account balance is $500."
}
Testing
The endpoints were successfully tested using Thunder Client to simulate the IVR.

Success Case: Valid Input (inputValue: "1")
Provide screenshot link here if needed, e.g., ![Success Case](./docs/success-test.png)

Error Case: Server-Side Failure
Provide screenshot link here if needed, e.g., ![Error Case](./docs/error-test.png)

Task Division
As the sole developer on this milestone, I was responsible for the end-to-end development of all modules:

Server & Routing: Setup of the Express server and API routes.

Controller Logic: Implementation of the core request handling and routing logic.

Service Mocking: Creation of the simulated BAP and ACS services.

Documentation: Authored the README.md and api.md files.

Challenges & Learnings
Challenges
Structuring the Express application in a scalable, modular way.

Effectively simulating asynchronous service calls using async/await to mimic real-world API interactions with Axios.

Learnings
The Power of Middleware: Gained a deep understanding of how middleware can act as a powerful bridge between legacy and modern systems, enabling phased modernization without a complete overhaul.

Modular Architecture: Learned the importance of separating concerns (routes, controllers, services) to create code that is clean, maintainable, and easy to test.

Conclusion
Milestone 2 is complete. The Node.js middleware is fully functional and successfully orchestrates workflows using mocked BAP and ACS services. It correctly handles various user inputs and includes robust error handling.

The next step in the project is to transition from the mocked services to integrating with the live ACS and BAP platforms, which will involve handling real API credentials, SDKs, and live call data.
```
