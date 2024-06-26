import express from "express";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";
import verifyRoute from "./routes/verify.route.js";
import cookieParser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: ["https://estate-booking-frontend.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);
app.use("/api/verify", verifyRoute);

app.listen(8800, () => {
  console.log("Server is running");
});
