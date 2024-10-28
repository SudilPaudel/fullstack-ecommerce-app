const brandSvc = require("./brand.service");

class BrandController {
    createBrand = async(req, res, next)=>{
        try{
            const payload = brandSvc.transformCreateData(req)
            const createdBrand = await brandSvc.store(payload)
            res.json({
                result: createdBrand,
                message: "Brand Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    brandList = async(req, res, next)=>{
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

            const data = await brandSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await brandSvc.count({
                filter: filter
            })
            res.json({
                result: data,
                messagae: "Brand List",
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
            const detail = await brandSvc.findOne({_id: req.params.id})
            res.json({
                result: detail,
                messagae: "Brand Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    update = async (req,res,next) =>{
        try{
            const existingData = await brandSvc.findOne({
                _id: req.params.id
            })
            const payload = brandSvc.transformUpdateData(req, existingData);
            const updateStatus = await brandSvc.update({_id: req.params.id}, payload)
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
            const exists = await brandSvc.findOne({_id: req.params.id})
            const status= await brandSvc.deleteOne({_id: req.params.id})
            res.json({
                result: status,
                message: "Brand deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome= async(req,res,next)=>{
        try{
            const homeList = await brandSvc.getForHome()
            res.json({
                result: homeList,
                messagae: "Brand List Fetched Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

const brandCtrl = new BrandController()
module.exports = brandCtrl;