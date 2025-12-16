import express from "express";
import path from "path";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./config/inngest.js";
import adminRouter from "./routes/admin.route.js";
import userRouter from "./routes/user.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import cors from "cors";

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware());

app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRouter);
app.use("/app/users", userRouter);
app.use("/api/ordres", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

if (ENV.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(3000, () => console.log("Server is up and running"));
};
startServer();
