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
```bash
git clone https://github.com/ananthakrishn04/sms-management-system.git
cd sms-management-system
```

2. Create a virtual env<br>
```bash
pip install virtualenv
virtualenv env
```

3. Activate the virtual environment<br>

In Windows
```bash
cd <envname>
Scripts\activate
```

In Linux
```bash
source <envname>/bin/activate
```


4. Install the required dependencies<br>
```bash
pip install -r requirements.txt
```

5. Fill config.py with your mysql config and your Mongo_db cloud connection string<br>

```python
# config.py
MONGO_URI="your_mongo_db_connection_string"

#example config - may not work in your case
MYSQL_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'password',
}
JWT_SECRET_KEY = 'your_jwt_secret_key'
TELEGRAM_BOT_TOKEN = 'your_telegram_bot_token'
TELEGRAM_CHAT_ID = 'your_chat_id'
```

6. run the backend server
```bash
cd backend
python3 app.py
```
<br>

7. run the frontend server
```bash
cd frontend
npm start
```
<br>

8. Open your browser and go to http://localhost:3000/
<br>

## Technologies used
- React<br>
- Flask<br>
- MySQL<br>
- MongoDB<br>

