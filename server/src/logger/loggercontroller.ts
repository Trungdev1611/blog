import fs from "fs";
import path from "path";
import {Request} from 'express'
import { v4 as uuidv4 } from 'uuid';
function getDate() {
    const date = new Date();

const day = date.getDate().toString().padStart(2, '0');
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const year = date.getFullYear().toString();
const hours = date.getHours().toString().padStart(2, '0');
const minutes = date.getMinutes().toString().padStart(2, '0');
const seconds = date.getSeconds().toString().padStart(2, '0');

return  `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;



}
const fileName = path.join(__dirname,`FileLogError.log`)
export const logger = (msg:string, req:Request) => {
    try {
        let errorToLog = `${getDate()}--------${req.method} ${req.url}----------${msg}---id: ${uuidv4()} \n`
        fs.appendFile(fileName, errorToLog, (error)=> {
            if(error) {
                console.error('Error writing to log file:', error);
            }
        }) 
    } catch (error) {
        console.error('Error trong catch logger:', error);
    }
}