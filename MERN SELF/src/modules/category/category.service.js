
const slugify = require("slugify");
const categoryModel = require("./category.model");


class CategoryService {
        transformCreateData = (req)=>{
           try{
            const data = {
                ...req.body
            }
            if(req.file){
                data.image = req.file.filename;
            }
            data.slug = slugify(data.title, {
                lower: true
            })

            if(!data.parentId || data.parentId === "null" || data.parentId === ""){
                data.parentId = null;
            }
            data.createdBy = req.authUser._id;
            
            return data
           }catch(exception){
            throw exception
           }
        }
        store = async(data)=>{
            try{
                const category = new categoryModel(data)
                return await category.save()
            }catch(exception){
                throw exception
            }
        }
        count = async({filter})=>{
            try{
                const countData = await categoryModel.countDocuments(filter)
                return countData;
            }catch(exception){
                throw exception
            }
        }
        listAll = async({limit, skip, filter={}}) =>{
            try{
                const response = await categoryModel.find(filter)
                    .populate("parentId", ["_id","title","slug"])
                    .populate("createdBy", ["_id","name","email","role"])
                    .populate("updatedBy", ["_id","name","email","role"])
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
                const data = await categoryModel.findOne(filter)
                    .populate("parentId", ["_id","title","slug"])
                    .populate("createdBy", ["_id","name","email","role"])
                    .populate("updatedBy", ["_id","name","email","role"])
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
            if(!data.parentId || data.parentId === "null" || data.parentId === ""){
                data.parentId = null;
            }
            data.updatedBy = req.authUser._id;
    
            return data;
        }
        
        update = async(filter, data)=> {
            try{
                const updateResponse = await categoryModel.findOneAndUpdate(filter, {$set: data})
                return  updateResponse
            }catch(exception){
                throw exception
            }
        }
        deleteOne = async(filter)=>{
            try{
                const response = await categoryModel.findOneAndDelete(filter)
            if(!response){
                throw {code: 404, message: "category doesnt  exists"}
            }
            return  response
            }catch(exception){
                throw exception
            }
        }
        getForHome = async ()=>{
            try{
                const data = categoryModel.find({
                    status: "active"
                })
                .populate("parentId", ["_id","title","slug"])
                .populate("createdBy", ["_id","name","email","role"])
                .populate("updatedBy", ["_id","name","email","role"])
                .sort({_id: "desc"})
                .limit(10)
                return data
            }catch(exception){
                throw(exception)
            }
        }
}

const categorySvc = new CategoryService()

module.exports = categorySvc
