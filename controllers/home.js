/**
 * GET /
 * Home page.
 */
const index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};
