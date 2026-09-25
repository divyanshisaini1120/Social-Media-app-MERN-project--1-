import express from "express"
import {createProduct, getProducts, getProductById, deleteProduct, updateProduct} from "../controllers/ProductController.js"


const ProductRoutes = express.Router() 

ProductRoutes.post("/", createProduct)
ProductRoutes.get("/", getProducts)
ProductRoutes.get("/:id", getProductById)
ProductRoutes.delete("/:id", deleteProduct)
ProductRoutes.patch("/:id", updateProduct)

export default ProductRoutes
