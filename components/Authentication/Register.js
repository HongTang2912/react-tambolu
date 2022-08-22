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
import jwt_decode from "jwt-decode";
import jwt_encode from "jwt-encode";
import Checkbox from "@mui/joy/Checkbox";
import ErrorsList from './Errors'
import {RegisterUser, loginUser} from '/public/store/ProductState'
import { useSelector, useDispatch } from 'react-redux';

export default function Register() {
  const dispatch = useDispatch();

  const [radius, setRadius] = React.useState(16);
  const [childHeight, setChildHeight] = React.useState(32);

  const [isVisible, setVisible] = React.useState(false);
  const [isSaveAccount, setSaveAccount] = React.useState(false);
  const [errorsList, setErrorsList] = React.useState([[],[],[],[],[],[]])
  const [registerClicked, setRegisClicked] = React.useState(false)
  const [logoSize, setLogoSize] = React.useState({
    width: 400,
    height: 400,
  });

  const RegisterForm = React.useRef();



  React.useEffect(() => {
    // for(let i = 0; i < 5; i++) {
    //   console.log(RegisterForm.current.childNodes[i].childNodes[1]?.querySelector('input').value);
    // }
    setErrorsList(renderInput())
  }, []);
  
  const getValue = (i) => {
    return RegisterForm.current.childNodes[i].childNodes[1]?.querySelector('input').value
  }

  const renderInput = (clicked) => {
    // for(let i = 0; i < 5; i++) {
    //   console.log(RegisterForm.current.childNodes[i].childNodes[1]?.querySelector('input').value);
    // }

    const regexCheckList = {
      //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
      username: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,

      email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

      //Minimum six characters, at least one uppercase letter, one lowercase letter and one number:
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/g,

      tel: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

    }

    let errorsList = []


    const checkRegexErr = (index, range) => {
      if (!regexCheckList.username.test(getValue(index))) {
        let err = [];
        if (!/[A-Z]/g.test(getValue(index))) {
          err.push("Có ít nhât 1 chữ cái viết hoa")
        }
        if (!/[a-z]/g.test(getValue(index))) {
          err.push("Có ít nhât 1 chữ cái viết thường")
        }
        if (!/[0-9]/g.test(getValue(index))) {
          err.push("Có ít nhât 1 chữ số")
        }
        if (getValue(index).length < range) {
          err.push(`Có ít nhất ${range} ký tự`)
        }
        errorsList.push(err);
      }
      else errorsList.push([])
    }

    if (!regexCheckList.email.test(getValue(1))) {
      clicked ? 
      errorsList.push(["email không hợp lệ"])
      : errorsList.push(["Hãy nhập email của bạn"])
    }
    else errorsList.push([])

    checkRegexErr(2, 8);
    
    if (!regexCheckList.tel.test(getValue(3))) {
      clicked ? 
      errorsList.push(["Số điện thoại không đúng"])
      : errorsList.push(["Hãy nhập số điện thoại"])
    }
    else errorsList.push([])
    checkRegexErr(4, 6);
    checkRegexErr(5, 6);
    if (getValue(4) === getValue(5)) errorsList.push([]);
    else errorsList.push(["Mật khẩu không khớp"]);

    return errorsList;


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

  const RegisterNewUser = () => {
    RegisterUser({
      email: getValue(1),
      username: getValue(2),
      tel: getValue(3),
      password: getValue(4)
    }).then(res => {
      if(res.status == "success") {

       
  
        saveToLocalStorage(res, 'login-user')
  
        if (isSaveAccount) {
          saveToLocalStorage(res, 'save-account')
        }
  
        else
          window.localStorage.removeItem("save-account");
  
          
        
         
        dispatch({
          type: 'user/login',
          payload: {
            username: getValue(2)
          }
        })  

        location.replace("/")
      }
    })
  }


  return (
    <>
      <CssVarsProvider>
        <div className="py-6 flex items-center">
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            className="bg-blue-300 p-3 border border-blue-700 border-dashed border-4"
          >
            <Box 
              sx={{ alignItems: 'center'}}
              className="sm:flex"
            >
              <div className="text-center">
                <TamboluLogo width={logoSize.width} height={logoSize.height} />
              </div>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 3 }}
                ref={RegisterForm}
              >
                <strong className={`text-xl ${Styles["title-font"]} mx-auto`}>
                  ĐĂNG KÝ
                </strong>

                {/* Email register */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  className="bg-blue-300"
                  >
                  <small
                    className={`username-label ${Styles["Montserrat-font"]}`}
                  >
                    Email
                  </small>
                  <Input
                    error={errorsList[0].length != 0 && registerClicked}
                    size="md"
                    placeholder="example@gmail.com"
                    type="email"
                    sx={{
                      "--Input-radius": `${radius}px`,
                      "--Input-decorator-childHeight": `${childHeight}px`,
                    }}
                  />
                  <ErrorsList clicked={registerClicked} error_list={errorsList[0]}/>
                </Box>

                {/* Username field */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  className="bg-blue-300"
                >
                  <small
                    className={`username-label ${Styles["Montserrat-font"]}`}
                  >
                    Tên đăng nhập
                  </small>
                  <Input
                    error={errorsList[1].length != 0 && registerClicked}
                    size="md"
                    placeholder="Nguyenvana1998"
                    sx={{
                      "--Input-radius": `${radius}px`,
                      "--Input-decorator-childHeight": `${childHeight}px`,
                    }}
                  />
                  <ErrorsList clicked={registerClicked} error_list={errorsList[1]}/>
                </Box>

                {/* Phone number */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  className="bg-blue-300"
                >
                  <small
                    className={`username-label ${Styles["Montserrat-font"]}`}
                  >
                    Số điện thoại
                  </small>
                  <Input
                    error={errorsList[2].length != 0 && registerClicked}
                    size="md"
                    type="tel"
                    placeholder="0123456789"
                    sx={{
                      "--Input-radius": `${radius}px`,
                      "--Input-decorator-childHeight": `${childHeight}px`,
                    }}
                  />
                  <ErrorsList clicked={registerClicked} error_list={errorsList[2]}/>
                </Box>

                {/* Password and Confirm password */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  className="bg-blue-300"
                >
                  <small
                    className={`password-label ${Styles["Montserrat-font"]}`}
                  >
                    Mật khẩu
                  </small>

                  <Input
                    error={errorsList[3].length != 0 && errorsList[4].length != 0 && registerClicked}
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
                  <ErrorsList clicked={registerClicked} error_list={errorsList[3]}/>
                </Box>

                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  className="bg-blue-300"
                >
                  <small
                    className={`password-label ${Styles["Montserrat-font"]}`}
                  >
                    Xác Nhận Mật khẩu
                  </small>

                  <Input
                    error={errorsList[3].length != 0 && errorsList[4].length != 0 && registerClicked}
                    size="md"
                    placeholder=""
                    type={isVisible ? "text" : "password"}
                    // endDecorator={
                    //   <Button
                    //     variant="soft"
                    //     size="sm"
                    //     className="bg-blur-green hover:bg-blur-blue"
                    //     onClick={() => setVisible((prev) => !prev)}
                    //   >
                    //     {isVisible ? <FaEyeSlash /> : <FaEye />}
                    //   </Button>
                    // }
                    sx={{
                      "--Input-radius": `${radius}px`,
                      "--Input-decorator-childHeight": `${childHeight}px`,
                    }}
                  />
                  <ErrorsList clicked={registerClicked} error_list={errorsList[4]}/>
                  <ErrorsList clicked={registerClicked} error_list={errorsList[5]}/>
                </Box>

                {/* End */}
              </Box>
            </Box>

            <ListDivider component="hr" />

            <Checkbox
              color="primary"
              label="Ghi nhớ cho lần đăng nhập sau"
              onClick={() => setSaveAccount((prev) => !prev)}
            />

            <Button
              variant="outlined"
              onClick={() => {
                setRegisClicked(true)
                setErrorsList(renderInput(registerClicked));
                if(
                    renderInput(registerClicked)[0].length == 0 &&
                    renderInput(registerClicked)[1].length == 0 &&
                    renderInput(registerClicked)[2].length == 0 &&
                    renderInput(registerClicked)[3].length == 0 &&
                    renderInput(registerClicked)[4].length == 0 &&
                    renderInput(registerClicked)[5].length == 0
                  ) {
                    RegisterNewUser()
                  }
                 
              }}
            >
              
              Đăng Ký
            </Button>
            
            <small
              className={`username-label text-right ${Styles["Montserrat-font"]}`}
            >
              Đã có tài khoản?
              <Link href="/login">
                <button className="text-blue-600">Đăng nhập</button>
              </Link>
            </small>
          </Box>
        </div>
      </CssVarsProvider>

    </>
  );
}
