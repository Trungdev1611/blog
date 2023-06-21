import React, { useState } from "react";
import { Apiclient } from "../../api/AxiosApi";

const AddUpdateBlog = () => {
  const [file, setFile] = useState<File | undefined>(undefined);
  function handleChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }
  async function handleSendFile() {
    try {
      const formData = new FormData();
      if (!file) {
        alert("vui lòng chọn file!");
        return;
      }
      console.log("file", file)
      formData.append("fileupload", file);
      const res = await Apiclient.postFormData(`/blog/uploadFile`, formData);
      console.log(res.data);
    } catch (error) {
      console.log("err", error);
    }
  }
  return (
    <div>
      AddUpdateBlog
      <input type="file" onChange={handleChangeFile} />
      <button onClick={handleSendFile} className="border p-2">
        sendFile
      </button>
    </div>
  );
};

export default AddUpdateBlog;
