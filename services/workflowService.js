const { getFromUuid, newWorkflowModel } = require('../models/workflowModel');

const newWorkflowService = async (body) => {
    const { UUID, status, data, steps } = body;
    const alreadyExists = await getFromUuid(UUID);
    if (!alreadyExists) {
        const newWorkflow = await newWorkflowModel({ UUID, status, data, steps });
        return newWorkflow;
    }
    const error = { error: { message: 'UUID already exist\'s', code: 'alreadyExists' } };
    throw error;
};

module.exports = {
    newWorkflowService,
};