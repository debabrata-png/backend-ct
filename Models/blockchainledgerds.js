const mongoose = require("mongoose");

const blockchainLedgerSchema = new mongoose.Schema(
  {
    colid: { type: Number, required: true, index: true },
    blockindex: { type: Number, required: true },
    modelname: { type: String, required: true, trim: true, index: true },
    collectionname: { type: String, trim: true, default: "" },
    recordid: { type: String, trim: true, default: "", index: true },
    action: { type: String, trim: true, default: "CREATE" },
    payload: { type: mongoose.Schema.Types.Mixed, default: {} },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
    datahash: { type: String, required: true, trim: true },
    previoushash: { type: String, required: true, trim: true },
    hash: { type: String, required: true, trim: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    user: { type: String, trim: true, default: "" },
    status: { type: String, trim: true, default: "Active" }
  },
  { timestamps: true }
);

blockchainLedgerSchema.index({ colid: 1, blockindex: 1 }, { unique: true });
blockchainLedgerSchema.index({ colid: 1, modelname: 1, recordid: 1 });

module.exports = mongoose.model("blockchainledgerds", blockchainLedgerSchema);
