const jwt = require("jsonwebtoken");

const authMiddleware= async(req, res, next) => {
   try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{

        if (err)
            {
                return res.status(401).send({message: "Unauthorized", success: false})
            }else{
                req.userId = decoded.id;
                req.lecturerId = decoded.id;
                next();
            }

})
   }catch(error){
       console.log("error is: ", error);
       return res.status(401).send({message: "Internal server error", success: false})
   }

}



module.exports = authMiddleware;