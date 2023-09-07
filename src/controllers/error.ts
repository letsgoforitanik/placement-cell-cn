import express from "express";

const router = express.Router();

router.get('/not-found', (req, res) => res.send('Resource not found'));
router.use((req, res) => res.redirect('/not-found'));

export { router };