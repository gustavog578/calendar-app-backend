const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldsValidate =  ( req, res = response, next ) => {

    //error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    next();

}


module.exports = {
    fieldsValidate
}