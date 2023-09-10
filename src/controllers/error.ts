import express from "express";

const router = express.Router();

router.get('/not-found', (req, res) => res.render('error/not-found'));
router.get('/internal-server-error', (req, res) => res.render('error/internal-server-error'));
router.use((req, res) => res.redirect('/not-found'));

export { router };