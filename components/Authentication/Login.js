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
import jwt_decode from "jwt-decode";
import jwt_encode from "jwt-encode";
import { useSelector, useDispatch } from 'react-redux';
import ErrorsList from './Errors'

export default function Login() {
  const dispatch = useDispatch()

  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(32);
  const [isVisible, setVisible] = React.useState(false);
  const [isSaveAccount, setSaveAccount] = React.useState(false);
  const [isValidated, setValidate] = React.useState(true)

  const usernameField = React.useRef();
  const passwordField = React.useRef();

  const [logoSize, setLogoSize] = React.useState({
    width: 200,
    height: 200,
  });

  React.useEffect(() => {
    renderInput();

  }, []);

  const renderInput = () => {
    const username = window.localStorage.getItem("save-account") ?? "";
    usernameField.current.childNodes[0].value = username != "" ? jwt_decode(username)?.username : null;
  };

  const saveToLocalStorage = (user, key) => {
    window.localStorage.setItem(
      key,
      jwt_encode(
        {
          username: user?.username,
          email: user?.email,
          phone_number: user?.phone_number
        },
        "tambolu"
      )
    )
  }

  const getValues = () => {
    loginUser(usernameField.current.childNodes[0].value)
      .then((res) => {

        saveToLocalStorage(res, 'login-user')

        if (isSaveAccount) {
          saveToLocalStorage(res, 'save-account')
        }

        else
          window.localStorage.removeItem("save-account");

        setValidate(res.password == passwordField.current.childNodes[0]?.value);
        if (res.password == passwordField.current.childNodes[0]?.value) {
          
          location.replace('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CssVarsProvider>
        {console.log(isValidated)}
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
            <ErrorsList 
              clicked={true} 
              error_list={isValidated ? [] : ["Sai tên đăng nhập hoặc mật khẩu"]}
            />
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

    </>
  );
}
