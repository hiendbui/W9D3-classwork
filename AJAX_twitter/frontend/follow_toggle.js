const APIUtil = require('./api_util');

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