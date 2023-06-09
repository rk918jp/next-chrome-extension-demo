import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: "chrome-extension://jdeilhjkbgljhldjkfplnekbdglipoab",
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));
app.use(cookieParser());

app.post("/login", (req, res) => {
  if (req.body.userId === "admin" && req.body.password === "admin") {
    // NOTE: Cookieの場合
    // const {secure} = req;
    // res.cookie("accessToken", "test", {
    //   maxAge: 60 * 60 * 24 * 1000, // 1 day
    //   secure,
    //   httpOnly: true,
    //   sameSite: secure ? "none" : "lax",
    // });
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
  // NOTE: Cookieの場合
  // res.clearCookie("accessToken");

  // TODO: accessTokenを無効化
  return res.json({
    result: "ok",
  });
});

app.get("/currentUser", (req, res) => {
  // NOTE: Cookieの場合
  // if (req.cookies.accessToken === "test") {
  //   return res.json({
  //     result: "ok",
  //     user: {
  //       userId: "admin",
  //       name: "Admin",
  //     }
  //   });
  // }

  if (req.header("authorization") === "Bearer test") {
    return res.json({
      result: "ok",
      userInfo: {
        userId: "admin",
        name: "Admin",
      }
    });
  }

  return res.json({
    result: "error",
  })
});


app.listen(8081, () => {
  console.log("Server is running on port 8081");
});