var keystone = require('keystone');

exports = module.exports = function(req, res) {

  // Set cache control header
  res.set('Cache-control', 'max-age=1800, public');

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

  locals.data = {
    content : {}
  };

  view.on('init', function(next) {

    var content = keystone.list('Content').model.findBySlug(req.params.slug)
      .exec(function(err, results) {
        if (err) {
          next(err);
        } else if (!results.length) {
          locals.data.content.body = '<h1>No content found at /' + req.params.slug + '</h1>';
          locals.data.content.body += '<p>Please <a href="/keystone">log in</a> to create content.</p>';
          next();
        } else {
          locals.data.content = results[0];
          next();
        }
      });
  });

  // Render the view
  view.render('content', locals.data.content);
};
