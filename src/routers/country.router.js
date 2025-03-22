import Router from "express";
import CountryController from "../controllers/country.controller.js";

const router = new Router();

// Retrieve all countries
router.get("/", CountryController.findAll);

// Create a new country
router.post("/", CountryController.create);

export default router;