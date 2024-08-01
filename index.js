
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const licenses = [
    { key: 'M8ri4QG-g9hXQPqA-NQmSEOsU', devices: [], deviceLimit: 3 },

];

app.get('/get-uuid', (req, res) => {
    const uuid = uuidv4();
    res.json({ uuid });
});

app.post('/check-license', (req, res) => {
    const { licenseKey, deviceId } = req.body;
    const license = licenses.find(lic => lic.key === licenseKey);

    if (!license) {
        return res.json({ valid: false });
    }

    if (license.devices.includes(deviceId)) {
        return res.json({ valid: true });
    }

    if (license.devices.length >= license.deviceLimit) {
        return res.json({ valid: false });
    }

    license.devices.push(deviceId);
    console.log(license.devices);

    return res.json({ valid: true });
});


app.listen(5000, () => {
    console.log('License server running on port 5000');
});
