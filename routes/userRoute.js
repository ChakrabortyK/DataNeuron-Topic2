import {
  getCount,
  updateData,
  addData,
} from "../controllers/userController.js";

import express from "express";

const router = express.Router();

router.route("/getcount/:username").get(getCount);
router.route("/add").post(addData);
router.route("/update").patch(updateData);

export default router;
