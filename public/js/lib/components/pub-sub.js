define(['jquery'], function ($) {

    $.subscribe = function(channel, callback) {
        if(channel && channel !== '' && $.isFunction(callback)) {
            var cbWrapper = function() {
                //remove the first parameter
                var params = Array.prototype.slice.call(arguments,1);
                callback.apply(null,params);
            };
            $(window).bind(channel, cbWrapper);
            return cbWrapper;
        }
        return null;
    };

    //unsubscribe
    $.unsubscribe = function(channel, hendler) {
        $(window).unbind(channel, hendler);
    };

    //publish
    $.publish = function(channel, params) {
        if(channel && channel !== '') {
            console.log('publishing to channel: ' + channel);
            $(window).trigger(channel, params);
        }
    };

    return $;
});