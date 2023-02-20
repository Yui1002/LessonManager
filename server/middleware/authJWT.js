import jwt from 'jsonwebtoken';
import Repository from '../repositories/repository.js';

export const verifyToken = (req, res, next) => {
    console.log('request headers: ', req.cookies)
    const token = req.cookies.token;
    if (!token) {
        return res.send('No Token Provided');
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: 'Failed to authenticate' });
            } else {
                req.useId = decoded.id;
                next();
            }
        })
    }
    

    // const token = authHeader && authHeader.split(' ')[1];
    // if (token == null) return res.status(401).send('Token not provided');

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.status(403).send('inalid token');
    //     req.user = user;
    //     next();
    // })
    // const token = req.headers['x-access-token'];
    // if (!token) {
    //     return res.status(401).send({ auth: false, message: 'No token provided' });
    // }
    // jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
    //     if (err) {
    //         return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
    //     }
    //     next();
    // })
    // console.log('token auth: ', req.cookies.token)
    // const token = req.cookies.token;

    // if (token === undefined) {
    //     return res.json({ message: 'Access denied! Unauthorized user' });
    // } else {
    //     jwt.verify(token, process.env.API_SECRET, (err, authData) => {
    //         console.log('hello')
    //         if (err) {
    //             res.json({ message: 'Invalid token...' });
    //         } else {
    //             next();
    //         }
    //     })
    // }
}