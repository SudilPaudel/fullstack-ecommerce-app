const { response } = require("express");
const bannerModel = require("./banner.model");
const e = require("express");

class BannerService {
        transformCreateData = (req)=>{
           try{
            const data = {
                ...req.body
            }
            if(!req.file){
                throw({code: 400, message: "Image is required"})
            }else{
                data.image = req.file.filename;
            }

            data.createdBy = req.authUser._id;
            
            return data
           }catch(exception){
            throw exception
           }
        }
        store = async(data)=>{
            try{
                const banner = new bannerModel(data)
                return await banner.save()
            }catch(exception){
                throw exception
            }
        }
        count = async({filter})=>{
            try{
                const countData = await bannerModel.countDocuments(filter)
                return countData;
            }catch(exception){
                throw exception
            }
        }
        listAll = async({limit, skip, filter={}}) =>{
            try{
                const response = await bannerModel.find(filter)
                    .sort({_id: "desc"})
                    .skip(skip)
                    .limit(limit)
                return response
            }catch(exception){
                throw exception
            }
        }
        findOne = async (filter) => {
            try{
                const data = await bannerModel.findOne(filter)
                if(!data){
                    throw {code: 400, message: "Data Not Found"}
                }return data
            }catch(exception){
                throw exception
            }
        }
        transformUpdateData = (req, existingData) => {
            const data = {
                ...req.body
            }
            console.log("file", req.file)
    
            if(req.file){
                data.image = req.file.filename;
            }else{
                data.image = existingData.image
            }
            data.updateBy = req.authUser._id;
    
            return data;
        }
        
        update = async(filter, data)=> {
            try{
                const updateResponse = await bannerModel.findOneAndUpdate(filter, {$set: data})
                return  updateResponse
            }catch(exception){
                throw exception
            }
        }
        deleteOne = async(filter)=>{
            try{
                const response = await bannerModel.findOneAndDelete(filter)
            if(!response){
                throw {code: 404, message: "banner doesnt  exists"}
            }
            return  response
            }catch(exception){
                throw exception
            }
        }
        getForHome = async ()=>{
            try{
                const data = bannerModel.find({
                    status: "active"
                })
                .sort({_id: "desc"})
                .limit(10)
                return data
            }catch(exception){
                throw(exception)
            }
        }
}

const bannerSvc = new BannerService()

module.exports = bannerSvc
