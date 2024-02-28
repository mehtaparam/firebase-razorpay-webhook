import { IWAMessageReq } from './../models/codingmantra-ai/wa-message.model';
import { sendCMWhatsappMessage } from "../helpers/codingmantra-ai.helper";
import { logError } from "../helpers/firebase-logger.helper"


// This method will be used to send confirmation message to customer for their payment
export const sendPaymentConfirmationWAMessage = async (paymentDetails: any): Promise<any> => {
    try {
        const waMessageReq: IWAMessageReq = {} as IWAMessageReq;
        waMessageReq.to = paymentDetails.contact;
        waMessageReq.message = `
        We received your payment of ${paymentDetails.amount / 100} ${paymentDetails.currency}`

        if (paymentDetails.method) {
            waMessageReq.message += `\nPaid via ${paymentDetails.method} `;
        }

        if (paymentDetails.order_id) {
            waMessageReq.message += `\nOrder id ${paymentDetails.order_id} `;
        }

        waMessageReq.message += `\nThanks for your payment`;
        return await sendCMWhatsappMessage(waMessageReq)
    } catch (error) {
        logError(error);
        return null
    }
}

// This method will be used to send error message to customer for their payment failed
export const sendPaymentFailedWAMessage = async (paymentDetails: any): Promise<any> => {
    try {
        const waMessageReq: IWAMessageReq = {} as IWAMessageReq;
        waMessageReq.to = paymentDetails.contact;
        waMessageReq.message = `
        Oops there is some issue in payment of ${paymentDetails.amount / 100} ${paymentDetails.currency}`

        if (paymentDetails.method) {
            waMessageReq.message += `\nvia ${paymentDetails.method} `;
        }

        if (paymentDetails.order_id) {
            waMessageReq.message += `\nFor Order id ${paymentDetails.order_id} `;
        }

        waMessageReq.message += `\nPlease retry payment`;
        return await sendCMWhatsappMessage(waMessageReq)
    } catch (error) {
        logError(error);
        return null
    }
}
