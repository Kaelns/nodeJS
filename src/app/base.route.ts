import { zodValidate } from '@/middlewares/zodValidate.js';
import { zodValidateQuery } from '@/middlewares/zodValidateQuery.js';
import { ProductsQueryArgs } from '@/shared/zodShema.js';
import express from 'express';
import { z } from 'zod';

const baseRouter = express.Router();

const ApiScheme = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email().min(5),
  data: z.object({
    shippingAddress: z.string(),
    billingAddress: z.string()
  })
});

baseRouter
  .route('/')
  .get(zodValidateQuery(ProductsQueryArgs), (req, res) => {
    console.log(req.query);
    const message = `Server is ongoing on ${process.env.PORT} with ${process.env.PROJECT_KEY} on mode ${process.env.NODE_ENV}`;
    res.status(200).send({ message });
  })
  .post(zodValidate(ApiScheme), (req, res) => {
    console.log(req.body);
    const message = `Server is ongoing on ${process.env.PORT}`;
    res.status(200).send({ message });
  });

export { baseRouter };
