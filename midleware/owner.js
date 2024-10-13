import User from "../models/usermodel.js";

const isOwner = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.role !== 'owner') {
      return res.status(403).json({ status: 'fail', message: 'User is not authorized to access this resource' });
    }
    next();
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

export default isOwner;