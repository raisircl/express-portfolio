app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).render('pages/404', { title: 'Error', page: 'error', error: 'Something went wrong' });
});