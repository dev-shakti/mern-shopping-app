const jwt = require("jsonwebtoken");

const isAutheticated = async(req,res,next) => {
  try {
      // Retrieve the token from cookies
    const token=req.cookies.token

    // Check if the token exists
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Authorization token is required"
        })
    }
    
     // Verify and decode the token using the secret key
    const decoded=jwt.verify(token,process.env.JWT_SECRET)

     // If decoding fails, return an unauthorized error
    if(!decoded){
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        })
    }
    
     // Attach the decoded user information to the request object
    req.user=decoded

    // Allow the request to proceed to the next middleware or route
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({
        success:false,
        message:"Invalid or expired token"
    })
  }
}

module.exports={isAutheticated}