const { Router } = require('express');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validator');
const { validateJWT } =  require('../middlewares/validate-jwt');
const router = Router();

const { createUser, loginUser, revalidToken } = require('../controllers/auth');




router.post(
        '/new',
        [ 
            check('name', 'Nombre es obligatorio').not().isEmpty(),
            check('email', 'Email es obligatorio').isEmail(),
            check('password', 'Password debe tener mas de 6 caracteres').isLength({ min: 6 }),
            fieldsValidate
        
        ], 
        createUser
);

router.post(
        '/',
        [ 
            check('email', 'Email es obligatorio').isEmail(),
            check('password', 'Password debe tener mas de 6 caracteres').isLength({ min: 6 }),
            fieldsValidate


        ], 
        loginUser 
);

router.get(
        '/renew',
         validateJWT,
         revalidToken 
         
         );

module.exports = router;
