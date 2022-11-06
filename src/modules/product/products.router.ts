import { Router } from "express";
import { productController } from "./products.controller";
export const productRouter = Router();

productRouter.post("/api/product", productController.createProduct)
productRouter.put("/api/product/id/", productController.updateProductStatus)
productRouter.get("/api/product/id/", productController.getAllProductById)
productRouter.get("/api/product", productController.getAllProductList)


productRouter.post("/api/catelog", productController.createCatelog)
productRouter.get("/api/catelog/id/", productController.productfromCatelog)
