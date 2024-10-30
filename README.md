# SMS Management System

### A web-based dashboard that dynamically manages and monitors the SMS system running on a Linux server. The system consists of multiple Python programs (5-6 programs) that trigger SMS messages to multiple countries - telecom operators pairs using phone numbers. Once an SMS is triggered, the programs communicate with an SMS Gateway API to verify message delivery and submit the status back if the message is received.

## Main features :
● Control over program execution (start/stop/restart sessions)<br>
● Monitoring SMS performance metrics in real-time<br>
● Adding, updating, and prioritizing country-operator pairs<br>
● Automatic alerts for critical failures or low success rates<br>

## Architecture Diagram
![sms_management_app_arch_diagram](https://github.com/user-attachments/assets/bf694a5b-2a53-4d91-843f-98fcee26f79d)


## How to run the application
1. Clone the repository<br>
2. Install the required dependencies<br>
3. Fill config.py with your mysql config and your Mongo_db cloud connection string<br>

4. run the backend server
```bash
cd backend
python3 app.py
```
<br>

5. run the frontend server
```bash
cd frontend
npm start
```
<br>

6. Open your browser and go to http://localhost:3000/
<br>

## Technologies used
- React<br>
- Flask<br>
- MySQL<br>
- MongoDB<br>

