🌱 Secure Smart Agriculture System (Agri-V5)

🔗 Live Application:
👉 https://agrovision-two.vercel.app/

A full-stack IoT-based Smart Agriculture Monitoring System designed to provide real-time environmental data, role-based access control, and secure multi-user authentication.

The platform integrates ESP32 IoT devices, a Node.js backend, and a responsive React web dashboard to help farmers monitor and manage agricultural environments efficiently.

📌 Overview

The Secure Smart Agriculture System enables:

🌡 Live monitoring of temperature

💧 Real-time humidity tracking

🌱 Soil moisture monitoring

👥 Role-based dashboards (Admin, Technician, User)

🔐 Secure JWT authentication

📡 Real-time IoT communication using MQTT

📊 Data visualization through a web dashboard

🌐 Remote monitoring from anywhere

🚀 Live Demo

You can access the deployed project here:

Frontend (Web App)
👉 https://agrovision-two.vercel.app/

Backend API
👉 https://agrovision-6cl7.onrender.com

✨ Features
👥 Multi-User Roles
Role	Permissions
Admin	Manage users, devices, and system data
Technician	Maintain and calibrate IoT devices
User / Farmer	Monitor live environmental data
🔐 Security Features

JWT Authentication

Bcrypt Password Hashing

Role-Based Access Control

Secure API Endpoints

Encrypted sensor data transmission

🌐 System Features

Real-time IoT data updates

Device monitoring dashboard

Sensor activity visualization

Responsive UI

Activity logging

Secure login system

🛠 Tech Stack
IoT Layer

ESP32 Microcontroller

DHT11 / DHT22 Temperature & Humidity Sensor

Soil Moisture Sensor

MQTT Protocol

Backend

Node.js

Express.js

MongoDB + Mongoose

MQTT.js

JSON Web Tokens (JWT)

Bcrypt

Frontend

React.js

JavaScript

HTML5 / CSS3

Tailwind CSS

Chart visualization

Development Tools

Visual Studio Code

Git & GitHub

Postman (API Testing)

📂 Project Structure
Agrovision/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── mqttSubscriber.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/
│
├── README.md
└── package.json
⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Bloodshot2o/Agrovision.git
cd Agrovision
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
MQTT_BROKER=mqtt://broker.hivemq.com

Run server:

node server.js
3️⃣ Frontend Setup
cd frontend
npm install
npm start
4️⃣ IoT Device Setup

Flash ESP32 with firmware.

Configure WiFi credentials.

Set MQTT topic for publishing sensor data.

Connect sensors (DHT + Soil Moisture).

The device will automatically send data to the backend.

📡 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
GET	/api/sensor	Get latest sensor data
POST	/api/sensor	Add new sensor reading
🔒 Security Measures

JWT Authentication

Bcrypt Password Hashing

Role-Based Access Control

Secure API Routes

Encrypted IoT Data Transmission

📈 Future Improvements

Automated irrigation system

AI crop health monitoring

Mobile application

Weather API integration

Alert notification system

👨‍💻 Author

Swagatam Jana
Cybersecurity Intern | Full Stack Developer | IoT Developer

GitHub:
https://github.com/Bloodshot2o

⭐ Support

If you like this project, please consider giving it a star ⭐ on GitHub.
