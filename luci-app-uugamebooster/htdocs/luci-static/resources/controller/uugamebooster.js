'use strict';
'require controller';
'require fs';

return controller.extend({
	index: function() {
		return fs.stat('/etc/config/uugamebooster').then(function() {
			controller.add({
				path: ['admin', 'services', 'uugamebooster'],
				title: _('UU GameAcc'),
				order: 99,
				action: 'uugamebooster/uugamebooster',
				acl: ['luci-app-uugamebooster']
			});
		}).catch(function() {});
	}
});
