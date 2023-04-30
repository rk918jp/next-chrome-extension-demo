import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

app.post("/login", (req, res) => {
  if (req.body.username === "admin" && req.body.password === "admin") {
    res.cookie("accessToken", "test", {
      maxAge: 60 * 60 * 24 * 1000, // 1 day
      httpOnly: true,
    });
    return res.json({
      result: "ok",
      accessToken: "test",
    });
  }

  return res.json({
    result: "error",
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  return res.json({
    result: "ok",
  });
});

app.get("/currentUser", (req, res) => {
  if (req.cookies.accessToken === "test") {
    return res.json({
      result: "ok",
      user: {
        username: "admin",
        name: "Admin",
      }
    });
  }

  return res.json({
    result: "error",
  })
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});