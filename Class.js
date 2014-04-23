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
        create: function (Parent, methods) {
            var parent = null;
            if (Root !== this) {
                parent = this;
            }
            // 仅当是Root.create时，允许传入父类
            if (parent === null) {
                if (typeof Parent === 'function') {
                    parent = Parent;
                } else {
                    methods = Parent;
                    Parent = null;
                }
            } else if (!methods) {
                methods = Parent;
                Parent = null;
            }
            methods = methods || {};
            var F = function () {
                this.init && this.init.apply(this, arguments);
            };
            if (parent) {
                F.prototype = new parent();
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
            if (parent) {
                F.prototype.superClass = parent;
                F.prototype.constructor = F;
            }
            F.create = Root.create;
            F.init = Root.init;
            return F;
        },
        init: function (options) { // 暂时只支持1个参数
            return new this(options);
        }
    };
}();