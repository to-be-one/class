var Class = function () {
    var Root;
    return Root = {
        /**
         * @param {methods}，{key} method名字，{value} method 或者 {object}
         * {methods}.{value}为{object}时，{object}结构
         *      {
         *          override: true,（可选）是否重写父类同名方法
         *          handler:  method
         *      }
         *  @return {Class的子类} 返回调用者的子类
         */
        create: function (methods) {
            var parent = null;
            if (Root !== this) {
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
                    var method = methods[name];
                    var override = false;
                    if (typeof method !== 'function') {
                        override = method.override;
                        method = method.handler;
                    }
                    F.prototype[name] = function(method, parentMethod, override) {
                        return function() {
                            !override && parentMethod
                                && parentMethod.apply(this, arguments);
                            return method.apply(this, arguments);
                        };
                    }(method, parent && parent.prototype[name], override);
                }
            }
            F.create = Root.create;
            F.init = Root.init;
            return F;
        },
        init: function () {
            return new this(arguments);
        }
    };
}();