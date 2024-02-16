const UserModel = require('../models/user.model')
const bcrypt = require('bcrypt')

async function findAll(req, res) {
  const { keyword } = req.query
  const query = {}
  if (keyword) query.name, phone = { "$regex": keyword, "$options": "i" }
  try {
    const data = await UserModel.find(query)
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function findSeller(req, res) {
  const id = req.params.id
  try {

    const data = await UserModel.findOne({role: 'ROLE_SELLER'})
    console.log(data)
    if (data) {
      return res.status(200).json(data)
    }

    return res.status(404).json({
      message: 'Not Found',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function findOne(req, res) {
  const id = req.params.id
  try {
    const data = await UserModel.findById(id)
    console.log(data)
    if (data) {
      return res.status(200).json(data)
    }

    return res.status(404).json({
      message: 'Not Found',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function getDetails(req, res) {
  const id = req.user.id
  try {
    const data = await UserModel.findById(id)

    if (data) {
      return res.status(200).json({
        id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone
      }
      )
    }

    return res.status(404).json({
      message: 'Not Found',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function update(req, res) {
  const { email, password, name, phone, role } = req.body
  const user = new UserModel({ email, password, name, phone, role }, { _id: false })
  const { id } = req.params
  try {
    const data = await UserModel.findByIdAndUpdate(id, user)
    return res.status(200).json({
      message: 'Ok',
      data
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

async function deleteOne(req, res) {
  const id = req.params.id
  try {
    await UserModel.findByIdAndDelete(id)
    return res.status(200).json({
      message: 'Ok',
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { findAll, findOne, update, deleteOne, getDetails, findSeller }

