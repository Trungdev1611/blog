import React, { useCallback, useEffect, useState } from "react";
import ButtonBorder from "../common/Button";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import ModalCommon from "../common/ModalCommon";
import { loginAuth, registerAuth } from "./api";
import { Apiclient } from "../../api/AxiosApi";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const localtion = useLocation();
  const [modalIsOpen, setIsOpenModal] = useState(false);
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    if (localtion.pathname?.includes("/login")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [localtion]);
 async function handleSigninGG() {
  try {
    const res = await Apiclient.get("/blog/blog_list");
    if (res?.data) {
      alert("get bloglist thành công");

    }
  } catch (error) {
    console.log("err", error)
  }
  
    // alert("sign gg");
    //
  }

  function handleSigninFB() {
    alert("sign fb");

    //
  }
  function handleSignInEmail() {
    setIsOpenModal(true);

    //
  }
  async function handleSubmitEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(dataForm);
    if(!isLogin) {
      const res = await registerAuth(dataForm);
      if (res?.data) {
        alert("register thành công");
        navigate("/login")
      }
    }
    else {
      const res = await loginAuth(dataForm);
      if (res?.data) {
        localStorage.setItem("token", res.data.token)
        localStorage.setItem(`refreshtoken`,res.data.reFreshToken )
        alert('login thành công')
        navigate('/homes')
      }
    }
  
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpenModal(false);
  }

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value,
    });
  }

  function onNavigate() {
    isLogin ? navigate('/register') : navigate('/login')
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center font-mono">
      <div className="relative shadow-xl w-[600px] lg:max-w-[50%] flex items-center justify-center flex-col h-full bg-white">
        {/* Dấu X */}
        <span
          className="absolute right-2 top-2"
          onClick={() => navigate(`/homes`)}
        >
          <AiOutlineClose size={20} color="#535379" />
        </span>
        <div className="h-[30%] flex items-center">
          <h3 className="text-3xl font-semibold text-slate-600 ">
            {isLogin ? `Wellcome Back` : `Join Medium`}
          </h3>
        </div>
        <div className="flex flex-col gap-4 max-w-[250px]">
          <ButtonBorder
            text="Sign up with Google"
            icon={<FcGoogle size={16} />}
            handleClick={handleSigninGG}
          />

          <ButtonBorder
            text="Sign up with Facebook"
            icon={<BsFacebook color="#3b5998" size={16} />}
            handleClick={handleSigninFB}
          />

          <ButtonBorder
            text="Sign up with email"
            icon={<TfiEmail size={16} />}
            handleClick={handleSignInEmail}
          />
          <div className="shadow-xl">
            <ModalCommon
              closeModal={closeModal}
              modalIsOpen={modalIsOpen}
              handleAfterOpenModal={afterOpenModal}
            >
              <form action="" onSubmit={handleSubmitEmail} autoComplete="off">
                <div className="flex gap-4 flex-col justify-center relative">
                  <div className="text-2xl font-semibold text-slate-600 mb-10">
                    {isLogin ? `Sign in with email` : `Sign up with email`}
                  </div>
                  <div>
                    <label htmlFor="email" className="text-slate-400">
                      Username
                    </label>
                    <input
                      type="text"
                      className="inputborder w-full"
                      id="email"
                      name="username"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="text-slate-400">
                      Your password
                    </label>
                    <input
                      type="text"
                      className="inputborder  w-full"
                      id="password"
                      name="password"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <button
                    className="btnborder bg-black text-white mt-4 justify-center"
                    // onClick={handleSubmitEmaillogin}
                    type="submit"
                  >
                    {isLogin ? `Sign in` : `Sign up`}
                  </button>
                  <p className="text-green-500 text-sm mt-4 text-center">
                    See all sign in options or create a new account
                  </p>
                  <p className="text-green-500 text-sm mt-4  text-right cursor-pointer underline" onClick={onNavigate}>
                    {isLogin ?  `I don't have account. Create one?` : `I have an account` }
                  </p>
                  <span className="absolute right-0 top-0" onClick={closeModal}>
                    <AiOutlineClose size={16} color="#535379" />
                  </span>
                </div>
              </form>
            </ModalCommon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
