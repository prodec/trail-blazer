import express from 'express';
let router = express.Router();

router.post('/ping', (_, res) => {
  res.sendStatus(200);
});

export default router;
