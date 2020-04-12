const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Express Middleware to handle cookies(JsonWebToken)
server.express.use(cookieParser());

// decode JWT, to get user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  console.log(token, "token");
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// Server started!
server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  (details) => {
    console.log(`http://localhost:${details.port}`);
  }
);
