const mongoose=require("mongoose")

const connectToDb = async() => {
      try {
         await mongoose.connect(process.env.MONGO_URI)
         console.log("mongodb running successfully")
      } catch (error) {
        console.error(error)
        process.exit(1)
      }
}

module.exports={connectToDb}