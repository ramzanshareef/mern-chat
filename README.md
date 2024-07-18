# Chat Application

**Chat Application** is a comprehensive web application designed to facilitate real-time communication between users. This MERN stack project leverages sockets to enable efficient and interactive chatting experiences.

## Project Description

Imagine seamlessly chatting with registered users in real-time. With this Chat Application, you can effortlessly communicate with others, making it ideal for:

- **Non-profit Organizations**: Enhance communication among team members.
- **Community Centers**: Provide a platform for community members to chat and share information.
- **Event Planning**: Coordinate with team members in real-time during events.
- **Educational Purposes**: Enable students and teachers to communicate instantly.

Our intuitive interface allows users to easily log in and start chatting. The application leverages the power of **React.js** for a smooth, interactive user experience, **Express.js** for a robust backend, **Node.js** for server-side operations, and **MongoDB** for efficient data management.

## Features

- User authentication
- Real-time messaging using sockets
- Responsive design for desktop
- MongoDB for data storage

## Technologies Used

- **React.js**: Frontend framework for interactive UI
- **Express.js**: Backend framework for server-side logic
- **Node.js**: Runtime environment for server-side operations
- **MongoDB**: Database for storing user and message data
- **Socket.io**: For real-time, bidirectional communication

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Ensure Node.js is installed on your system.

### Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ramzanshareef/mern-chat
    cd mern-chat
    ```

2. Install dependencies for both frontend and backend:
    ```sh
    npm install
    cd backend
    npm install
    ```

3. Create a `.env` file in the project root directory and add the following environment variables:
    ```env
    BACKEND_PORT=your_backend_port
    REACT_APP_BACKEND_URL=your_backend_url
    REACT_APP_FRONTEND_URL=your_frontend_url
    SESSION_SECRET=your_session_secret
    MONGO_URL=your_mongo_url
    ```

### Running the Application

1. Start the backend server:
    ```sh
    cd backend
    nodemon server.js
    ```
    This starts the server and connects it to the database.

2. Start the frontend:
    ```sh
    cd ..
    npm run start
    ```
    This runs the app in development mode. Open `REACT_APP_FRONTEND_URL` to view it in your browser.

    The page will reload when you make changes.

### Building for Production

To create a production build, run:
```sh
npm run build
```

## Usage

1. **Log In**: Create an account or log in to your existing account.
2. **Chat:**
   - **Start a Chat**: Navigate to the chat page, select a user, and start chatting in real-time.
   - **View Messages**: See your chat history and continue conversations from where you left off.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a pull request

## Contact

For any inquiries or feedback, please reach out to:
- **Name**: Mohd Ramzan Shareef
- **Email**: mail.ramzanshareef@gmail.com
- **GitHub**: [ramzanshareef](https://github.com/ramzanshareef)
