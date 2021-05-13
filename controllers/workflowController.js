const rescue = require('express-rescue');
const { workflow, validateJoi } = require('./schemaJoi');
const { newWorkflowService } = require('../services/workflowService');

const newWorkflowController = rescue(async (req, res) => {
  await validateJoi(workflow, req.body);
  const serviceAnswer = await newWorkflowService(req.body);
  return res.status(200).json(serviceAnswer);
});

const getAllWorkflows = rescue(async (req, res) => {
  const serviceAnswer = await getWorkflowsService();
  return res.status(200).json(serviceAnswer);
});

module.exports = {
  newWorkflowController,
  getAllWorkflows,
};
