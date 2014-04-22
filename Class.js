var Class = function () {
    var Class;
    return Class = {
        create: function (methods) {
            var parent = null;
            if (Class !== this) {
                parent = this;
            }
            var F = function () {
                if (parent) {
                    this.superClass = parent.prototype;
                }
                this.init && this.init(arguments);
            };
            if (parent) {
                F.prototype = new parent();
                F.prototype.constructor = F;
            }
            for (var name in methods) {
                if (methods.hasOwnProperty(name)) {
                    F.prototype[name] = (function(name, method, parentMethod) {
                        return function() {
                            parentMethod && parentMethod.apply(this, arguments);
                            return method.apply(this, arguments);
                        };
                    })(name, methods[name], parent && parent.prototype[name]);
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