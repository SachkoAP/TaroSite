import axios from 'axios';
import User from '../models/user';
import { v4 } from 'uuid';
import Payment from '../models/payment';

const waitPayment = async (userId: string, tariff: number, paymentId: string) => {
    // eslint-disable-next-line no-constant-condition
    const req = await axios.get(`https://api.yookassa.ru/v3/payments/${paymentId}`, {
        auth: {
            username: process.env.SHOP_ID as string,
            password: process.env.SHOP_API_KEY as string,
        },
    });
    if (req.data.status === 'succeeded') {
        await User.update({ tariff }, { where: { id: userId } });
        await Payment.create({
            yookassaPyamentId: req.data.id,
            description: req.data.description,
            status: req.data.status,
            userId,
        });
        console.log('[INFO] Payment succeeded');
        return 1;
    } else if (req.data.status === 'canceled') {
        await Payment.create({
            yookassaPyamentId: req.data.id,
            description: req.data.description,
            status: req.data.status,
            userId,
        });
        console.log('[INFO] Payment canceled');
        return -1;
    } else return 0;
};

const createPayment = async (idempotenceKey: string, value: string, tariffName: string, tariff: number) => {
    const req = await axios
        .post(
            'https://api.yookassa.ru/v3/payments',
            {
                amount: {
                    value: value,
                    currency: 'RUB',
                },
                capture: true,
                confirmation: {
                    type: 'redirect',
                    return_url: `${process.env.WEB_URL}/LK`,
                },
                description: `Покупка тарифа ${tariffName}`,
            },
            {
                auth: {
                    username: process.env.SHOP_ID as string,
                    password: process.env.SHOP_API_KEY as string,
                },
                headers: {
                    'Idempotence-Key': v4().toString(),
                    'Content-Type': 'application/json',
                },
            }
        )
        .then(response => {
            if (response.status !== 200) return response;
            (async function getPaymentStatus() {
                const status = await waitPayment(idempotenceKey, tariff, response.data.id);
                if (status === 0) {
                    setTimeout(getPaymentStatus, 15000);
                }
            })();
            return response;
        });
    return req.data;
};

export default {
    createPayment,
    waitPayment,
};
