import { NextFunction, Request,Response  } from "express";

export function blogListController(req:Request, res: Response, next:NextFunction) {
    return res.status(200). json({
        message: "successs",
        data: [{id: 1, name: 'blog1', desc: "LoremIsspum................"}]
    })
}