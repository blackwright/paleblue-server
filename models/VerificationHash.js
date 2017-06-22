const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

let VerificationHashSchema = new Schema({
  verificationHash: { type: String },
  user: { type: Schema.Types.ObjectId },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: "3d"
  }
});

VerificationHashSchema.virtual("hash").set(function(value) {
  this.verificationHash = bcrypt.hashSync(
    `${value}${process.env.VERIFICATION_HASH_SECRET}`
  );
});

var VerificationHash = mongoose.model(
  "VerificationHash",
  VerificationHashSchema
);

module.exports = VerificationHash;
