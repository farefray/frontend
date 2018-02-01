webpackJsonp([9,28,29],{

/***/ "/U5g":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".social-signup-container[data-v-bef6fce6]{margin:20px 0}.social-signup-container .sign-btn[data-v-bef6fce6]{display:inline-block;cursor:pointer}.social-signup-container .icon[data-v-bef6fce6]{color:#fff;font-size:30px;margin-top:6px}.social-signup-container .qq-svg-container[data-v-bef6fce6],.social-signup-container .wx-svg-container[data-v-bef6fce6]{display:inline-block;width:40px;height:40px;line-height:40px;text-align:center;padding-top:1px;border-radius:4px;margin-bottom:20px;margin-right:5px}.social-signup-container .wx-svg-container[data-v-bef6fce6]{background-color:#8dc349}.social-signup-container .qq-svg-container[data-v-bef6fce6]{background-color:#6ba2d6;margin-left:50px}", ""]);

// exports


/***/ }),

/***/ "12H5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_register_vue__ = __webpack_require__("Ii4g");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_000192a5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_register_vue__ = __webpack_require__("zvhe");
function injectStyle (ssrContext) {
  __webpack_require__("uARF")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_register_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_000192a5_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_register_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "6Ge7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-button-group"},[_vm._t("default")],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "E4LH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isvalidUsername */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return validateUsername; });
/* unused harmony export isvalidPassword */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return validatePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return validateEmail; });
/* harmony export (immutable) */ __webpack_exports__["c"] = validateURL;
/* unused harmony export validateLowerCase */
/* unused harmony export validateUpperCase */
/* unused harmony export validatAlphabets */
function isvalidUsername(str) {
  if (str === undefined || !str.length) {
    return false;
  }

  var reg = /^[a-zA-Z0-9_]+$/;
  return reg.test(str);
}

var validateUsername = function validateUsername(rule, value, callback) {
  if (!isvalidUsername(value)) {
    callback(new Error('Please enter the correct username'));
  } else {
    callback();
  }
};

function isvalidPassword(str) {
  if (str === undefined || !str.length) {
    return false;
  }

  var reg = /^[a-zA-Z0-9_]+$/;
  return reg.test(str);
}

var validatePassword = function validatePassword(rule, value, callback) {
  if (value.length < 6 || !isvalidPassword(value)) {
    callback(new Error('The password can not be less than 6 digits'));
  } else {
    callback();
  }
};

function isvalidEmail(str) {
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(str);
}

var validateEmail = function validateEmail(rule, value, callback) {
  if (!isvalidEmail(value)) {
    callback(new Error('Please, enter correct email'));
  } else {
    callback();
  }
};

function validateURL(textval) {
  var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

function validateLowerCase(str) {
  var reg = /^[a-z]+$/;
  return reg.test(str);
}

function validateUpperCase(str) {
  var reg = /^[A-Z]+$/;
  return reg.test(str);
}

function validatAlphabets(str) {
  var reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/***/ }),

/***/ "Ii4g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_validate__ = __webpack_require__("E4LH");




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'register',
  props: [],
  data: function data() {
    var _this = this;

    var passwordRepeated = function passwordRepeated(rule, value, callback) {
      if (_this.registerForm.password.length && _this.registerForm.password === _this.registerForm.passwordRepeat) {
        callback();
      } else {
        callback(new Error('Please repeat your password'));
      }
    };

    return {
      loading: false,
      registerForm: {
        username: '',
        email: '',
        password: '',
        passwordRepeat: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: __WEBPACK_IMPORTED_MODULE_0__utils_validate__["d" /* validateUsername */] }],
        password: [{ required: true, trigger: 'blur', validator: __WEBPACK_IMPORTED_MODULE_0__utils_validate__["b" /* validatePassword */] }],
        email: [{ required: true, trigger: 'blur', validator: __WEBPACK_IMPORTED_MODULE_0__utils_validate__["a" /* validateEmail */] }],
        passwordRepeat: [{ required: true, trigger: 'blur', validator: passwordRepeated }]
      }
    };
  },

  methods: {
    handleRegister: function handleRegister() {
      var _this2 = this;

      this.$refs.registerForm.validate(function (valid) {
        if (valid) {
          _this2.loading = true;

          var username = _this2.registerForm.username;
          _this2.$store.dispatch('RegisterUser', _this2.registerForm).then(function () {
            _this2.loading = false;
            _this2.$emit('registered', username);
          }).catch(function () {
            _this2.loading = false;
          });
        }

        return false;
      });
    }
  }
});

/***/ }),

/***/ "JrF/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-container"},[_c('el-form',{ref:"loginForm",staticClass:"card-box login-form",attrs:{"autoComplete":"on","model":_vm.loginForm,"rules":_vm.loginRules,"label-position":"left"}},[_c('div',{staticClass:"title"},[_c('img',{attrs:{"src":_vm.logo,"alt":"Logo","width":"225px"}})]),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"username"}},[_c('el-input',{attrs:{"name":"username","type":"text","autoComplete":"on","placeholder":"Username"},model:{value:(_vm.loginForm.username),callback:function ($$v) {_vm.$set(_vm.loginForm, "username", $$v)},expression:"loginForm.username"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"password"}},[_c('el-input',{attrs:{"name":"password","type":"password","autoComplete":"on","placeholder":"Password"},nativeOn:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key)){ return null; }_vm.handleLogin($event)}},model:{value:(_vm.loginForm.password),callback:function ($$v) {_vm.$set(_vm.loginForm, "password", $$v)},expression:"loginForm.password"}})],1),_vm._v(" "),_c('el-row',{attrs:{"gutter":10}},[_c('el-col',{attrs:{"span":14,"offset":5}},[_c('el-button-group',[_c('el-button',{staticStyle:{"width":"90px"},attrs:{"type":"success","loading":_vm.loading},nativeOn:{"click":function($event){$event.preventDefault();_vm.handleLogin($event)}}},[_vm._v("Login")]),_vm._v(" "),_c('el-button',{staticStyle:{"width":"90px"},attrs:{"type":"success"},on:{"click":function($event){_vm.showRegistrationForm=true}}},[_vm._v("Register")])],1)],1)],1),_vm._v(" "),_c('br'),_vm._v(" "),_c('el-row',{attrs:{"gutter":25}},[_c('el-col',{attrs:{"span":6,"offset":18}},[_c('router-link',{staticStyle:{"color":"lightgray"},attrs:{"to":"/"}},[_vm._v("\n          Return\n        ")])],1)],1),_vm._v(" "),_c('el-row')],1),_vm._v(" "),_c('el-dialog',{attrs:{"width":"30%","title":"Registration","visible":_vm.showRegistrationForm},on:{"update:visible":function($event){_vm.showRegistrationForm=$event}}},[_c('register',{on:{"registered":_vm.registered}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "RvCN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_button_group_vue__ = __webpack_require__("ZLW0");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_760d75f6_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_button_group_vue__ = __webpack_require__("6Ge7");
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_vue_loader_lib_selector_type_script_index_0_button_group_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__vue_loader_lib_template_compiler_index_id_data_v_760d75f6_hasScoped_false_buble_transforms_vue_loader_lib_selector_type_template_index_0_button_group_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "T+/8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__("m1D0");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3dd2b9c6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__("JrF/");
function injectStyle (ssrContext) {
  __webpack_require__("ZM6h")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3dd2b9c6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3dd2b9c6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "Tvb2":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("/U5g");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("f56d35b6", content, true);

/***/ }),

/***/ "UWiJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_openWindow__ = __webpack_require__("V5Rg");




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'social-signin',
  methods: {
    wechatHandleClick: function wechatHandleClick(thirdpart) {
      this.$store.commit('SET_AUTH_TYPE', thirdpart);
      var appid = 'xxxxx';
      var redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect');
      var url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect';
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_openWindow__["a" /* default */])(url, thirdpart, 540, 540);
    },
    tencentHandleClick: function tencentHandleClick(thirdpart) {
      this.$store.commit('SET_AUTH_TYPE', thirdpart);
      var client_id = 'xxxxx';
      var redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/authredirect');
      var url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri;
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_openWindow__["a" /* default */])(url, thirdpart, 540, 540);
    }
  }
});

/***/ }),

/***/ "V5Rg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = openWindow;


function openWindow(url, title, w, h) {
  var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
  var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

  var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  var left = width / 2 - w / 2 + dualScreenLeft;
  var top = height / 2 - h / 2 + dualScreenTop;
  var newWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

  if (window.focus) {
    newWindow.focus();
  }
}

/***/ }),

/***/ "ZLW0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElButtonGroup'
});

/***/ }),

/***/ "ZM6h":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("wmd7");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("de4994f4", content, true);

/***/ }),

/***/ "bIpF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"social-signup-container"},[_c('div',{staticClass:"sign-btn",on:{"click":function($event){_vm.wechatHandleClick('wechat')}}},[_c('span',{staticClass:"wx-svg-container"},[_c('icon-svg',{staticClass:"icon",attrs:{"icon-class":"weixin"}})],1),_vm._v(" 微信\n  ")]),_vm._v(" "),_c('div',{staticClass:"sign-btn",on:{"click":function($event){_vm.tencentHandleClick('tencent')}}},[_c('span',{staticClass:"qq-svg-container"},[_c('icon-svg',{staticClass:"icon",attrs:{"icon-class":"QQ"}})],1),_vm._v(" QQ\n  ")])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "dZXH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_socialsignin_vue__ = __webpack_require__("UWiJ");
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bef6fce6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_socialsignin_vue__ = __webpack_require__("bIpF");
function injectStyle (ssrContext) {
  __webpack_require__("Tvb2")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-bef6fce6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_socialsignin_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_bef6fce6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_socialsignin_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "exOK":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/logo_gradient.d771d85.svg";

/***/ }),

/***/ "kMct":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ElCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },

  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    }
  },
  render(h) {
    let classList = [];
    let style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`
        );
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        let props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`
          );
        });
      }
    });

    return h(this.tag, {
      class: ['el-col', classList],
      style
    }, this.$slots.default);
  }
});


/***/ }),

/***/ "l28q":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".login-container .el-dialog__body,.login-container .el-dialog__header{background:#223756}.login-container .el-dialog__title{color:#db7f31}", ""]);

// exports


/***/ }),

/***/ "m1D0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_validate__ = __webpack_require__("E4LH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socialsignin__ = __webpack_require__("dZXH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__("12H5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_logo_gradient_svg__ = __webpack_require__("exOK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_logo_gradient_svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_logo_gradient_svg__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_packages_col_src_col__ = __webpack_require__("kMct");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__node_modules_element_ui_packages_button_src_button_group_vue__ = __webpack_require__("RvCN");









/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    ElButtonGroup: __WEBPACK_IMPORTED_MODULE_5__node_modules_element_ui_packages_button_src_button_group_vue__["a" /* default */],
    ElCol: __WEBPACK_IMPORTED_MODULE_4_element_ui_packages_col_src_col__["a" /* default */],
    register: __WEBPACK_IMPORTED_MODULE_2__register__["default"], socialSign: __WEBPACK_IMPORTED_MODULE_1__socialsignin__["default"] },
  name: 'login',
  data: function data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: __WEBPACK_IMPORTED_MODULE_0__utils_validate__["d" /* validateUsername */] }],
        password: [{ required: true, trigger: 'blur', validator: __WEBPACK_IMPORTED_MODULE_0__utils_validate__["b" /* validatePassword */] }]
      },
      loading: false,
      showDialog: false,
      showRegistrationForm: false,
      logo: __WEBPACK_IMPORTED_MODULE_3__assets_logo_gradient_svg___default.a
    };
  },

  methods: {
    registered: function registered(username) {
      this.showRegistrationForm = false;
      this.$message({
        message: 'You have successfully registered on BettingsStats. Now you can login.',
        type: 'success',
        duration: 5 * 1000
      });

      this.loginForm.username = username;
      this.loginForm.password = '';
    },
    handleLogin: function handleLogin() {
      var _this2 = this;

      this.showRegistrationForm = false;
      this.$refs.loginForm.validate(function (valid) {
        if (valid) {
          _this2.loading = true;
          var _this = _this2;
          _this2.$store.dispatch('LoginByUsername', _this2.loginForm).then(function (response) {
            console.log(response);
            console.log('back from login store to views login');
            _this.loading = false;
            _this.$message({
              message: 'Welcome!',
              type: 'success',
              duration: 5 * 1000
            });

            _this.$router.push('/');
          }).catch(function (err) {
            console.log(err);
            _this.loading = false;
            _this.$message({
              message: 'Error! Check your username or password once again.',
              type: 'error',
              duration: 5 * 1000
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  created: function created() {},
  destroyed: function destroyed() {}
});

/***/ }),

/***/ "uARF":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("l28q");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("rjj0")("7ecb7d47", content, true);

/***/ }),

/***/ "wmd7":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("FZ+f")(false);
// imports


// module
exports.push([module.i, ".login-container[data-v-3dd2b9c6]{position:relative;width:100%;height:100%;height:100vh;background-color:#223756}.login-container input[data-v-3dd2b9c6]:-webkit-autofill{-webkit-box-shadow:inset 0 0 0 50px #1e314d;-webkit-text-fill-color:#476b3b}.login-container input[data-v-3dd2b9c6]{background:transparent;border:0;-webkit-appearance:none;border-radius:0;padding:12px 5px 12px 15px;color:#eee;height:47px}.login-container .el-input[data-v-3dd2b9c6]{display:inline-block;height:47px;width:100%}.login-container .tips[data-v-3dd2b9c6]{font-size:14px;color:#fff;margin-bottom:10px}.login-container .svg-container[data-v-3dd2b9c6]{padding:6px 5px 6px 15px;color:#889aa4;vertical-align:middle;width:30px;display:inline-block}.login-container .svg-container_login[data-v-3dd2b9c6]{font-size:20px}.login-container .title[data-v-3dd2b9c6]{font-size:26px;font-weight:400;color:#eee;margin:0 auto 10px;text-align:center;font-weight:700}.login-container .login-form[data-v-3dd2b9c6]{position:absolute;left:0;right:0;width:400px;padding:35px 35px 15px;margin:45px auto 120px}.login-container .el-form-item[data-v-3dd2b9c6]{border:1px solid hsla(0,0%,100%,.1);background:rgba(0,0,0,.1);border-radius:5px;color:#454545}.el-dialog[data-v-3dd2b9c6],.el-dialog__body[data-v-3dd2b9c6],.el-dialog__header[data-v-3dd2b9c6]{background:#223756}.el-dialog__title[data-v-3dd2b9c6]{color:#f99008!important}", ""]);

// exports


/***/ }),

/***/ "zvhe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-container",staticStyle:{"height":"auto"}},[_c('el-form',{ref:"registerForm",staticClass:"card-box",attrs:{"autoComplete":"on","model":_vm.registerForm,"rules":_vm.registerRules,"label-position":"left"}},[_c('el-form-item',{attrs:{"prop":"username"}},[_c('el-input',{attrs:{"name":"username","type":"text","autoComplete":"on","placeholder":"Username"},model:{value:(_vm.registerForm.username),callback:function ($$v) {_vm.$set(_vm.registerForm, "username", $$v)},expression:"registerForm.username"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"email"}},[_c('el-input',{attrs:{"name":"email","type":"text","autoComplete":"on","placeholder":"Email"},model:{value:(_vm.registerForm.email),callback:function ($$v) {_vm.$set(_vm.registerForm, "email", $$v)},expression:"registerForm.email"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"password"}},[_c('el-input',{attrs:{"name":"password","type":"password","autoComplete":"off","placeholder":"Password"},model:{value:(_vm.registerForm.password),callback:function ($$v) {_vm.$set(_vm.registerForm, "password", $$v)},expression:"registerForm.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"prop":"passwordRepeat"}},[_c('el-input',{attrs:{"name":"passwordRepeat","type":"password","autoComplete":"off","placeholder":"Repeat password"},model:{value:(_vm.registerForm.passwordRepeat),callback:function ($$v) {_vm.$set(_vm.registerForm, "passwordRepeat", $$v)},expression:"registerForm.passwordRepeat"}})],1),_vm._v(" "),_c('el-row',{attrs:{"gutter":10}},[_c('el-col',{attrs:{"span":10,"offset":7}},[_c('el-button',{staticStyle:{"width":"100%"},attrs:{"type":"success","loading":_vm.loading},nativeOn:{"click":function($event){$event.preventDefault();_vm.handleRegister($event)}}},[_vm._v("Register")])],1)],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});