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

    var content = keystone.list('Content').model.findBySlug('home')
      .exec(function(err, results) {
        if (err || !results.length) {
          next(err);
        } else {
          locals.data.content = results[0];
          next();
        }
      });
  });

  // Render the view
  view.render('index', locals.data.content);
};
