import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Skeleton,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import {axiosInstance} from "@/util/axios";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {useRouter} from "next/router";

const AppBarHeight = 56;
const PopupWidth = 500;
const PopupHeight = 600;

type UserInfo = {
  userId: string;
  name: string;
};

type LoginForm = {
  userId: string;
  password: string;
}

type TodoForm = {
  title: string;
}

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const Todo = () => {
  const {register, handleSubmit} = useForm<TodoForm>();
  const onSubmit = (data: TodoForm) => {
    // TODO
  }

  return (
      <Box sx={{display: "flex", flexDirection: "column", rowGap: "10px"}} component={"form"}
           onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("title")} fullWidth label={"タイトル"}/>
      </Box>
  )
}
const Home = () => {
  const router = useRouter();
  const query = router.query;
  const [initialized, setInitialized] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const [taskText, setTaskText] = useState("");

  useEffect(() => {
    if (query.taskText) {
      setTaskText(query.taskText as string);
    }
  }, [query])

  useEffect(() => {
    (async () => {
      // 初期化処理をしていることを分かりやすくするために遅延を入れる
      await sleep(1000);
      const storage = await chrome.storage.local.get("accessToken");
      const accessToken = storage.accessToken;
      if (accessToken) {
        const res = await axiosInstance.get("/currentUser", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
        const {result, userInfo} = res.data;
        if (result === "ok") {
          setUserInfo(userInfo);
        }
      }
      setInitialized(true);
    })()
  }, []);

  const {register, handleSubmit} = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const res = await axiosInstance.post("/login", data);
    const {result, accessToken} = res.data;
    if (result === "ok") {
      await chrome.storage.local.set({accessToken});
      const userRes = await axiosInstance.get("/currentUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      const {result: userResult, userInfo} = userRes.data;
      if (userResult === "ok") {
        setUserInfo(userInfo);
      }
    }
  }

  return (
      <Box sx={{width: PopupWidth, height: PopupHeight}}>
        <AppBar position="static" sx={{height: AppBarHeight}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Next Chrome Extension Demo
            </Typography>
            {userInfo && (
                <>
                  <Typography variant={"body2"}>
                    {userInfo ? userInfo.name : ""}
                  </Typography>
                  <Button
                      variant={"text"}
                      sx={{color: "#fff"}}
                      onClick={() => {
                        chrome.storage.local.set({accessToken: undefined});
                        setUserInfo(undefined);
                      }}
                  >
                    ログアウト
                  </Button>
                </>
            )}
          </Toolbar>
        </AppBar>
        <Box sx={{p: "10px"}}>
          {userInfo ? (
              <Box sx={{display: "flex", flexDirection: "column", rowGap: "10px"}}>
                <Typography>
                  タスクを追加
                </Typography>
                <TextField
                    value={taskText}
                    onChange={(e) => {
                      setTaskText(e.target.value);
                    }}
                />
                <Button fullWidth variant={"contained"}>
                  登録
                </Button>
              </Box>
          ) : (
              <Box sx={{display: "flex", flexDirection: "column", rowGap: "10px"}} component={"form"}
                   onSubmit={handleSubmit(onSubmit)}>
                <TextField label={"ユーザーID"} fullWidth {...register("userId")} sx={{flex: 1}}/>
                <TextField label={"パスワード"} fullWidth {...register("password")} />
                <Button type={"submit"} fullWidth variant={"contained"}>ログイン</Button>
              </Box>
          )}
        </Box>
        {!initialized && (
            <Box sx={{
              position: "absolute",
              width: PopupWidth,
              height: PopupHeight,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              top: 0,
              left: 0,
              backgroundColor: "rgba(255, 255, 255, 0.5)"
            }}>
              <CircularProgress/>
            </Box>
        )}
      </Box>
  )
}

export default Home;