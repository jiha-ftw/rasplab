const mqtt = require('mqtt')
const dotenv = require('dotenv');
dotenv.config();

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${process.env.RASPLAB_MOSQUITTO_SERVER_IP}:1883`;

const wData = {};

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.RASPLAB_MOSQUITTO_USER_USERNAME,
    password: process.env.RASPLAB_MOSQUITTO_USER_PASSWORD,
    reconnectPeriod: 1000,
})

client.on('connect', () => {
    console.log('Connected to mqtt')

    client.subscribe(['mqtt/collect-temperature'], () => {
        console.log('Subscribing to topic')
    });

    client.on('message', (topic, payload) => {
        const payloadJson = JSON.parse(payload);
        wData[payloadJson.Source] = payloadJson;
        console.log(wData);
    });
});

exports.getWeatherData = () => wData;