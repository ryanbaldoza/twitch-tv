$.fn.extend({
animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }

});

$(window).load(function () {
  var all = true;
  var on = true;
  var off = true;
  var channelNames = ["kalcedonyx", "mumusiraneitor", "chelleastro", "sirscoots", "exbc", "OgamingSC2", "cretetion", "RobotCaleb", "storbeck", "freecodecamp", "ESL_SC2", "meteos", "brunofin", "comster404", "syndicate", "riotgames", "summit1g", "esl_csgo", "nightblue3", "imaqtpie", "lirik", "sodapoppin", "tsm_bjergsen", "captainsparklez", "Tsm_dyrus", "joshog", "goldglove", "gosu", "castro_1021", "boxbox"];

  for(i=0;i<channelNames.length;i++){
    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + channelNames[i] + '/?callback=?').then(function(json) {
      if(json.status == 404){
        var arr = json.message.split(" ");
        var chanName = arr[1].replace(/["']/g, "");
        var html = '<div class="bs-calltoaction bs-calltoaction-default not-exist all">';
          html += '<div class="row">';
          html += '<div class="col-md-12 cta-contents text-center" style="border:0;">';
          html += '<h3 class="cta-title">'+chanName+'</h3>';   
          html += '<div id="tvshape" class="cta-tv-img" style="background-image: url(https://cdn.pbrd.co/images/4xS3yr9pD.png);"></div>';  
          html += '<p class="text-center">'+json.message+' or owner has closed the account.</p';   
          html += '</div></div>';
          $(".output").append(html);
      }  else {
        $.getJSON('https://api.twitch.tv/kraken/streams/' + json._id + '?client_id=uunztvf1km2sufh91mnk44yhaw6aww&api_version=5').then(function(data) {   
         prependHtml(json,data);    
        })
         
      }
    })
  }     

function prependHtml(json, data){
 if(json.display_name){
    
          if(data.stream){
            var html = '<div class="bs-calltoaction bs-calltoaction-default online all">';
          } else {
            var html = '<div class="bs-calltoaction bs-calltoaction-default offline all">';
          }
          html += '<div class="row">';
          html += '<div class="col-md-6 cta-contents text-center">';
          if(json.logo){
          html += '<h3 class="cta-title">'+json.display_name+'</h3><img class="user-img" src="'+json.logo+'" alt="'+json.display_name+'" />';              
          } else {
          html += '<h3 class="cta-title">'+json.display_name+'</h3><img class="user-img" src="https://www.dapd.net/content/uploads/2012/08/DAP_Icon_Twitch-400x400.jpg" alt="'+json.display_name+'" />';      
          }
          html += '<div class="cta-desc">';
          if(json.status){
          html += '<p class="text-center" style="width:100%">'+json.status+'</p>';   
          } 
          html += '<p class="cta-followers"><strong>Followers: </strong>'+json.followers+'</p>';
          html += '<p class="cta-followers"><strong>Total Views: </strong>'+json.views+'</p>';
          
          html += '</div></div>';
          html += '<div class="col-md-6 cta-button cta-tv" >';
          if(data.stream) {
            if(!json.video_banner){
            html += '<div id="tvshape" class="cta-tv-img" style="background-image: url(https://cdn.pbrd.co/images/3SgtLKCMA.jpg);"></div>';  
            } else {
              html += '<div id="tvshape" class="cta-tv-img" style="background-image: url('+data.stream.preview.medium+');"></div>';
            }
          html += '<p class="text-center cta-views"><strong>'+data.stream.game+'</strong></p>';   
          html += '<p class="text-center cta-views"><strong>Watching Now:</strong> '+data.stream.viewers+' </p>';  
          html += '<a href="'+json.url+'" target="_blank" class="btn btn-md btn-block btn-success cta-partner"><i class="fa fa-power-off "></i> Online</a>';  
          } else {
          html += '<div id="tvshape" class="cta-tv-img" style="background-image: url(https://media.giphy.com/media/EXHXTLY7ntczK/giphy.gif);"></div>';
          html += '<a href="'+json.url+'" target="_blank" class="btn btn-md btn-block btn-danger cta-partner"><i class="fa fa-power-off"></i> Offline</a>';  
          }
          
          html += '</div></div></div>';
       
  
      $(".output").append(html);
  
      var sortClass = $('.output').find('.bs-calltoaction').sort(sortMe);
      function sortMe(a, b) {
          return a.className < b.className;
      }
      $('.output').append(sortClass);
       setTimeout(function(){
      $('.se-pre-con').slideUp('slow',function () {
                });
       },500); 
      $(".all").show().animateCss("fadeInUp");
     all = false;
 }  
}  
  

$('#onlineBtn').on('click', function(){
  if($(".bs-calltoaction").hasClass('online')){
   if(on == true) {
   on = false;
   all = true;
   off = true;  
   $(".all").hide();
   $(".bs-calltoaction").hide();
   $(".btnMenu").attr("disabled", true);
   $(".online").show().animateCss("fadeInUp");
   $(".btnMenu").attr("disabled", false);
   } 
 }
});
$('#offlineBtn').on('click', function(){
  $(".btnMenu").attr("disabled", true);
  if($(".bs-calltoaction").hasClass('offline')){
   if(off == true) {
   off = false;
   all = true;
   on = true;  
   $(".all").hide();
   $(".bs-calltoaction").hide();
   $(".offline").show().animateCss("fadeInUp");
   $(".btnMenu").attr("disabled", false);
  }
 }
});  

$('#allBtn').on('click', function(){
  $(".btnMenu").attr("disabled", true);
   if(all == true) {
   all = false;
   off = true;
   on = true;  
    var sortClass = $('.output').find('.bs-calltoaction').sort(sortMe);
      function sortMe(a, b) {
          return a.className < b.className;
      }
     
      $(".all").show().animateCss("fadeInUp");
      $('.output').append(sortClass);
     $(".btnMenu").attr("disabled", false);
   }   
});  
  
$(".btnMenu").on('click', function() {
  $(".btnMenu").removeClass("active");
  $(this).addClass("active");
  $('input').val("");
  $(".nothing").hide();
  $(".btnMenu").attr("disabled", false);
});
});    
//search
$('.search-query').each(function() {
  var elem = $(this);
  var searchQuery = elem.val();
 
  elem.bind("propertychange change keyup keypress input paste blur", function(event){
     
           $(".btnMenu").removeClass("active");
           $("#allBtn").addClass("active");
          if(searchQuery != elem.val()) {
                searchQuery = elem.val().toUpperCase();
                $('.all').hide();
           var ctaArr = [];

            $('.bs-calltoaction').each(function(){
              $(this).removeClass('found');
               $(this).removeClass('not-found');
              var ctaTitle = $(this).find('h3').text().toUpperCase();

               if(ctaTitle.search(searchQuery) !== -1){
                  $(this).addClass("found");
                 ctaArr.push("in");
               } else{
                 ctaArr.push("out");
               }

              if(jQuery.inArray("in", ctaArr) !== -1) {
                 $('.found').show();
                 $(".nothing").hide();  
              } else {
                 $('.nothing').show();
              } 
            })
          } else if (!searchQuery) {
            $('.all').show();
            $(".nothing").hide();
          } 
   });
 });


//Scroll to Top
$(function(){
 
    $(document).on( 'scroll', function(){
 
    	if ($(window).scrollTop() > 100) {
			$('.scroll-top-wrapper').addClass('show');
		} else {
			$('.scroll-top-wrapper').removeClass('show');
		}
	});
 
	$('.scroll-top-wrapper').on('click', scrollToTop);
});
 
function scrollToTop() {
	verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
	element = $('body');
	offset = element.offset();
	offsetTop = offset.top;
	$('html, body').animate({scrollTop: offsetTop}, 500, 'linear');
}


