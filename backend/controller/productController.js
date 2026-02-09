import { Product } from "../model/productModel.js";
import cloudnairy from "../utils/cloudnairy.js";
import getdataURI from "../utils/dataUri.js";

export const addProduct = async (req, res) => {
  console.log("Terminal Check -> Body:", req.body);
  console.log("Terminal Check -> Files:", req.files);
  try {
    const { productName, productDisc, productPrice, category, brand } =
      req.body;
    const userId = req.user._id;
    if (!productDisc || !productName || !productPrice || !category || !brand) {
      console.log("Terminal Check -> Body:", req.body);
      console.log("Terminal Check -> Files:", req.files);
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const productImg = [];
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileURI = getdataURI(file);
        const result = await cloudnairy.uploader.upload(fileURI, {
          folder: "E-kart Products",
        });
        productImg.push({
          url: result.secure_url,
          public_Id: result.public_id,
        });
      }
    }
    const newProduct = await Product.create({
      userId,
      productDisc,
      productName,
      productPrice,
      brand,
      productImg,
      category,
    });
    return res.status(200).json({
      success: true,
      message: "Product added Succesfull",
      product: newProduct,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(500).json({
        success: false,
        message: "Product is misssing",
        products: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products are here...",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deletProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found..",
      });
    }
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudnairy.uploader.destroy(img.public_Id);
      }
     await Product.findByIdAndDelete(productId)
     return res.status(200).json({
        success:true,
        message:"Product deleted"
     })

    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
