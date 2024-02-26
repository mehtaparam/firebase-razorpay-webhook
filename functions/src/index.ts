import * as admin from 'firebase-admin';
import * as functions from "firebase-functions";

import express from 'express';
import cors from 'cors';

// Middleware
import { signatureMiddleware } from "./middleware/signature.middleware";

// Routers
import razorRouter from './routers/razor.router';

// Initialze Firebase Admin
admin.initializeApp();

const webhook = express();
webhook.use(express.json({ limit: '100mb' }));
webhook.use(cors({ origin: '*' }));
webhook.use('/razor', signatureMiddleware, razorRouter);

// Expose the Express app as a Firebase Cloud Function
exports.webhook = functions.https.onRequest(webhook);