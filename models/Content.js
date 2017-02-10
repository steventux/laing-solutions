var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Content Model
 * ==========
 */
var Content = new keystone.List('Content', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true, fixed: true },
  track: true
});

Content.add({
	title: { type: String, required: true },
  description: { type: String },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	image: { type: Types.CloudinaryImage },
	body: { type: Types.Html, wysiwyg: true, height: 400 }
});

Content.schema.statics.findBySlug = function (slug, callback) {
  return this.find({slug: slug}, callback);
};

Content.defaultColumns = 'title, slug, state|20%, createdAt|20%';
Content.register();
