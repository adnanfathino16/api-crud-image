import mongoose from "mongoose";
import barangModel from "./barangModel.js";
import userModel from "./userModel.js";
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.barang = barangModel(mongoose);
db.users = userModel(mongoose);

export default db;
