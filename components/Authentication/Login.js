import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Link from "next/link";
import ListDivider from "@mui/joy/ListDivider";
import Input from "@mui/joy/Input";
import { CssVarsProvider } from "@mui/joy/styles";
import Styles from "./Auth.module.css";
import TamboluLogo from "/components/Logo/Tambolu";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../../public/store/ProductState";
import MessageDialog from "../Dialog/MessageDialog";
import Checkbox from "@mui/joy/Checkbox";

export default function Login() {
  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(32);
  const [isVisible, setVisible] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isSaveAccount, setSaveAccount] = React.useState(false);
  const [isLogin, setLoginState] = React.useState(null);

  const usernameField = React.useRef();
  const passwordField = React.useRef();

  const [logoSize, setLogoSize] = React.useState({
    width: 200,
    height: 200,
  });

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    renderInput();
  }, []);

  const renderInput = () => {
    const username = window.localStorage.getItem("saved-account");
    usernameField.current.childNodes[0].value = username;
  };

  const getValues = () => {
    loginUser(usernameField.current.childNodes[0].value)
      .then((res) => {
        setLoginState(
          res.password === passwordField.current.childNodes[0].value
        );
        if (isSaveAccount)
          window.localStorage.setItem(
            "saved-account",
            usernameField.current.childNodes[0].value
          );
        else window.localStorage.setItem("saved-account", "");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(true);
  };

  return (
    <>
      <CssVarsProvider>
        <div className="h-screen flex items-center">
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            className="bg-blue-300 p-3 border border-blue-700 border-dashed border-4"
          >
            <div className="text-center">
              <TamboluLogo width={logoSize.width} height={logoSize.height} />
            </div>
            <strong className={`text-xl ${Styles["title-font"]} mx-auto`}>
              ĐĂNG NHẬP
            </strong>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              className="bg-blue-300"
            >
              <small className={`username-label ${Styles["Montserrat-font"]}`}>
                Tên đăng nhập
              </small>
              <Input
                ref={usernameField}
                size="md"
                placeholder="Nguyenvana1998"
                sx={{
                  "--Input-radius": `${radius}px`,
                  "--Input-decorator-childHeight": `${childHeight}px`,
                }}
              />
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              className="bg-blue-300"
            >
              <small className={`password-label ${Styles["Montserrat-font"]}`}>
                Mật khẩu
              </small>

              <Input
                ref={passwordField}
                size="md"
                placeholder=""
                type={isVisible ? "text" : "password"}
                endDecorator={
                  <Button
                    variant="soft"
                    size="sm"
                    className="bg-blur-green hover:bg-blur-blue"
                    onClick={() => setVisible((prev) => !prev)}
                  >
                    {isVisible ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                }
                sx={{
                  "--Input-radius": `${radius}px`,
                  "--Input-decorator-childHeight": `${childHeight}px`,
                }}
              />
            </Box>

            <ListDivider component="hr" />

            <Checkbox
              color="primary"
              label="Ghi nhớ mật khẩu?"
              onClick={() => setSaveAccount((prev) => !prev)}
            />

            <Button
              variant="outlined"
              onClick={() => {
                getValues();
              }}
            >
              Đăng nhập
            </Button>
            <small
              className={`username-label text-right ${Styles["Montserrat-font"]}`}
            >
              Chưa có tài khoản?
              <Link href="/register">
                <button className="text-blue-600">Hãy đăng ký</button>
              </Link>
            </small>
          </Box>
        </div>
      </CssVarsProvider>

      <MessageDialog open={open} handleClose={handleClose} isLogin={isLogin} />
    </>
  );
}
