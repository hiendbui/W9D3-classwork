const FollowToggle = require("./follow_toggle");

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