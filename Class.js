var Class = function () {
	var noop = function () {}, Class;
	return Class = {
		create: function (methods) {
			var parent = null;
			if (Class !== this) {
				parent = this;
			}
			var F = function () {
				if (parent) {
					this.parentFn = parent.prototype;
				}
				this.init && this.init(arguments);
			};
			if (parent) {
				F.prototype = new parent();
				F.prototype.constructor = F;
			}
			for (var name in methods) {
				if (methods.hasOwnProperty(name)) {
					if (parent) {
						F.prototype[name] = (function(name, method, parentMethod) {
							return function() {
								this.parent = parentMethod;
								return method.apply(this, arguments);
							};
						})(name, methods[name], parent.prototype[name] || noop);
					} else {
						F.prototype[name] = methods[name];
					}
				}
			}
			F.create = Class.create;
			F.init = Class.init;
			return F;
		},
		init: function () {
			return new this(arguments);
		}
	};
}();