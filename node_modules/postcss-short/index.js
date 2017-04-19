var assign  = require('object-assign');
var postcss = require('postcss');

var processors = [
	{
		plugin:    require('postcss-short-border'),
		namespace: 'border',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-color'),
		namespace: 'color',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-font-size'),
		namespace: 'font-size',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-position'),
		namespace: 'position',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-size'),
		namespace: 'size',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-spacing'),
		namespace: 'spacing',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-text'),
		namespace: 'text',
		defaults:  {}
	},
	{
		plugin:    require('postcss-font-weights'),
		namespace: 'font-weight',
		defaults:  {}
	},
	{
		plugin:    require('postcss-short-data'),
		namespace: 'data',
		defaults:  {}
	}
];

module.exports = postcss.plugin('postcss-short', function (opts) {
	opts = assign({}, opts);

	var instance = postcss();

	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in opts ? opts[processor.namespace] : opts;
		var processorOptions = {};

		processorOptions = assign({}, processor.defaults, namespaceOptions);

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});
