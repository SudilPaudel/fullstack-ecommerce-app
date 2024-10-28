const productSvc = require("../product/product.service");
const categorySvc = require("./category.service");

class CategoryController {
    createCategory = async(req, res, next)=>{
        try{
            const payload = categorySvc.transformCreateData(req)
            const createdCategory = await categorySvc.store(payload)
            res.json({
                result: createdCategory,
                message: "Category Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    categoryList = async(req, res, next)=>{
        try{
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page-1) * limit;
            //1-100 per page 15 data 
            //1-15 ===> page 1 
            //16-30 ===>page 2
            //31-45 ===> page 3

            let filter = {}
            //search
            if(req.query.search){
                filter = {
                    title: new RegExp(req.query.search, "i")
                }
            }

            const data = await categorySvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await categorySvc.count({
                filter: filter
            })
            res.json({
                result: data,
                messagae: "Category List",
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
            const detail = await categorySvc.findOne({_id: req.params.id})
            res.json({
                result: detail,
                messagae: "Category Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    update = async (req,res,next) =>{
        try{
            const existingData = await categorySvc.findOne({
                _id: req.params.id
            })
            const payload = categorySvc.transformUpdateData(req, existingData);
            const updateStatus = await categorySvc.update({_id: req.params.id}, payload)
            res.json({
                result: updateStatus,
                message: "Data updated",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    delete =  async (req,res,next)=>{
        try{
            const exists = await categorySvc.findOne({_id: req.params.id})
            const status= await categorySvc.deleteOne({_id: req.params.id})
            res.json({
                result: status,
                message: "Category deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome= async(req,res,next)=>{
        try{
            const homeList = await categorySvc.getForHome()
            res.json({
                result: homeList,
                messagae: "Category List Fetched Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    getDetailBySlug = async(req,res,next)=>{
        try{
            const  slug = req.params.slug;
            const  detail = await categorySvc.findOne({
                slug: slug,
                status: "active"
            });
            const page = +req.query.page || 1;
            const limit = +req.query.limit || 15;
            const skip = (page -1) * limit;


            let filter = {
                status: "active",
                categories: {$in: [detail._id]}
            }
            if(req.query.search){
                //search = category
                filter = {
                    ...filter,
                    title: new RegExp(req.query.search, "i"),
                    summary: new RegExp(req.query.search, "i"),
                    description: new RegExp(req.query.search, "i"),
                }
            }
            //1 - 100 datas 
            //per page 15 data
            const total= await productSvc.count(filter)
            const relatedProducts = await productSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            })
            res.json({
            result:  {
                catDetail: detail,
                productList: relatedProducts
            },
            message: "Product List by Category slug",
            meta:{
                page: page,
                limit:  limit,
                totalcount: total
            }
            })
        }catch(exception){
            next(exception)
        }
    }
}

const categoryCtrl = new CategoryController()
module.exports = categoryCtrl;

//May3 dekhi start
