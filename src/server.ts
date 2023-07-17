import express from 'express'
import fanoutRouter from './fanout'
function startServer() {
    const app = express();
    app.use(express.json());
    app.use(fanoutRouter)

    return app;
}

export default startServer;
