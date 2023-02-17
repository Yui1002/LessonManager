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
import dotenv from 'dotenv';
dotenv.config();

const fiveMinutes = 300000;
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: fiveMinutes },
    resave: false
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/dist')));


new Routes().applyRouting(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => console.log(`Listening on ${port}`));


