const rescue = require('express-rescue');
const { workflow, validateJoi } = require('./schemaJoi');
const { newWorkflowService, getAllWorkflowsService } = require('../services/workflowService');

const newWorkflow = rescue(async (req, res) => {
  await validateJoi(workflow, req.body);
  const serviceAnswer = await newWorkflowService(req.body);
  return res.status(200).json(serviceAnswer);
});

const getAllWorkflows = rescue(async (_req, res) => {
  const serviceAnswer = await getAllWorkflowsService();
  return res.status(200).json(serviceAnswer);
});

module.exports = {
  newWorkflow,
  getAllWorkflows,
};
