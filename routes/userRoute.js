import {
  getCount,
  updateData,
  addData,
} from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.route("/getcount/:username").get(getCount); //time:88 ms
router.route("/add").post(addData); //time:322 ms
router.route("/update").patch(updateData); //time:80 ms

export default router;
