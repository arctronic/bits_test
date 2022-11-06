import { Product } from "@prisma/client";
import { boolean, number, string } from "zod";
import { databaseClient } from "../../database";

export const productService = {
  createCatelog: async (
    name: string
  ) => {
    return await databaseClient.catelog.create({
      data: {
        name: name
      }
    })
  },

  getProductByCatelog: async (
    catelogId: string
  ) => {
    return await databaseClient.catelog.findUnique({
      where: {
        id: catelogId,
      },
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            imageURL: true,
            isActive: true
          }
        }
      }
    })
  },

  createProduct: async (
    name: string,
    price: number,
    cost: number,
    description: string | undefined,
    hasUnitInfo: boolean,
    unit: string | undefined,
    perUnit: number | undefined,
    imageURL: string | undefined,
    catelogId: string
  ) => {
    const product = await databaseClient.product.create({
      data: {
        name: name,
        price: price,
        cost: cost,
        description: description,
        hasUnitInfo: hasUnitInfo,
        perUnit: perUnit,
        unit: unit,
        imageURL: imageURL,
        catelog: {
          connect: {
            id: catelogId
          }
        }
      }
    })
    return product
  },

  getAllProduct: async () => {
    return await databaseClient.product.findMany({})
  },
  getProductById: async (
    id: string
  ) => {
    return await databaseClient.product.findUnique({
      where: {
        id
      }
    })
  },

  activeStatus: async(
    isActive: boolean,
    productId: string,
  )=>{
    return await databaseClient.product.update({
      where:{
        id:productId,
      },
      data:{
        isActive: isActive
      }
    })
  }
}