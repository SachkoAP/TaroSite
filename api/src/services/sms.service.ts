import axios from 'axios';
import * as crypto from 'node:crypto';

const sendSMSRed = async (destination: string) => {
    const login = process.env.RED_LOGIN;
    const ts = `ts-value-${Date.now()}`;
    const apiKey = process.env.RED_API_KEY;
    const secret = crypto
        .createHash('md5')
        .update(ts + apiKey)
        .digest('hex');
    const code = Math.floor(1000 + Math.random() * 9000);

    const body = JSON.stringify({
        route: 'sms',
        from: 'Сайт Таро',
        to: `+7${destination}`,
        text: `Ваш код для авторизации: ${code}\nhttps://nataro.site/`,
    });

    const req = await axios.post('https://cp.redsms.ru/api/message', JSON.parse(body), {
        headers: {
            login,
            ts,
            secret,
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json',
        },
    });
    console.log(req.status, req.data);
    return code;
};

const sendFCallRed = async (destination: string) => {
    const login = process.env.RED_LOGIN;
    const ts = `ts-value-${Date.now()}`;
    const apiKey = process.env.RED_API_KEY;
    const secret = crypto
        .createHash('md5')
        .update(ts + apiKey)
        .digest('hex');
    const code = Math.floor(1000 + Math.random() * 9000);

    const body = JSON.stringify({
        route: 'fcall',
        to: `+7${destination}`,
        text: `${code}`,
    });

    await axios.post('https://cp.redsms.ru/api/message', JSON.parse(body), {
        headers: {
            login,
            ts,
            secret,
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'application/json',
        },
    });
    return code;
};

export default {
    sendSMSRed,
    sendFCallRed,
};
