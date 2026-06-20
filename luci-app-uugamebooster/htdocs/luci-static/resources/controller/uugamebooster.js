'use strict';
'require controller';

return controller.extend({
	index: function() {
		controller.add({
			path: ['admin', 'services', 'uugamebooster'],
			title: _('UU GameAcc'),
			order: 99,
			action: 'uugamebooster/uugamebooster',
			acl: ['luci-app-uugamebooster']
		});
	}
});
