import express from 'express';
import WindApi from '../src/js/utils/windApi';

let router = express.Router();

router.get('/ping', (_, res) => {
  res.sendStatus(200);
});

router.get('/windSpeed', async (req, res) => {
  try {
    let windSpeed = await new WindApi(req.query.lat,
                                      req.query.lng,
                                      req.query.time).getWindSpeed();
    res.send({ windSpeed });
  } catch (error) { res.status(500).send({ error }); }
});

export default router;
