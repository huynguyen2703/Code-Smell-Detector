# 🧼 Code Smell Detector Web App

A powerful **refactoring assistant** that detects code smells and suggests intelligent improvements using **LLMs (Large Language Models)**. Built for developers, this **web-based tool** includes a live coding IDE, multi-language support, and seamless AI integration — helping you write cleaner code, faster.

> 🚀 Created using modern web technologies, AI models, and AWS cloud services.

---

## 📸 Demo Preview

![Code Smell Detector Demo](./preview-image)

> ✨ Example: Python code analysis detecting a **Long Parameter List** and **Primitive Obsession** code smell using LLM evaluation.

---

## 🌟 Features

- 💻 **Web IDE**: Paste code directly in the browser.
- 🧠 **Multi-LLM Evaluation**: Analyzes code using multiple large language models.
- 🌐 **Multi-language Detection**: Supports Python, JavaScript, Java, and more.
- 🔍 **Refactoring Suggestions**: Get practical, explainable tips to improve code quality.
- 🛠️ **Built for Developers**: IDE-style experience with language selection.
- ☁️ **Scalable Cloud Deployment**: AWS-ready architecture.
- 🧠 **Powered by Python 3.11** for backend AI analysis.

---

## 🧰 Tech Stack

### 🎨 Frontend
- ![Next.js](https://img.shields.io/badge/-Next.js-000?logo=next.js&logoColor=white) **Next.js**
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white) *(optional for styling)*

### ⚙️ Backend
- ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) **Node.js**
- ![Express](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white) **Express.js**
- ![Python](https://img.shields.io/badge/-Python%203.11-3776AB?logo=python&logoColor=white) **Python 3.11** (LLM Evaluation Microservice)

### 🛢️ Database
- ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) **MongoDB**

### ☁️ Deployment (Tested on AWS)
- ![AWS Amplify](https://img.shields.io/badge/-AWS%20Amplify-FF9900?logo=amazonaws&logoColor=white) **Amplify** – Frontend hosting
- ![Amazon ECS](https://img.shields.io/badge/-Amazon%20ECS-FF9900?logo=amazon-ecs&logoColor=white) **ECS** – Container orchestration
- ![Amazon ECR](https://img.shields.io/badge/-Amazon%20ECR-FF9900?logo=amazonaws&logoColor=white) **ECR** – Docker image storage
- ![API Gateway](https://img.shields.io/badge/-API%20Gateway-FF4F00?logo=amazonaws&logoColor=white) **API Gateway** – API routing

---

## 🖼 Screenshot Example

📌 The example above shows a Python function `create_user_profile` passed into the tool:

- Detected **Long Parameter List** smell with 8 parameters
- Detected **Primitive Obsession** (relying on primitive types)
- Models recommended grouping data into a class like `UserProfile`

---

## 🧪 How to Run Locally

### 🔧 Prerequisites
- Node.js (v18+)
- Python 3.11+
- MongoDB
- Docker (optional for container setup)

### 📦 Install Frontend

```bash
cd frontend
npm install
npm run dev

cd backend
npm install
node index.js


🛣 Roadmap
 More language support (Go, Rust, C++)

 OAuth login (GitHub or Google)

 User history dashboard

 Upload full files / drag-and-drop

 In-browser refactor preview

🧑‍💻 Author
Huy Quoc Nguyen



⚠️ Deployment Notes
💸 Full deployment was tested on AWS but paused to prevent excessive costs.

📄 License
MIT License – free for personal and educational use.


