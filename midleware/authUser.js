import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const auth = async (req, res, next) => {
  try {
    const authHeaders=req.headers["authorization"];
    let token
    if(authHeaders!==undefined)
    {
      token=authHeaders.split(" ")[1];
    }
    if(token===undefined){
      return res.status(400).json({status:'fail',messsage:"invalid token"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const {_id}=decoded;


    req.user = await User.findById(_id);  // Attach user to req object
    next();
  } catch (error) {
    res.status(401).json({ status: 'fail', message: 'Please authenticate' });
  }
};

export default auth;
