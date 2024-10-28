const productSvc = require("./product.service");

class productController {
    createProduct = async(req, res, next)=>{
        try{
            const payload = await productSvc.transformCreateData(req);
            const createdProduct = await productSvc.store(payload);

      res.json({
        result: createdProduct,
        message: "Product Created Successfulll",
        meta: null,
      });
        }catch(exception){
            next(exception)
        }
    }
    productList = async(req, res, next)=>{
        try{
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page-1) * limit;
            //1-100 per page 15 data 
            //1-15 ===> page 1 
            //16-30 ===>page 2
            //31-45 ===> page 3
            let filter = {}
            const loggedInUser = req.authUser
            //search
            if(req.query.search){
                filter = {
                    title: new RegExp(req.query.search, "i")
                }
            }
            if(loggedInUser.role === "seller"){
                filter = {
                    ...filter,
                    sellerId: loggedInUser._id
                }
            }

            const data = await productSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await productSvc.count({
                filter: filter
            })
            res.json({
                result: data,
                messagae: "product List",
                meta: {
                    limit: limit,
                    page: page,
                    total: countData
                }
            })
        }catch(exception){
            next(exception) 
        }
    }
    showById = async(req,res, next)=>{
        try{
            const loggedInUser = req.authUser
            let filter = {
                _id: req.params.id
            }
            if (loggedInUser.role === "seller"){
                fliter= {
                    ...filter,
                    sellerId: loggedInUser._id
                }
            }
            const detail = await productSvc.findOne(filter)
            res.json({
                result: detail,
                messagae: "product Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    update = async (req, res, next) => {
        try {
          const loggedInUser = req.authUser
          let filter = {
            _id: req.params.id,
          }
          if(loggedInUser.role ==='seller'){
            filter = {
              ...filter,
              sellerId: loggedInUser._id
            }
          }
          const existingData = await productSvc.findOne(filter);
          const payload = await productSvc.transformUpdateData(req, existingData);
          const updateStatus = await productSvc.update(
            { _id: req.params.id },
            payload
          );
          
          res.json({
            result: updateStatus,
            message: "Data updated",
            meta: null,
          });
        } catch (exception) {
          next(exception);
        }
      };
    delete =  async (req,res,next)=>{
        try{
            const loggedInUser = req.authUser
            let filter = {
                _id: req.params.id
            }
            if (loggedInUser.role === "seller"){
                fliter= {
                    ...filter,
                    sellerId: loggedInUser._id
                }
            }
            const exists = await productSvc.findOne(filter)
            const status= await productSvc.deleteOne(filter)
            res.json({
                result: status,
                message: "product deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome= async(req,res,next)=>{
        try{
            const homeList = await productSvc.getForHome()
            res.json({
                result: homeList,
                messagae: "product List Fetched Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    getProductDetailBySlug = async(req,res,next)=>{
        try{
            const slug = req.params.slug
            const filter = {
                slug: slug,
                status: "active"
            }
            const productDetail = await productSvc.findOne(filter)
            const relatedField = {
                categories: {$in: productDetail.categories},
                _id: {$ne: productDetail._id},
                status: "active"
            }
            const relatedProduct = await productSvc.listAll({limit: 12,skip:0 , filter: relatedField})
            res.json({
                result: {
                    detail: productDetail, 
                    relatedProduct: relatedProduct
                },
                message: "Product Detail fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

const productCtrl = new productController()
module.exports = productCtrl;