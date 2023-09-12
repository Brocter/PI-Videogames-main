const express = require("express");
const router = express.Router();
const {
  fetchGenresFromAPI,
  saveGenresToDatabase,
  getGenresFromDatabase,
} = require("../controllers/getGenres");

router.get("/", async (req, res) => {
  try {
    let genres = await getGenresFromDatabase(); 

    if (!genres.length) {
      // If no genres in the database, fetch them from the API and save to the database
      genres = await fetchGenresFromAPI();
      await saveGenresToDatabase(genres);
    }

    return res.status(200).json(genres);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
