import { Router } from "express";

import usersControlles from "../controllers/usersControlles.js";

const router = Router();

router.get('/usuarios', usersControlles.getUsers);
router.post('/usuarios', usersControlles.postUsers);
router.put('/usuarios/:id', usersControlles.putUsers);
router.delete('/usuarios/:id', usersControlles.deleteUsers);

export default router;