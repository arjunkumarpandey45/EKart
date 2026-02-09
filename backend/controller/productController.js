const addProduct = async (req, res) => {
    try {
        const { productName, productDisc, productPrice, category, brand } = req.body
        if (!productDisc || !productName || !productPrice || !category || !brand) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const productImg=[]
        if(req.file&& req.file.length>0){

        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message

        })
    }
}