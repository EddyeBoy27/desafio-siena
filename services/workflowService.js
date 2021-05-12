const { getFromUuid, newWorkflowModel } = require('../models/workflowModel');

const newWorkflowService = async (body) => {
    const { UUID, status, data, steps } = body;
    const alreadyExists = await getFromUuid(UUID);
    if (alreadyExists) {
        const error = { error: { message: 'UUID already exist\'ts', code: 'alreadyExists' } };
        throw error;
    }
    const newWorkflow = await newWorkflowModel({ UUID, status, data, steps });
    console.log(newWorkflow);
};

module.exports = {
    newWorkflowService,
};