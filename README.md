# T.R.A.C.E - Real-time Analytics and Control Environment

## 🚀 Project Overview

T.R.A.C.E is an innovative project developed for Smart India Hackathon (SIH) that provides a real-time Location Trcaking Visual isnide a 3D building . The project combines advanced 3D visualization capabilities with real-time data processing to create an immersive and interactive dashboard.

## 🛠️ Technology Stack

### Frontend

- React.js with Three.js for 3D visualization
- NextUI for modern UI components
- React Three Fiber for 3D rendering
- React Three Drei for useful helpers and abstractions

### Backend

- Python Flask server [ GCP?]
- RESTful API architecture
- Real-time data processing capabilities

## 📁 Project Structure

```
T.R.A.C.E/
├── dashboard/                 # Frontend application
│   ├── nextui-dashboard/     # NextUI dashboard implementation
│   └── Models_for_testing/   # 3D models and testing resources
├── Backend/                  # Backend server[GCP?] implementation
├── server.py                # Flask server implementation
└── package.json             # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.x
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone [your-repository-url]
cd T.R.A.C.E
```

2. Install Frontend Dependencies

```bash
npm install
```

3. Install Backend Dependencies

```bash
pip install flask
```

### Running the Application

1. Start the Backend Server

```bash
python server.py
```

2. Start the Frontend Development Server

```bash
cd dashboard/nextui-dashboard
npm run dev
```

## 🌐 API Endpoints

### Backend API

- `POST /data` - Receive sensor data
- `GET /fetch` - Retrieve latest sensor data

## 🎯 Features

- Real-time data visualization
- 3D model rendering and interaction
- Modern and responsive UI
- Real-time data processing
- Interactive dashboard

## 👥 Team

ADRIJA
YUVRAJ
JAIDITYA
ADITYAPAL
ASHMIT
JAIMAN

## 📝 License

MIT LICENSE



---


