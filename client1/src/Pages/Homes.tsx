import { useEffect, useState } from "react";
import BlogList from "../components/Blog/BlogList";
import Header from "../components/Header";
import ListNews from "../components/News/ListNews";
import { Apiclient } from "../api/AxiosApi";

function Homes() {
  const [dataget, setDataget] = useState([])

 async  function handleLogin() {
    const res = await Apiclient.post('/auth/login', {
      username: "abcd2",
      password: '1234'
    })
    if (res.data) {
      localStorage.setItem("token", res.data.token)
      localStorage.setItem(`refreshtoken`,res.data.reFreshToken )
      alert('login thành công')
    }

  }

  async function getData() {

    const resBlog = await Apiclient.get("/blog/blog_list")
    console.log(`ressblog`, resBlog)
    if(resBlog?.data) {
      setDataget(resBlog.data)
      alert("getData thành công")
    }
 
}


  console.log('blogData', dataget)
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto flex">
        {/* cột trái */}
        <div  className="md:w-[70%] w-full">
        <BlogList />
        </div>
        {/* cột phải */}
        <div className="w-[30%] pl-7 md:block hidden ">
          <ListNews />
        </div>
      </main>
      <div className="flex gap-4">
        <button onClick={handleLogin} className="border p-3">Login</button>
        <button onClick={getData} className="border p-3">getdata</button>
      </div>
    </>
  );
}

export default Homes;