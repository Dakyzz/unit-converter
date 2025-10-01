const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/convert-length', (req, res) => {
    const {value,from,to} = req.body;

    const unitsToMeters = {
        meter: 1,
        cm: 0.01,
        dm: 0.1,
        mm: 0.001,
        km: 1000,
        inch: 0.0254,
        feet: 0.3048,
        yard: 0.9144,
        mi: 1609.34
    }

    if (!unitsToMeters[to] || !unitsToMeters[from]) {
        return res.status(400).json({
            error: 'Invalid units'
        });
    }
    const valueInMeters = value * unitsToMeters[from];
    const convertedValue = valueInMeters / unitsToMeters[to];

    res.json({convertedValue});
});


app.post('/convert-temp', (req, res) => {
    const {value,from,to} = req.body;

    let convertedValue;

    let tempInCelcius;
    if (from === 'celcius') tempInCelcius = value;
    else if (from === 'fahrenheit') tempInCelcius = (value - 32) * (5 / 9);
    else if (from === 'kelvin') tempInCelcius = (value - 273.15);
    else return res.status(400).json({error: 'Invalid temperature unit (to)'});

    if (to === 'celcius') convertedValue = tempInCelcius;
    else if (to === 'fahrenheit') convertedValue = tempInCelcius * (9 / 5) + 32;
    else if (to === 'kelvin') convertedValue = tempInCelcius + 273.15;
    else return res.status(400).json({error: 'Invalid temperature unit (from)'});

    res.json({convertedValue});
})

app.post('/convert-weight', (req, res) => {
    const{value, from, to} = req.body;

    let unitsToGrams ={
        g: 1,
        kg: 1000,
        mg: 0.001,
        lb: 453.592,
        oz: 28.3495,
        ton: 1_000_000
    }
    if (!unitsToGrams[from] || !unitsToGrams[to]) {
        return res.status(400).json({ error: 'Invalid weight units' });
    }

    const valueInGrams = value * unitsToGrams[from];
    const convertedValue = valueInGrams / unitsToGrams[to];

    res.json({ convertedValue });
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})