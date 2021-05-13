const fs = require('fs');
const path = require('path');
const mime = require('mime');
const rescue = require('express-rescue');
const pdf = require('html-pdf');
const { workflow, updateStatus, validateJoi } = require('./schemaJoi');
const {
  newWorkflowService,
  getAllWorkflowsService,
  updateStatusService,
} = require('../services/workflowService');

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

const generatePdf = rescue(async (_req, res) => {
  const serviceAnswer = await getAllWorkflowsService();
  const options = { format: 'Letter' };
  const html = `
    <ul>
      <li>${JSON.stringify(serviceAnswer)}</li>
    </ul>
  `;

  const pdfAnswer = pdf
    .create(html, options)
    .toFile('./workflow.pdf', (err, _) => {
      if (err) {
        return console.log(err);
      }
      const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;

      const filename = path.basename(file);
      const mimetype = mime.lookup(file);

      res.setHeader('Content-disposition', `attachment; filename=${filename}`);
      res.setHeader('Content-type', mimetype);

      const filestream = fs.createReadStream(file);
      filestream.pipe(res);
    });
  return res.status(200).json(pdfAnswer);
});

module.exports = {
  newWorkflow,
  getAllWorkflows,
  updateStatusUuid,
  generatePdf,
};
