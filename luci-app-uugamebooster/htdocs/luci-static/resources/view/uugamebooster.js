'use strict';
'require form';
'require view';
'require poll';
'require ui';
'require rpc';

var callServiceList = rpc.declare({
	object: 'service',
	method: 'list',
	params: ['name'],
	expect: { '': {} }
});

function getServiceStatus() {
	return L.resolveDefault(callServiceList('uugamebooster'), {}).then(function(res) {
		var instances = res['uugamebooster'] && res['uugamebooster']['instances'];
		if (instances) {
			for (var key in instances) {
				if (instances[key] && instances[key].running)
					return true;
			}
		}
		return false;
	});
}

return view.extend({
	render: function() {
		var m, s, o;

		m = new form.Map('uugamebooster', _('UU Game Accelerator'), _('A Paid Game Acceleration service'));

		s = m.section(form.GridSection, '_status', _('Status'));
		s.render = function() {
			return E('div', { class: 'cbi-section' }, [
				E('p', { id: 'uugamebooster_status' }, _('Collecting data...'))
			]);
		};

		s = m.section(form.TypedSection, 'uugamebooster', _('Settings'));
		s.anonymous = true;
		s.addremove = false;

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.default = '0';
		o.rmempty = false;

		s = m.section(form.GridSection, '_qrcode', _('QR Code'));
		s.render = function() {
			return E('div', { class: 'cbi-section' }, [
				E('p', { id: 'uugamebooster_qcode' }, [
					E('img', { src: '/uugamebooster/uuios.png', height: '300' }),
					E('img', { src: '/uugamebooster/uuandriod.png', height: '300' })
				])
			]);
		};

		poll.add(function() {
			return getServiceStatus().then(function(running) {
				var node = document.getElementById('uugamebooster_status');
				if (node) {
					if (running) {
						node.innerHTML = '<em><b><font color="green">UU GameAcc ' + _('RUNNING') + '</font></b></em>';
					} else {
						node.innerHTML = '<em><b><font color="red">UU GameAcc ' + _('NOT RUNNING') + '</font></b></em>';
					}
				}
			});
		}, 3);

		return m.render();
	}
});
