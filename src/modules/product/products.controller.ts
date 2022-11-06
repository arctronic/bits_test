import { Catelog, Product } from "@prisma/client";
import { Request, Response } from "express";
import { CreateCatelogBody, CreateProductBody, UpdateProductBody } from "./products.schema";
import { productService } from "./products.service";

export const productController = {
  createProduct: async (
    req: Request<{}, {}, CreateProductBody>,
    res: Response) => {
    let product: Product | null = null;
    const { name, price, cost, description, hasUnitInfo, unit, perUnit, imageURL, catelogId } = req.body.data.product
    try {
      product = await productService.createProduct(name, price, cost, description, hasUnitInfo, unit, perUnit, imageURL, catelogId)
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      product: product
    })
  },
  getAllProductList: async (
    req: Request,
    res: Response
  ) => {
    let products: Product[] | [];
    try {
      products = await productService.getAllProduct()
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      products: products
    })
  },
  getAllProductById: async (
    req: Request,
    res: Response
  ) => {
    const { productId } = req.query
    let product: Product | null = null;
    try {
      product = await productService.getProductById(productId as string)
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      product: product
    })
  },

  createCatelog: async (
    req: Request<{}, {}, CreateCatelogBody>,
    res: Response
  ) => {
    const name = req.body.data.catelog.name;
    let catelog: Catelog | null = null
    try {
      catelog = await productService.createCatelog(name)
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      catelog: catelog
    })
  },
  productfromCatelog: async (
    req: Request,
    res: Response
  ) => {
    const {catelogId} = req.query
    let catelog: Catelog | null = null
    try {
      catelog = await productService.getProductByCatelog(catelogId as string)
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      catelog: catelog
    })
  },

  updateProductStatus: async(
    req: Request<{},{},UpdateProductBody>,
    res: Response
  )=>{
    const {isActive,id} = req.body.data.product
    let product: Product | null = null;

    try {
      product = await productService.activeStatus(isActive,id)
    } catch (err) {
      console.log(err)
      return res.status(400)
    }
    return res.status(200).json({
      product: product
    })
  }
}