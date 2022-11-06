import { string, z } from "zod";

export const productSchema = {
  createProductSchema: z.object({
    body: z.object({
      data: z.object({
        product: z.object({
          name: z.string(),
          price: z.number(),
          cost: z.number(),
          description: z.string().optional(),
          hasUnitInfo: z.boolean(),
          unit: z.string().optional(),
          perUnit: z.number().optional(),
          imageURL: z.string().optional(),
          catelogId: z.string()
        })
      })
    })
  }),
  createCatelogSchema: z.object({
    body: z.object({
      data: z.object({
        catelog: z.object({
          name: z.string(),
        })
      })
    })
  }),
  updateProductSchema: z.object({
    body: z.object({
      data: z.object({
        product: z.object({
          isActive: z.boolean(),
          id: z.string()
        })
      })
    })
  })
}
export type CreateProductBody = z.infer<typeof productSchema.createProductSchema>["body"];
export type CreateCatelogBody = z.infer<typeof productSchema.createCatelogSchema>["body"];
export type UpdateProductBody = z.infer<typeof productSchema.updateProductSchema>["body"];