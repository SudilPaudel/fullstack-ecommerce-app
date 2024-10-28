const userSvc = require("./user.service");

class UserController{
    index = async(req,res,next)=>{
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
                  name: new RegExp(req.query.search, "i"),
                  email: new RegExp(req.query.search, "i")
                }
            }
            if (req.query.role) {
              filter = {
                ...filter,
                role: req.query.role
              };
            }

            const data = await userSvc.listAll({
                limit: limit,
                skip: skip,
                filter: filter
            });
            const countData = await userSvc.count({
                filter: filter
            })
            res.json({
                result: data,
                messagae: "User List",
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
}
const userCtrl = new UserController()
module.exports = userCtrl