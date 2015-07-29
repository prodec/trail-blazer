import express from 'express';
import WindApi from '../utils/windApi';

let router = express.Router();

router.post('/ping', (_, res) => {
  res.sendStatus(200);
});

router.get('/windSpeed', async (req, res) => {
  try {
    let windSpeed = await new WindApi(req.params.lat,
                                      req.params.lng,
                                      req.params.time).getWindSpeed();
    res.send({ windSpeed });
  } catch (error) { res.status(500).send({ error }); }
});

export default router;
