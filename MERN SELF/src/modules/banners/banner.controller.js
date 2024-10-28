const bannerSvc = require("./banner.service");

class BannerController {
    createBanner = async(req, res, next)=>{
        try{
            const payload = bannerSvc.transformCreateData(req)
            const createdBanner = await bannerSvc.store(payload)
            res.json({
                result: createdBanner,
                message: "Banner Created Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    bannerList = async(req, res, next)=>{
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

            const data = await bannerSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await bannerSvc.count({
                filter: filter
            })
            res.json({
                result: data,
                messagae: "Banner List",
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
            const detail = await bannerSvc.findOne({_id: req.params.id})
            res.json({
                result: detail,
                messagae: "Banner Detail Fetched",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    update = async (req,res,next) =>{
        try{
            const existingData = await bannerSvc.findOne({
                _id: req.params.id
            })
            const payload = bannerSvc.transformUpdateData(req, existingData);
            const updateStatus = await bannerSvc.update({_id: req.params.id}, payload)
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
            const exists = await bannerSvc.findOne({_id: req.params.id})
            const status= await bannerSvc.deleteOne({_id: req.params.id})
            res.json({
                result: status,
                message: "Banner deleted successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
    listForHome= async(req,res,next)=>{
        try{
            const homeList = await bannerSvc.getForHome()
            res.json({
                result: homeList,
                messagae: "Banner List Fetched Successfully",
                meta: null
            })
        }catch(exception){
            next(exception)
        }
    }
}

const bannerCtrl = new BannerController()
module.exports = bannerCtrl;