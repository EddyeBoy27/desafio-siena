require('dotenv').config();
const express = require('express');
const { newWorkflowController } = require('./controllers/workflowController');
const { endpointNotFound, errorController } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/workflow', newWorkflowController);

app.use(errorController);
app.all('*', endpointNotFound);

const NODE_PORT = process.env.NODE_PORT || 3001;

app.listen(NODE_PORT, async () => console.log(`Listening on ${NODE_PORT}`));
