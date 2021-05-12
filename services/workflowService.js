const { getFromUuid, newWorkflowModel } = require('../models/workflowModel');

const newWorkflowService = async (body) => {
    const { UUID, status, data, steps } = body;
    const alreadyExists = await getFromUuid(UUID);
    console.log('linha 6', alreadyExists);
    if (alreadyExists) {
        const error = { error: { message: 'UUID already exist\'ts', code: 'alreadyExists' } };
        throw error;
    }
    // const newWorkflow = await newWorkflowModel({ UUID, status, data, steps });
    // console.log('linha 11 service', newWorkflow);
};

module.exports = {
    newWorkflowService,
};