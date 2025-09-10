# API Documentation: IVR Integration Layer

This document provides the complete technical reference for the IVR Integration Layer API. The API exposes a single endpoint to act as a bridge between a legacy VXML IVR system and modern backend AI services.

---

## Key Components

### Bot Application Platform (BAP)

The BAP is the **automated brain** 🤖 of the system. It acts as an intelligent, automated assistant responsible for understanding user requests, processing information, and providing answers for all self-service tasks without needing a human.

### Azure Communication Services (ACS)

ACS is the **modern telephone operator** 📞. Its primary job is to manage the live phone call itself and handle actions that require leaving the automated system, especially transferring the call to a live agent.

---

## 1. API Endpoint: Handle IVR Input

This is the sole endpoint for the service. It is designed to receive all user inputs captured by the legacy IVR and orchestrate the appropriate backend workflow.

- **URL**: `/api/ivr/handle-input`
- **Method**: `POST`
- **Description**: Processes a user's DTMF (keypad) input by routing the request to the correct backend service (BAP for self-service or ACS for live call actions).

---

## 2. Request Specification

The API expects a JSON payload with the following structure.

| Field              |  Type  | Required | Description                                                                |
| ------------------ | :----: | :------: | -------------------------------------------------------------------------- |
| `sessionId`        | String |   Yes    | A unique identifier for the user's entire phone call session.              |
| `inputType`        | String |   Yes    | The method of input. For this project, it must always be `"DTMF"`.         |
| `inputValue`       | String |   Yes    | The number the user pressed on their keypad (e.g., `"1"`, `"10"`).         |
| `callConnectionId` | String |    No    | The unique ID of the live ACS call. **Required only for agent transfers.** |

### **Example Request**

```json
{
    "sessionId": "session-xyz-12345",
    "inputType": "DTMF",
    "inputValue": "1",
    "callConnectionId": "a1b2c3d4-..."
}
3. Response Specification
The API provides standardized JSON responses for both success and failure scenarios.

Success Response
Upon successfully processing the request, the API returns a 200 OK status code. The response body contains the text that the legacy IVR system should play back to the user.

Status Code: 200 OK

Content-Type: application/json

Example Success Body
JSON

{
    "sessionId": "12345",
    "responseText": "Your account balance is $500"
}
Error Response
If a server-side failure occurs, the API returns a 500 Internal Server Error status code with a safe, user-friendly message.

Status Code: 500 Internal Server Error

Example Error Body
JSON

{
    "sessionId": "session-xyz-12345",
    "responseText": "Sorry, an error occurred. Please try again later."
}
4. Supported inputValue Options
The inputValue field determines which workflow is triggered.

| inputValue | Service | Description                                                        |
|:----------:|:-------:|--------------------------------------------------------------------|
|     "1"    |  BAP    | Checks the user's bank account balance.                            |
|     "2"    |  ACS    | Transfers the user to a live human agent.                          |
|     "3"    |  BAP    | Retrieves the last five transactions (mini statement).             |
|     "4"    |  ACS    | Reports a lost or stolen card and initiates a security workflow.   |
|     "5"    |  ACS    | Begins the process for activating a new debit/credit card.         |
|     "6"    |  BAP    | Starts the utility bill payment process.                           |
|     "7"    |  ACS    | Initiates a workflow to update the user's contact details.         |
|     "8"    |  BAP    | Retrieves details about the user's loan and next EMI payment.      |
|     "9"    |  ACS    | Reports a suspicious transaction for a fraud review.               |
|    "10"    |  BAP    | Requests an e-statement to be sent to the  user's registered email.

5. Usage Examples
Here are screenshots demonstrating how to test various scenarios using Postman.

Scenario 1: Balance Inquiry (inputValue: "1")


Scenario 2: Agent Transfer (inputValue: "2")


Scenario 3: Error Handling Test


```
