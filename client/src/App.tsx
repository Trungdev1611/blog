import "./App.css";
import BlogList from "./components/Blog/BlogList";
import Header from "./components/Header";
import ListNews from "./components/News/ListNews";
import React from "react";

function App() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto flex">
        {/* cột trái */}
        <BlogList />
        {/* cột phải */}
        <div className="w-[30%] pl-7">
          <ListNews />
        </div>
      </main>
    </>
  );
}

export default App;