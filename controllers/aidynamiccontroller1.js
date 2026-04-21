const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// const fees=require('./../Models/fees');


exports.bulkuploadtblds = async (req, res) => {
  try {
    // const allowedCollections = {
    //   fees: 'fees',
    //   studalloc1: 'studalloc1'
    // };

    // const modelMap = {
    //   fees,
    //   studalloc1
    // };

    const { collection, data } = req.body;

    // Validate collection name
    if (!collection) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid or missing collection name'
      });
    }

    // Validate data array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Data must be a non-empty array'
      });
    }

    // // Map to model
    // const modelName = allowedCollections[collection];
    // const Model = modelMap[modelName];

    // if (!Model) {
    //   return res.status(400).json({
    //     status: 'Failed',
    //     message: 'Model not found for collection'
    //   });
    // }

    // Validate each record has required fields (name, user, colid)
    const errors = [];
    data.forEach((record, index) => {
      if (!record.name) errors.push(`Record ${index + 1}: missing 'name'`);
      if (!record.user) errors.push(`Record ${index + 1}: missing 'user'`);
      if (!record.colid) errors.push(`Record ${index + 1}: missing 'colid'`);
    });

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Validation errors',
        errors: errors
      });
    }

    // const full = path.join('./../Models', collection);
    const full1='./../Models/' + collection;
    //console.log(full1);

    const Model=require(full1);

    // const Model = mongoose.model(collection);

    // Fixed: insertMany (capital M)
    const result = await Model.insertMany(data);

    // const result = await collection.insertMany(data);
    //console.log(result);

    return res.status(200).json({
      status: 'Success',
      message: `${result.length} records inserted successfully`,
      insertedCount: result.length,
      data: {
        classes: result
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Failed',
      message: error.message || 'Bulk upload failed',
      error: error.toString()
    });
  }
};


// Bulk Update with upsert: true
exports.bulkupdatetblds = async (req, res) => {
  try {
    // const allowedCollections = {
    //   fees: 'fees',
    //   studalloc1: 'studalloc1'
    // };

    // const modelMap = {
    //   fees,
    //   studalloc1
    // };

    const { collection, data } = req.body;

    // Validate collection name
    if (!collection) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid or missing collection name'
      });
    }

    // Validate data array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Data must be a non-empty array'
      });
    }

    // // Map to model
    // const modelName = allowedCollections[collection];
    // const Model = modelMap[modelName];

    // if (!Model) {
    //   return res.status(400).json({
    //     status: 'Failed',
    //     message: 'Model not found for collection'
    //   });
    // }

    // Validate each record has required id field for update
    const errors = [];
    data.forEach((record, index) => {
      if (!record._id && !record.id) {
        errors.push(`Record ${index + 1}: missing '_id' or 'id' for update`);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Validation errors - id is mandatory for update',
        errors: errors
      });
    }

    // Perform bulk update with upsert
    const bulkOps = data.map(record => ({
      updateOne: {
        filter: { _id: record._id || record.id },
        update: { $set: record },
        upsert: true
      }
    }));

    const full1='./../Models/' + collection;
    //console.log(full1);

    const Model=require(full1);

    const result = await Model.bulkWrite(bulkOps);

    return res.status(200).json({
      status: 'Success',
      message: `Bulk update completed`,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      upsertedCount: result.upsertedCount,
      data: {
        result
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Failed',
      message: error.message || 'Bulk update failed',
      error: error.toString()
    });
  }
};

// Bulk Delete
exports.bulkdeletetblds = async (req, res) => {
  try {
    // const allowedCollections = {
    //   fees: 'fees',
    //   studalloc1: 'studalloc1'
    // };

    // const modelMap = {
    //   fees,
    //   studalloc1
    // };

    const { collection, data } = req.body;

    // Validate collection name
    if (!collection) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid or missing collection name'
      });
    }

    // Validate data array
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Data must be a non-empty array with ids'
      });
    }

    // // Map to model
    // const modelName = allowedCollections[collection];
    // const Model = modelMap[modelName];

    // if (!Model) {
    //   return res.status(400).json({
    //     status: 'Failed',
    //     message: 'Model not found for collection'
    //   });
    // }

    // Validate each record has id field
    const errors = [];
    const ids = [];
    
    data.forEach((record, index) => {
      const id = record._id || record.id;
      if (!id) {
        errors.push(`Record ${index + 1}: missing '_id' or 'id' for delete`);
      } else {
        ids.push(id);
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Validation errors - id is mandatory for delete',
        errors: errors
      });
    }

    const full1='./../Models/' + collection;
    //console.log(full1);

    const Model=require(full1);

    // Perform bulk delete
    const result = await Model.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      status: 'Success',
      message: `${result.deletedCount} records deleted successfully`,
      deletedCount: result.deletedCount,
      data: {
        result
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Failed',
      message: error.message || 'Bulk delete failed',
      error: error.toString()
    });
  }
};
