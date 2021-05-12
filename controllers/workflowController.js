const rescue = require('express-rescue');
const { workflow, validateJoi } = require('./schemaJoi');
const { newWorkflowService } = require('../services/workflowService');

const newWorkflowController = rescue(async (req, res) => {
  const isValid = await validateJoi(workflow, req.body);
  const serviceAnswer = await newWorkflowService(req.body);
  return res.status(200).json({ status: 'isValid' });
});

module.exports = {
  newWorkflowController,
};
