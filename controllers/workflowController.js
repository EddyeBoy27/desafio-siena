const rescue = require('express-rescue');
const { workflow, updateStatus, validateJoi } = require('./schemaJoi');
const { newWorkflowService, getAllWorkflowsService, updateStatusService } = require('../services/workflowService');

const newWorkflow = rescue(async (req, res) => {
  await validateJoi(workflow, req.body);
  const serviceAnswer = await newWorkflowService(req.body);
  return res.status(200).json(serviceAnswer);
});

const getAllWorkflows = rescue(async (_req, res) => {
  const serviceAnswer = await getAllWorkflowsService();
  return res.status(200).json(serviceAnswer);
});

const updateStatusUuid = rescue(async (req, res) => {
  await validateJoi(updateStatus, req.body);
  const { uuid } = req.params;
  const { status } = req.body;
  await updateStatusService(uuid, status);
  return res.status(200);
});

module.exports = {
  newWorkflow,
  getAllWorkflows,
  updateStatusUuid,
};
