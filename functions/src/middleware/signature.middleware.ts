import { NextFunction, Response } from 'express';
import { HTTP_REPONSE_STATUS, HTTP_REPONSE_STATUS_MESSAGE } from '../constants/app.constant';
import * as crypto from 'crypto';

// Middleware to authenticate user based on the token
export const signatureMiddleware = async (req:any, res: Response, next: NextFunction) => {
    const body = req.rawBody;
    const signature = req.headers['x-razorpay-signature'];

    const expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_WEBHOOK_SECRET_KEY!)
        .update(body)
        .digest('hex');

    if (signature === expectedSignature) {
        return next();
    } else {
        return res.status(HTTP_REPONSE_STATUS.UNAUTHORISED).send(HTTP_REPONSE_STATUS_MESSAGE.UNAUTHORISED);
    }
};