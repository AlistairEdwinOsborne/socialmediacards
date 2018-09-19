$.getJSON('http://private-cc77e-aff.apiary-mock.com/posts', function (data) {
    var jsonObject = data;
    var postObj = [];
    
    for (var key in jsonObject.items) {
        var myobj = jsonObject.items[key];
        postObj.push(myobj);
    }
    
       for (var i=1;i < postObj.length;i++) {
        if(postObj[i].service_name == "Manual"){
           manualCard(postObj[i]);
        } else if(postObj[i].service_name == "Twitter"){

             twitterCard(postObj[i]);   
            
        } 
        
        
    }
    
});


$(document).ready(function () {

    
    
});

/* Data from manual card
item_data.text
item_data.link
item_data.link_text
item_data.image_url
service_name
*/
var manualCard = function(Object){
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4"></div>');
        var myPanel = $('<div class="card card-outline-info" id="'+Object.item_id+'Panel"><div class="card-block"><img class="card-img-top" src="images/ali.jpg" alt="Card image cap"><div class="card-body"><p class="card-text">'+Object.item_data.text+'</p></div><div class="card-body"><a href="'+Object.item_data.link+'" class="card-link" target="_blank">'+Object.item_data.link_text+'</a></div></div></div></div><div class="card-footer text-muted">Published on: '+Object.item_published+'</div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
}
/* Data from Twitter card
item_data.tweet
item_data.user.name
item_data.user.username
item_data.user.avatar
*/
var twitterCard = function(Object){
    var myCol = $('<div class="col-lg-4 col-md-16 col-sm-6 col-xs-6 align-items-stretch mt-4 text-center"></div>');
        var myPanel = $('<div class="card card-outline-info" id="'+Object.item_id+'Panel"><div class="card-block"><img class="rounded-circle" src="images/ali.jpg" alt="Card image cap"><div class="card-title">@'+Object.item_data.user.username+'</div><div class="card-body"><p class="card-text">'+Object.item_data.tweet+'</p></div><div class="card-body"></div></div></div></div></div>');
        myPanel.appendTo(myCol);
        myCol.appendTo('#contentPanel');
}
/* Data from Instagram card

*/
