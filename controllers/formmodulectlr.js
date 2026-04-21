const User = require("../Models/user");
const formmodel = require("../Models/formmodel");
const formresponse = require("../Models/formresponse");

exports.getallforms = async (req, res) => {
  try {
    const { colid } = req.query;

    const forms = await formmodel.find({ colid: parseInt(colid) }).sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (err) {
  }
};

// GET  /api/forms/:colid/:formId   (formId is the _id of the doc)
exports.getsingleform = async (req, res) => {
  try {
    const { formId } = req.query;
    const form = await formmodel.findOne({ _id: formId});
    res.status(200).json(form);
  } catch (err) {
  }
};

// POST /api/forms?colid=123
exports.createform = async (req, res) => {
  try {
    const { colid } = req.query;
    const { title, fields } = req.body;

    const newForm = await formmodel.create({ title, fields, colid: parseInt(colid) });
    res.status(201).json(newForm);
  } catch (err) {
  }
};

exports.updateform = async (req, res) => {
  try {
    const { colid, formId } = req.query;

    const oldForm = await formmodel.findOne({ _id: formId, colid });

    const updated = await formmodel.findOneAndUpdate(
      { _id: formId, colid },
      req.body,
      { new: true, runValidators: true }
    );

    const labelMap = {};
    const oldFields = oldForm.fields.map(f => f.label);
    const newFields = updated.fields.map(f => f.label);

    oldFields.forEach((label, idx) => {
      if (newFields[idx] && label !== newFields[idx]) {
        labelMap[label] = newFields[idx];
      }
    });

    if (!Object.keys(labelMap).length) {
      return res.status(200).json(updated); // No label changed
    }

    // Stream responses and update in batches without using push()
    const cursor = formresponse.find({ formId }).lean().cursor();
    const batchSize = 100;
    let operations = [];
    let count = 0;

    for await (const doc of cursor) {
      const newData = {};
      let modified = false;

      for (const [key, value] of Object.entries(doc.data)) {
        const newKey = labelMap[key] || key;
        newData[newKey] = value;
        if (labelMap[key]) modified = true;
      }

      if (modified) {
        operations[count++] = {
          updateOne: {
            filter: { _id: doc._id },
            update: { data: newData }
          }
        };
      }

      // Execute and reset the batch
      if (count >= batchSize) {
        await formresponse.bulkWrite(operations, { ordered: false });
        operations = [];
        count = 0;
      }
    }

    // Final leftover batch
    if (count > 0) {
      await formresponse.bulkWrite(operations, { ordered: false });
    }

    res.status(200).json(updated);
  } catch (err) {
  }
};



// GET /api/forms/:colid/:formId
exports.deleteform = async (req, res) => {
  try {
    const { colid, formId } = req.query;
     await formmodel.findOneAndDelete({ _id: formId, colid: parseInt(colid) });
    // (optional) cascade delete responses
    await formresponse.deleteMany({ formId });

    res.status(200).json({ message: "Form deleted" });
  } catch (err) {
  }
};

// GET  /api/responses?colid=123&formId=<mongoId>
exports.getresponses = async (req, res) => {
  try {
    const { colid, formId } = req.query;

    const filter = { colid: parseInt(colid) };
    if (formId) filter.formId = formId;

    const responses = await formresponse.find(filter).populate("formId", "title");
    res.status(200).json(responses);
  } catch (err) {
  }
};

// POST /api/responses?colid=123
exports.createresponse = async (req, res) => {
  try {
    const { colid } = req.query;
    const { formId, data } = req.body;

    // verify form exists and belongs to this colid
    const form = await formmodel.findOne({ _id: formId, colid: parseInt(colid) });
    if (!form) return res.status(404).json({ message: "Form not found" });

    const newResp = await formresponse.create({ formId, data, colid: parseInt(colid) });
    res.status(201).json(newResp);
  } catch (err) {
  }
};

// POST  /api/responses/:colid/:respId
exports.updateresponse = async (req, res) => {
  try {
    const { colid, respId } = req.query;
    const updated = await formresponse.findOneAndUpdate(
      { _id: respId, colid: parseInt(colid) },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json(updated);
  } catch (err) {
  }
};

// get /api/responses/:colid/:respId
exports.deleteresponse = async (req, res) => {
  try {
    const { colid, respId } = req.query;
    await formresponse.findOneAndDelete({ _id: respId, colid: parseInt(colid) });
    res.status(200).json({ message: "Response deleted" });
  } catch (err) {
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ message: "Incorrect password" });

    const { colid, name, email: userEmail, regno, role } = user;

    return res.status(200).json({ colid, name, email: userEmail, regno, role });
  } catch (err) { }
}