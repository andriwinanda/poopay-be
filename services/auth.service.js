const config = require("../auth.config")
const UserModel = require('../models/user.model')
// const UserModel = db.user
// const Role = db.role

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
const { request } = require('express')

// exports.signup = ( req, res ) =>
// {
//   const user = new UserModel( {
//     name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync( req.body.password, 8 )
//   } )

//   user.save( ( err, user ) =>
//   {
//     if ( err )
//     {
//       res.status( 500 ).send( { message: err } )
//       return
//     }

//     if ( req.body.roles )
//     {
//       Role.find(
//         {
//           name: { $in: req.body.roles }
//         },
//         ( err, roles ) =>
//         {
//           if ( err )
//           {
//             res.status( 500 ).send( { message: err } )
//             return
//           }

//           user.roles = roles.map( role => role._id )
//           user.save( err =>
//           {
//             if ( err )
//             {
//               res.status( 500 ).send( { message: err } )
//               return
//             }

//             res.send( { message: "UserModel was registered successfully!" } )
//           } )
//         }
//       )
//     } else
//     {
//       Role.findOne( { name: "user" }, ( err, role ) =>
//       {
//         if ( err )
//         {
//           res.status( 500 ).send( { message: err } )
//           return
//         }

//         user.roles = [ role._id ]
//         user.save( err =>
//         {
//           if ( err )
//           {
//             res.status( 500 ).send( { message: err } )
//             return
//           }

//           res.send( { message: "UserModel was registered successfully!" } )
//         } )
//       } )
//     }
//   } )
// }


exports.signup = async function (req, res) {
  const existingUser = await UserModel.findOne({ email: req.body.email })
  console.log(existingUser)
  if (!existingUser) {
    try {
      const { email, password, name, phone, role } = req.body
      const user = new UserModel({ email, password, name, phone, role })
      user.password = bcrypt.hashSync(req.body.password, 10)
      const data = await user.save()
      return res.status(200).json({
        message: 'Ok',
        data
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  } else {
    return res.status(409).json({ message: 'User already exists' });
  }
}

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
}

exports.signin = (req, res) => {
  UserModel.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' })
    }
    return res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      access_token: jwt.sign({ email: user.email, name: user.name, role: user.role, id: user._id }, config.secret)
    })
  })
  //   UserModel.findOne( {
  //     username: req.body.username
  //   } )
  //     .exec( ( err, user ) =>
  //     {
  //       if ( err )
  //       {
  //         res.status( 500 ).send( { message: err } )
  //         return
  //       }

  //       if ( !user )
  //       {
  //         return res.status( 404 ).send( { message: "UserModel Not found." } )
  //       }

  //       var passwordIsValid = bcrypt.compareSync(
  //         req.body.password,
  //         user.password
  //       )

  //       if ( !passwordIsValid )
  //       {
  //         return res.status( 401 ).send( {
  //           accessToken: null,
  //           message: "Invalid Password!"
  //         } )
  //       }

  //       const token = jwt.sign( { id: user.id },
  //         config.secret,
  //         {
  //           algorithm: 'HS256',
  //           allowInsecureKeySizes: true,
  //           expiresIn: 86400, // 24 hours
  //         } )

  //       var authorities = []

  //       for ( let i = 0; i < user.roles.length; i++ )
  //       {
  //         authorities.push( "ROLE_" + user.roles[ i ].name.toUpperCase() )
  //       }
  //       res.status( 200 ).send( {
  //         id: user._id,
  //         name: user.name,
  //         email: user.email,
  //         accessToken: token
  //       } )
  //     } )
}