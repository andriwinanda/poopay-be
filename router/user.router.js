const express = require( 'express' )

const {findAll, findOne, findSeller, update, deleteOne, getDetails} = require( '../services/user.service' )

const routes = express.Router()
routes.get( '/', findAll)
routes.get( '/detail/:id', findOne )
routes.get( '/seller', findSeller )
routes.get( '/details', getDetails )
routes.put( '/:id', update )
routes.delete( '/:id', deleteOne )

module.exports = routes