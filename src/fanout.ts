import express from "express";
import dayjs from "dayjs";
import axios from "axios";

const router = express.Router();

router.post("/fanout", async (req, res) => {
  try {
    const { maxdelay, parallel } = req.query;
    const requestDelays: number[] = Array.from(
      // number of requests
      { length: Number(parallel) },
      // delay between 1s and maxdelay
      () => Math.random() * (Number(maxdelay) - 1) + 1,
    );
    const startTime = dayjs();

    await Promise.all(
      requestDelays.map(async (delay) => {
        return await axios.get(`http://0.0.0.0:8088/delay/${delay}`);
      }),
    );

    // total time taken in ms
    const totalTimeTaken = dayjs().diff(startTime);
    return res.send({ totalTimeTaken });
  } catch (e: any) {
    res.statusCode = 500;
    return res.send({
      error: e.toString(),
    });
  }
});

export default router;
