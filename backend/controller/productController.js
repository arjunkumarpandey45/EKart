import { Product } from "../model/productModel.js";
import cloudnairy from "../utils/cloudnairy";
import getdataURI from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  try {
    const { productName, productDisc, productPrice, category, brand } =
      req.body;
    if (!productDisc || !productName || !productPrice || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const productImg = [];
    if (req.file && req.file.length > 0) {
      for (let file of files) {
        const fileURI = getdataURI(file);
        const result =await cloudnairy.uploader.upload(fileURI,{
            folder:"E-kart Products"
        })
        productImg.push({
            url:result.secure_url,
            public_Id:result.public_id
        })
      }

    }
    const newProduct=await Product.create({
       userId,productDisc,productName,productPrice,brand,productImg,category
    })
    return res.status(200).json({
        success:true,
        message:"Product added Succesfull",
        product:newProduct
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllProduct=async(req,res)=>{
    try{
const products = await Product.find()
if(!products){
    return res.status(500).json({
        success:false,
        message:"Product is misssing",
        products:[]
    })
}
return res.status(200).json({
    success:true,
    message:"Products are here..."
    ,products
})
    }catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
}}