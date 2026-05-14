const mongoose = require("mongoose");

const masterGatewaySchema = new mongoose.Schema(
  {
    name: { type: String },
    user: { type: String },
    colid: { type: Number, required: true },
    gatewayname: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ["Internal", "External"], default: "Internal" },
    externallink: { type: String },
    callbackurl: { type: String },
    status: { type: String, enum: ["Active", "Not active"], default: "Active" },
    default: { type: String, enum: ["Yes", "No"], default: "No" }
  },
  { timestamps: true }
);

masterGatewaySchema.index({ colid: 1, gatewayname: 1 });
masterGatewaySchema.index({ colid: 1, status: 1 });

module.exports = mongoose.models.mastergatewayds || mongoose.model("mastergatewayds", masterGatewaySchema);
