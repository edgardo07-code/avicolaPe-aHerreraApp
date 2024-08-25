import express from "express";
import { getCustomers, addCustomer, updateCustomer, deleteCustomer } from "../controllers/customer.js";

const router = express.Router()

router.get("/", getCustomers)
router.post("/", addCustomer)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)


export default router