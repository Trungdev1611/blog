import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";
export function blogListController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  throw new Error("in thử lỗi trong logger")
  return res.status(200).json({
    message: "successs",
    data: [{ id: 1, name: "blog1", desc: "LoremIsspum................" }],
  });
}

export function createBlog(req: Request, res: Response, next: NextFunction) {}

export function getBlogItem(req: Request, res: Response, next: NextFunction) {}

export function updateBlog(req: Request, res: Response, next: NextFunction) {}

export function deleteBlog(req: Request, res: Response, next: NextFunction) {}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(path.resolve(__dirname, '..'), "uploads");

    cb(null, uploadFolder);

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

export function uploadFile(req: Request, res: Response) {
  upload.single("fileupload")(req, res, function (err: any) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred during file upload
      return res.status(400).send({ error: "Multer error: " + err.message });
    } else if (err) {
      // An unknown error occurred during file upload
      return res.status(500).send({ error: "Unknown error: " + err?.message });
    }

    // File upload was successful
    console.log("fileUpload", req.file, req.body);

    // Assuming the file was uploaded successfully, construct the local file path
    const filePath = req.file?.path;

    // Send the file path back as a response to the client
    res.status(200).json({ data: filePath });
  });
}
