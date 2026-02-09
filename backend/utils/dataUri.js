import dataURIParser from 'datauri/parser.js'
import path from 'path'
const parser= new dataURIParser()
const getdataURI=(file)=>{
    if (!file) return null;
const extName=path.extname(file.originalname).toString()
return parser.format(extName,file.buffer).content
}
export default getdataURI;