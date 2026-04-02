# Voice2Gov – AI-based Civic Grievance Backend 🏛️

A production-ready **FastAPI** backend for managing, classifying, and routing civic grievances using AI.

---

## ✨ Features

| Module | Technology | Description |
|--------|-----------|-------------|
| Framework | FastAPI + Uvicorn | Async REST API |
| Database | MongoDB (Motor) | Async document store |
| Auth | JWT + bcrypt | Secure token-based auth |
| NLP | spaCy | Complaint category classification |
| Image | OpenCV / Pillow | Base64 image validation |
| Speech | Vosk | Offline speech-to-text |
| Realtime | Socket.IO | Push notifications |
| Maps | Nominatim (OSM) | Reverse geocoding |
| Testing | pytest-asyncio | Async test suite |

---

## 🏗️ Project Structure

```
backend/
├── run.py                  # Entry point (seeds admin + starts server)
├── requirements.txt
├── pyproject.toml          # pytest config
├── .env.example
└── app/
    ├── main.py             # FastAPI app + Socket.IO mount
    ├── config/
    │   ├── database.py     # Motor connection + index creation
    │   └── settings.py     # Pydantic settings from .env
    ├── models/
    │   ├── user_model.py
    │   └── complaint_model.py
    ├── schemas/
    │   ├── user_schema.py
    │   └── complaint_schema.py
    ├── routes/
    │   ├── auth_routes.py
    │   ├── complaint_routes.py
    │   ├── admin_routes.py
    │   └── notification_routes.py
    ├── services/
    │   ├── auth_service.py
    │   ├── complaint_service.py
    │   ├── ai_service.py
    │   ├── routing_service.py
    │   └── notification_service.py
    ├── repositories/
    │   ├── user_repo.py
    │   └── complaint_repo.py
    ├── utils/
    │   ├── jwt_handler.py
    │   ├── password_hasher.py
    │   └── helpers.py
    └── tests/
        ├── conftest.py
        ├── test_auth.py
        ├── test_complaints.py
        └── test_ai.py
```

---

## ⚡ Quick Start

### 1. Create and activate virtual environment

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
```

### 2. Install dependencies

```powershell
pip install -r requirements.txt
```

### 3. Download spaCy model

```powershell
python -m spacy download en_core_web_sm
```

### 4. Configure environment

```powershell
copy .env.example .env
# Edit .env with your MongoDB URL and JWT secret
```

### 5. Run the server

```powershell
python run.py
```

The API will be available at **http://localhost:8000**

- Swagger UI: http://localhost:8000/api/docs
- ReDoc:      http://localhost:8000/api/redoc
- Health:     http://localhost:8000/health

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register new citizen |
| POST | `/api/auth/login` | ❌ | Login and get JWT |
| GET  | `/api/auth/me` | ✅ | Get current profile |

### Complaints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/api/complaints/` | citizen | File a complaint |
| GET | `/api/complaints/user` | citizen | My complaints |
| GET | `/api/complaints/{id}` | any | Get complaint by ID |
| POST | `/api/complaints/{id}/vote` | citizen | Upvote |
| GET | `/api/complaints/` | authority/admin | All complaints |
| GET | `/api/complaints/authority/complaints` | authority | Dept complaints |
| PATCH | `/api/complaints/{id}/status` | authority/admin | Update status |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | List all users |
| PATCH | `/api/admin/user/role` | Change user role |
| DELETE | `/api/admin/user/{id}` | Delete user |
| GET | `/api/admin/complaints` | All complaints (filtered) |
| GET | `/api/admin/stats` | Platform statistics |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications/` | My notifications |
| PATCH | `/api/notifications/{id}/read` | Mark one read |
| PATCH | `/api/notifications/read-all` | Mark all read |

---

## 🤖 AI Pipeline

When a complaint is submitted:

```
description
    │
    ▼
[TextClassifier]  ──spaCy similarity──▶  category
    │                (keyword fallback)
    ▼
[DepartmentMapper] ──────────────────▶  department
    │
    ▼
[PriorityEngine]  ──keywords+votes──▶   priority
    │               + similar count
    ▼
[ImageProcessor]  ──OpenCV/Pillow──▶    image_valid
```

Category → Department mapping:

| Category | Department |
|----------|-----------|
| electricity | EB (Electricity Board) |
| water | Water Department |
| road | Highways Department |
| garbage | Municipality |
| other | General Administration |

---

## 🔌 Socket.IO (Real-time)

Connect at: `ws://localhost:8000/ws/socket.io`

**Auth on connect:**
```js
const socket = io("http://localhost:8000", {
  path: "/ws/socket.io",
  auth: { userId: "<your-user-id>" }
});
```

**Events received:**
- `notification` – status changes, new complaint assignments

---

## 🧪 Running Tests

```powershell
pytest
```

Individual suites:
```powershell
pytest app/tests/test_auth.py -v
pytest app/tests/test_complaints.py -v
pytest app/tests/test_ai.py -v
```

---

## 🛡️ User Roles

| Role | Permissions |
|------|-------------|
| `citizen` | Register, file complaints, vote, view own complaints |
| `authority` | View + update dept complaints, receive notifications |
| `admin` | Full access: user management, all complaints, stats |

---

## 📦 Default Admin Credentials

Set in `.env`:
```
ADMIN_EMAIL=admin@voice2gov.com
ADMIN_PASSWORD=Admin@123456
```
> ⚠️ **Change these in production!**

---

## 🔧 Optional: Vosk Speech-to-Text

1. Download a Vosk model: https://alphacephei.com/vosk/models
2. Extract to `backend/vosk-model/`
3. Send `audio_text` (transcribed text) or use the `VoskSTT` class directly

---

*Built with ❤️ for civic empowerment*
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
