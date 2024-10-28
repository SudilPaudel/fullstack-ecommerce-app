
const slugify = require("slugify");
const productModel = require("./product.model");


class ProductService {
    uniqueSlug = async (slug) => {
        try {
            const productExists = await productModel.findOne({
                slug: slug
            })
            if (productExists) {
                const time = Date.now();
                slug = slug + "-" + time;
                return await this.uniqueSlug(slug)


            } else {
                // product is unique
                return slug
            }
        } catch (exception) {
            throw exception
        }
    }
    transformCreateData = async (req) => {
        try {
            const data = {
                ...req.body
            }


            if (req.files) {
                let images = [];

                req.files.map((image) => {
                    images.push(image.filename)
                })
                data.images = images;
            } else {
                data.images = null;
            }
            //slugify function
            let slug = slugify(data.title, {
                lower: true
            })
            slug = await this.uniqueSlug(slug)
            data.slug = slug

            //After Discount calculation
            data.afterDiscount = data.price - (data.price * data.discount) / 100
            //brand set if null;
            if (data.brand === 'null' || data.brand === "" || !data.brand) {
                data.brand = null;
            }

            if (data.sellerID === 'null' || data.sellerId === "" || !data.sellerId) {
                data.sellerId = null;
            }

            if (data.categories === 'null' || data.categories === "" || !data.categories) {
                data.brand = null;
            }

            if (req.authUser.role === 'seller') {
                data.sellerId = req.authUser._id
                data.status = 'inactive';
            }
            data.createdBy = req.authUser._id;

            return data;
        } catch (exception) {
            throw exception
        }
    }
    store = async (data) => {
        try {
            const product = new productModel(data)
            return await product.save()
        } catch (exception) {
            throw exception
        }
    }
    count = async ({ filter }) => {
        try {
            const countData = await productModel.countDocuments(filter)
            return countData;
        } catch (exception) {
            throw exception
        }
    }
    listAll = async ({ limit, skip, filter = {} }) => {
        try {
            const response = await productModel.find(filter)
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"])
                .sort({ _id: "desc" })
                .skip(skip)
                .limit(limit)
            
            return response
        } catch (exception) {
            throw exception
        }
    }
    findOne = async (filter) => {
        
        try{
            const data = await productModel.findOne(filter)
            .populate("sellerId", ["_id","email","role"])
            .populate("createdBy", ["_id","email","role"])
            .populate("updatedBy", ["_id","email","role"])
            if(!data){
                console.log("I am here", data)
                throw {code: 400, message: "Data Not Found"}

            }
            
            return data
        }catch(exception){
            throw exception
        }
    }
    
    transformUpdateData = async (req, existingData) => {
        try{
            const data = {
                ...req.body
            }
            
    
            let images = [...existingData.images];
            if(req.files){
                
    
                req.files.map((image) => {
                    images.push(image.filename)
                })
            }
            data.images = images;
        
            //After Discount calculation
            data.afterDiscount = data.price - (data.price * data.discount)/100
            //brand set if null;
            if(data.brand === 'null' || data.brand === "" || !data.brand){
                data.brand = null;
            }
    
            if(data.sellerID === 'null' || data.sellerId === "" || !data.sellerId){
                data.sellerId = null;
            }
    
            if(data.categories=== 'null' || data.categories=== "" || !data.categories){
                data.categories = null;
            }
    
            data.updatedBy = req.authUser._id;
    
            return data;
        }catch(exception){
            throw exception
        }
    }

    update = async(filter, data)=> {
        try{
            
            const updateResponse = await productModel.findOneAndUpdate(filter, {$set: data})
            return  updateResponse
        }catch(exception){
            throw exception
        }
    }
    deleteOne = async (filter) => {
        try {
            const response = await productModel.findOneAndDelete(filter)
            if (!response) {
                throw { code: 404, message: "product doesnt  exists" }
            }
            return response
        } catch (exception) {
            throw exception
        }
    }
    getForHome = async () => {
        try {
            const data = productModel.find({
                status: "active"
            })
                
                .populate("sellerId", ["_id", "name", "email", "role"])
                .populate("createdBy", ["_id", "name", "email", "role"])
                .populate("updatedBy", ["_id", "name", "email", "role"])
                .sort({ _id: "desc" })
                .limit(10)
            return data
        } catch (exception) {
            throw (exception)
        }
    }
}

const productSvc = new ProductService()

module.exports = productSvc
