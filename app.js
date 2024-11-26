import cors from 'cors';
import express from 'express';
import { spawn } from 'node:child_process';
import { chdir } from 'node:process';
import render from './render.js';

const app = express();

app.use(express.json());
app.use(cors())

app.post("/run", async (req, res) => {
    const payload = req?.body?.inputsData?.items === 'string' ? JSON.parse(req?.body?.inputsData?.items) : req?.body?.inputsData?.items
    console.log({payload})
    await render(payload)

    res.json({
        text:''
    })
});

app.listen(4444, () => {
    console.log("server started on port 4444");
});
