const rescue = require('express-rescue');
const { workflow, validateJoi } = require('./schemaJoi');

const newWorkflowController = rescue(async (req, res) => {
  const isValid = await validateJoi(workflow, req.body);
  return res.status(200).json({ status: 'isValid' });
});

module.exports = {
  newWorkflowController,
};
