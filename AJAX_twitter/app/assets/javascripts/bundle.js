/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

const APIUtil = {
    followUser: function(id) {
        return $.ajax({
            url: `/users/${id}/follow`,
            type: 'POST',
            dataType: 'JSON'
        });
    },
    
    unfollowUser: function(id) {
        return $.ajax({
            url: `/users/${id}/follow`,
            type: 'DELETE',
            dataType: 'JSON'
        });
    }
}

module.exports = APIUtil;

/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 53:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const APIUtil = __webpack_require__(/*! ./api_util */ "./frontend/api_util.js");

function FollowToggle (el) {
    this.$el = $(el);
    this.userId = this.$el.data("user-id");
    this.followState = this.$el.data("initial-follow-state");
    this.$el.append(this.render());
    this.handleClick();
}

FollowToggle.prototype.render = function() {
    if (this.followState === false) {
        return 'Follow!';
    } else {
        return 'Unfollow!';
    }
}

FollowToggle.prototype.handleClick = function() {
    const that = this
    this.$el.click(function(e) {
        console.log("handling click!");
        e.preventDefault();
        
        if (that.followState === false) {
            
            that.followState = "following";
            that.$el.empty();
            that.$el.append(that.render());
            APIUtil.followUser(that.userId)
            .then(function () {
                that.followState = true;
                console.log("post success!");
            })
            .fail(function () {
                console.log("post fail!");
            });
            
        } else if (that.followState === true) {
            that.followState = "unfollowing";
            that.$el.empty();
            that.$el.append(that.render());
            APIUtil.unfollowUser(that.userId)
            .then(function () {
                that.followState = false;
            });
        } else {
            
        }
    })
}

module.exports = FollowToggle;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
const FollowToggle = __webpack_require__(/*! ./follow_toggle */ "./frontend/follow_toggle.js");

function makeFollowToggles () {
    $followToggles = $("button.follow-toggle");

    $followToggles.each(
        function(idx, ele) {
            new FollowToggle(ele);
        }   
    )
}
window.addEventListener('DOMContentLoaded', makeFollowToggles);
// makeFollowToggles();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map