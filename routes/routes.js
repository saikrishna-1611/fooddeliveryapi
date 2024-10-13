import {register,login,createRestaurant,getRestaurant,getAllRestaurants,addItem,getMenu,placeOrder} from "../controllers/controller.js";
import express from "express";
import isOwner from "../midleware/owner.js";
import auth from "../midleware/authUser.js"
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.post('/create-restaurant',auth,createRestaurant)
router.get('/get-restaurant',getRestaurant)
router.get('/get-all-restaurants',getAllRestaurants)
router.post('/addItem',auth,isOwner,addItem)
router.get('/get-menu',getMenu)
router.post('place-order',placeOrder)
// router.get('/get-user-orders',getUserOrders)

export default router