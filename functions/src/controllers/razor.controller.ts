import * as admin from 'firebase-admin';
import { logInfo } from '../helpers/firebase-logger.helper';

export const createRazorWebhook = async (reqBody: any): Promise<any> => {
    const contactPayload = reqBody.payload.payment?.entity || reqBody.payload.subscription?.entity || null;

    if (contactPayload) {
        const contact = contactPayload.contact || null;
        const email = contactPayload.email || null;

        const contactDetails = {
            email: email,
            contact: contact,
        };

        // Store Contact Details
        return await storeRazorContact(contactDetails) && await storeRazorWebhook(contactDetails, reqBody);
    } else {
        return null
    }
}

export const storeRazorContact = async (contactDetails: any): Promise<any> => {
    const db = admin.firestore();
    // Store the contact details in Firestore
    const razorContactDocRef = db.collection('razorContacts').doc(contactDetails.contact);
    contactDetails.updatedAt = new Date();

    // You can also perform tasks like sending email / whatsapp

    return await razorContactDocRef.set(contactDetails, { merge: true });
}

export const storeRazorPayment = async (paymentDetails: any): Promise<any> => {
    const db = admin.firestore();
    // Store the payment details in Firestore
    const razorOrderDocRef = db.collection('razorPayments').doc(paymentDetails.id);
    paymentDetails.updatedAt = new Date();

    // You can also perform tasks like sending email / whatsapp

    return await razorOrderDocRef.set(paymentDetails, { merge: true });
}

export const storeRazorOrder = async (orderDetails: any): Promise<any> => {
    const db = admin.firestore();
    // Store the order details in Firestore
    const razorOrderDocRef = db.collection('razorOrders').doc(orderDetails.id);
    orderDetails.updatedAt = new Date();

    // You can also perform tasks like sending email / whatsapp

    return await razorOrderDocRef.set(orderDetails, { merge: true });
}

export const storeRazorRefund = async (refundDetails: any): Promise<any> => {
    const db = admin.firestore();
    // Store the refund details in Firestore
    const razorOrderDocRef = db.collection('razorRefunds').doc(refundDetails.id);
    refundDetails.updatedAt = new Date();

    // You can also perform tasks like sending email / whatsapp

    return await razorOrderDocRef.set(refundDetails, { merge: true });
}

export const storeRazorWebhook = async (contactDetails: any, reqBody: any): Promise<any> => {
    const db = admin.firestore();
    const payId = reqBody.payload.payment?.entity?.id;
    const event = reqBody.event;
    const accountId = reqBody.account_id;

    const payment = reqBody.payload?.payment?.entity || null;
    const order = reqBody.payload?.order?.entity || null;
    const refund = reqBody.payload?.refund?.entity || null;

    // Store Payment Details
    if (payment) {
        logInfo('payId ' + payId);
        logInfo('event ' + event)
        payment.event = event;
        payment.payId = payId;
        payment.accountId = accountId;

        await storeRazorPayment(payment);

        if (refund) {
            refund.accountId = accountId;
            refund.payId = payId;
            refund.email = contactDetails.email || null;
            refund.contact = contactDetails.contact || null;
            await storeRazorRefund(refund);
        } else if (order) {
            order.accountId = accountId;
            order.payId = payId;
            order.email = contactDetails.email || null;
            order.contact = contactDetails.contact || null;
            await storeRazorOrder(order);
        }
    }

    // Store the webhook details and contact details in Firestore
    const webhookDocRef = db.collection('razorWebhooks').doc(accountId).collection(event).doc(payId);
    const webhookStoreRes = await webhookDocRef.set({
        updatedAt: new Date(),
        webhookData: reqBody
    }, { merge: true });
    return webhookStoreRes;
}