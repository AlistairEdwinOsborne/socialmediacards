$(document).ready(function () {
    fetchJson();
});

//fetch json from endpoint as im not familiar with apiary/rest api's 
var fetchJson = function () {
    const url = 'http://private-cc77e-aff.apiary-mock.com/posts';
    fetch(url).then(response => {
        return response.json();

    }).then(function (data) {
        let posts = data.items;
        var count = 0;
        for (key in posts) {
            count++;
            if (posts[key].service_name == "Manual") {
                manualCard(posts[key], key);
            } else if (posts[key].service_name == "Twitter") {
                twitterCard(posts[key], key);
            } else if (posts[key].service_name == "Instagram") {
                instagramCard(posts[key], key);
            } else {
                console.log("null object");
            }
        }
        loadMore();
        $('.card-text').html(function (_, html) {
            return html.replace(/(\#\w+)/g, '<span class="red">$1</span>');
        });
        $('.card-text').html(function (_, html) {
            return html.replace(/(\@\w+)/g, '<span class="red">$1</span>');
        });
        $("img").each(function () {
            $(this).attr("onerror", "this.src='images/default.png'");
        });
        $('.hidden').slice(0, 10).removeClass("hidden");

    }).catch(err => {
        //handle errors here
    });
}

//Update the page if needed
var previous = null;
var current = null;
setInterval(function () {
    $.getJSON('http://private-cc77e-aff.apiary-mock.com/posts', function (json) {
        current = JSON.stringify(json);
        if (previous && current && previous !== current) {
            console.log('refresh');
            location.reload();
        }
        console.log("checking for updates");
        previous = current;
    });
}, 5000);


/*load more afterwards*/

/* Data from manual card
item_data.text
item_data.link
item_data.link_text
item_data.image_url
service_name
*/
var manualCard = function (Object, num) {
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4 manual hidden"></div>');
    var myPanel = $('<div class="card card-outline-info" id="' + Object.item_id + 'Panel"><img src="images/aff.png" class="card-logo"><div class="card-block"><img class="card-img-top" src="' + Object.item_data.image_url + '" alt="Card image cap"><div class="card-body"><p class="card-text">' + Object.item_data.text + '</p></div><div class="card-body"><a href="' + Object.item_data.link + '" class="card-link" target="_blank">' + Object.item_data.link_text + '</a></div></div></div></div><div class="card-footer text-muted">Published on: ' + Object.item_published + '</div></div>');
    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    $('.manual').linkify({
        target: "_blank"
    });
}
/* Data from Twitter card
item_data.tweet
item_data.user.name
item_data.user.username
item_data.user.avatar
*/
var twitterCard = function (Object, num) {
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4 text-center twitter hidden"></div>');
    var myPanel = $('<div class="card card-outline-info" id="' + Object.item_id + 'Panel"><img src="images/twitter.png" class="card-logo"><div class="card-block"><img class="rounded-circle" src="' + Object.item_data.user.avatar + '" alt="Card image cap"><div class="card-title">@' + Object.item_data.user.username + '</div><div class="card-body"><p class="card-text">' + Object.item_data.tweet + '</p></div><div class="card-body"></div></div></div></div><div class="card-footer text-muted">Published on: ' + Object.item_published + '</div></div>');
    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    $('.twitter').linkify({
        target: "_blank"
    });

}
/* Data from Instagram card
item_data.user.username
item_data.image.large
item_data.tags
item_data.caption
*/
var instagramCard = function (Object, num) {
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4 instagram hidden"></div>');
    var myPanel = $(' <div class="card card-outline-info" id="' + Object.item_id + 'Panel"><img src="images/instagram.png" class="card-logo"><div class="card-block"><img class="card-img-top" src="' + Object.item_data.image.large + '" alt="Card image cap"><div class="card-title text-center">@' + Object.item_data.user.username + '</div><div class="card-body"><p class="card-text">' + Object.item_data.caption + '</p></div><div class="card-body"></div></div></div>');
    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    $('.instagram').linkify({
        target: "_blank"
    });
}
/* load more element
 */
var loadMore = function () {
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4 load"></div>');
    var myPanel = $(' <div class="card card-outline-info" id="Panel"><div class="card-block"><button type="button" class="btn btn-block btn-primary loadmore">Load More</button></div></div>');
    myPanel.appendTo(myCol);
    myCol.appendTo('#contentPanel');
    $('.loadmore').click(function () {
        if ($('.hidden').length === 0) {
            $('.load').hide();
        } else {
            $(".hidden").slice(0, 10).removeClass("hidden");
        }
    });
}

$('.manualtoggle').click(function () {
    var clicks = $(this).data('clicks');
    if (clicks) {
        $('.manualtoggle').css("background", "#234b8c");
        $('.manual').fadeIn();
    } else {
        $('.manualtoggle').css("background", "#f4f4f4");
        $('.manual').fadeOut();
    }
    $(this).data("clicks", !clicks);
});

$('.instagramtoggle').click(function () {
    var clicks = $(this).data('clicks');
    if (clicks) {
        $('.instagramtoggle').css("background", "#234b8c");
        $('.instagram').fadeIn();
    } else {
        $('.instagramtoggle').css("background", "#f4f4f4");
        $('.instagram').fadeOut();
    }
    $(this).data("clicks", !clicks);
});

$('.twittertoggle').click(function () {
    var clicks = $(this).data('clicks');
    if (clicks) {
        $('.twittertoggle').css("background", "#234b8c");
        $('.twitter').fadeIn();
    } else {
        $('.twittertoggle').css("background", "#f4f4f4");
        $('.twitter').fadeOut();
    }
    $(this).data("clicks", !clicks);
});