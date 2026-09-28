import express from "express"
import {createProduct, getProducts, getProductById, deleteProduct, updateProduct, productsByCat, searchProducts} from "../controllers/ProductController.js"


const ProductRoutes = express.Router() 

ProductRoutes.post("/", createProduct)
ProductRoutes.get("/", getProducts)
ProductRoutes.get("/category", productsByCat)
ProductRoutes.get("/search", searchProducts)
ProductRoutes.get("/:id", getProductById)
ProductRoutes.delete("/:id", deleteProduct)
ProductRoutes.patch("/:id", updateProduct)


export default ProductRoutes
