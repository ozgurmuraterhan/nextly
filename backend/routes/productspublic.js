const router = require("express").Router();
const mongoose = require('mongoose');

const passport = require("passport");
let Products = require("../models/products.model");

const title = "Products";

// get all items

router.route("/:seo").get((req, res, next) => {
   Products.aggregate([
      {
         $match: {
            seo: req.params.seo

         }

      },


      {
         $lookup:
         {
            from: "productimages",
            localField: "_id",
            foreignField: "product_id",
            as: "allImages"
         }
      },
      {
         $lookup:
         {
            from: "categories",
            localField: "categories_id",
            foreignField: "_id",
            as: "categories_id"
         }
      },
      {
         $lookup:
         {
            from: "brands",
            localField: "brands_id",
            foreignField: "_id",
            as: "brands_id"
         }
      }



   ])
      .then((data) => {
         res.json(data);
      })
      .catch((err) =>
         res.json({
            messagge: "Error: " + err,
            variant: "error",
         })
      );
})


router.route("/").post((req, res, next) => {

   function functionReplaceObjectID(key, data) {
      const newData = []
      data.map(val => {
         const keyAndData = {}
         keyAndData[key] = mongoose.Types.ObjectId(val)
         newData.push(keyAndData)
      })
      return newData
   }

   const brandsMongo = req.body.brands.length > 0 ? {
      $or: functionReplaceObjectID("brands_id", req.body.brands)
   } : {}

   const skipMongo = req.body.skip != 0 ? {
      $skip: req.body.skip
   } : { $skip: 0 }

   const limitMongo = req.body.limit != 0 ? {
      $limit: req.body.limit
   } : { $limit: 50 }

   const sortMongo = typeof req.body.sort === "object" ? {
      $sort: req.body.sort
   } : { $sort: { updatedAt: 1 } }

   const categoriesMongo = req.body.categories.length > 0 ? {
      $or: functionReplaceObjectID("categories_id", req.body.categories)
   } : {}

   const textMongo = req.body.text != "" ? {
      $text: {
         $search: `"\"${req.body.text}"\"`
      }
   } : {}


   const mongoPost = [
      {
         $match: {

            $and: [

               categoriesMongo,
               brandsMongo,
               textMongo,

               { isActive: true },
               {
                  $or: [{
                     price: {
                        $gte: req.body.minPrice == null || req.body.minPrice == 0 ? 1 : req.body.minPrice,
                        $lte: req.body.maxPrice == null || req.body.maxPrice == 0 ? 1000000000000000000000000000 : req.body.maxPrice
                     }
                  },
                  {
                     $and: [
                        { "variant_products.visible": true },

                        {
                           "variant_products.price": {
                              $gte: req.body.minPrice == null || req.body.minPrice == 0 ? 1 : req.body.minPrice,
                              $lte: req.body.maxPrice == null || req.body.maxPrice == 0 ? 1000000000000000000000000000 : req.body.maxPrice
                           }
                        },
                     ]
                  }

                  ],

               },

            ]
         }

      },
      skipMongo,
      limitMongo,
      sortMongo,

      {
         $lookup:
         {
            from: "productimages",
            localField: "_id",
            foreignField: "product_id",
            as: "allImages"
         }
      }

   ]

   Products.aggregate(mongoPost)
      .then((data) => {
         res.json(data);
      })
      .catch((err) =>
         res.json({
            messagge: "Error: " + err,
            variant: "error",
         })
      );

});

module.exports = router;