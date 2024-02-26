import express from 'express';
import { createRazorWebhook } from '../controllers/razor.controller';
import { HTTP_REPONSE_STATUS } from '../constants/app.constant';
const router = express.Router();

// Login
router.post('/', async (req, res) => {
    const razorWebhook =  await createRazorWebhook(req.body);
    if (razorWebhook) {
        return res.status(HTTP_REPONSE_STATUS.SUCCESS).json(
            {
                "status": true,
            }
        );
    } else {
        return res.status(HTTP_REPONSE_STATUS.FORBIDDEN).json(
            {
                "status": false,
                "message": "Error in saving"
            }
        );
    }
});


export default router;
