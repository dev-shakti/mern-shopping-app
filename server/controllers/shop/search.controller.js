const Product=require("../../models/product.model")


const searchProducts = async(req,res) => {
    try {
        const {keyword}=req.params

        if(!keyword || typeof keyword !=="string"){
            return res.status(404).json({
                success: false,
                message: "Keyword is required and must be in string format",
              });
        }

        const regEx = new RegExp(keyword, "i");

        const createSearchQuery = {
            $or: [
              { title: regEx },
              { description: regEx },
              { category: regEx },
              { brand: regEx },
            ],
          };

        const searchResults=await Product.find({createSearchQuery})

        return res.status(200).json({
            success: true,
            data: searchResults,
          });
    } catch (error) {
        console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    }
}

module.exports={searchProducts}