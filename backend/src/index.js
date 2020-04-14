const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Express Middleware to handle cookies(JsonWebToken)
server.express.use(cookieParser());

// decode JWT, to get user id on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{id, email}"
  );
  req.user = user;
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
