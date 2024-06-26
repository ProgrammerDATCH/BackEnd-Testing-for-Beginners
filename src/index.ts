import express, { Request, Response } from 'express';
import routes from './routes/indes';

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({status: true, message: "It is working."})
})

app.use('/api', routes)

app.listen(9090, () => {
    console.log("Listening on port 9090");
})

export default app;