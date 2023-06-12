import { useEffect, useState } from "react";
import BlogList from "./components/Blog/BlogList";
import Header from "./components/Header";
import ListNews from "./components/News/ListNews";
import { Apiclient } from "./api/AxiosApi";

function App() {
  const [dataget, setDataget] = useState([])

  useEffect(() => {
   async function getData() {
      const res = await Apiclient.post('/auth/login', {
        username: "abcd2",
        password: '1234'
      })
      if (res.data) {
        localStorage.setItem("token", res.data.token)
        const resBlog = await Apiclient.get("/blog/blog_list")
        if(resBlog.data) {
          setDataget(resBlog.data)
        }
      }
    }
    getData()
  }, [])
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
    </>
  );
}

export default App;