const {
    getFromUuid, newWorkflowModel, getAllWorkflowsModel, updateStatusModel,
} = require('../models/workflowModel');

const getAllWorkflowsService = async () => {
    const modelAnswer = await getAllWorkflowsModel();
    return modelAnswer;
};

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

const updateStatusService = async (uuid, status) => {
    const exists = await getFromUuid(uuid);
    if (!exists || exists.length !== 0) {
        await updateStatusModel(uuid, status);
    } else {
        const error = { error: { message: 'UUID doens\'t exist\'s', code: 'notFound' } };
        throw error;
    }
};

module.exports = {
    newWorkflowService,
    getAllWorkflowsService,
    updateStatusService,
};