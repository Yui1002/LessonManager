import express from 'express';
const app = express();
const port = 8000;
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import Routes from './routes/routes.js';
import fileUpload from 'express-fileupload';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));

new Routes().applyRouting(app);

app.listen(port, () => console.log(`Listening on ${port}`));

