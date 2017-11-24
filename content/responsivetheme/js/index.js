
    var swiper1 = new Swiper('.manset', {
		nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });
	
	var swiper2 = new Swiper('.surmanset', {
		nextButton: '#sw-btn-next-surmanset',
        prevButton: '#sw-btn-prev-surmanset',
        pagination: '#sw-pagination-surmanset',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });
	
	var swiper3 = new Swiper('.yazar', {
		nextButton: '#sw-btn-next-yazar',
        prevButton: '#sw-btn-prev-yazar',
        pagination: '#sw-pagination-yazar',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });


	var swiper3 = new Swiper('.fotogaleri', {
		nextButton: '#sw-btn-next-fotogaleri',
        prevButton: '#sw-btn-prev-fotogaleri',
        pagination: '#sw-pagination-fotogaleri',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });	


	var swiper3 = new Swiper('.videogaleri', {
		nextButton: '#sw-btn-next-videogaleri',
        prevButton: '#sw-btn-prev-videogaleri',
        pagination: '#sw-pagination-videogaleri',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        }
    });		
	
function ShareOnFacebook(e){return window.open("https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(e),"facebooksharedialog","toolbar=0,status=0,width=626,height=436"),!1}
function ShareOnTwitter(e,t,o,n){return window.open("https://twitter.com/intent/tweet?hashtags="+o+"&original_referer="+encodeURIComponent(e)+"&related="+o+"&text="+encodeURIComponent(n)+"&url="+encodeURIComponent(e)+"&via="+o,"shareit","toolbar=0,status=0,width=626,height=436"),!1}


/** photoswipe begin **/

		function clearTransition() {
			$(".pswp__container").css({ "transition": "" });
		}

		function setTransition() {
			$(".pswp__container").css({ "transition": "transform 0.35s ease-in-out 0s" });
		}


		$(function(){

			// set transition on arrow keys down
			$(".pswp").on("keydown", function(evt){
				// set transition if arrow keys are used
				if (evt.which == 37 || evt.which == 39)
					setTransition();
			});

			// listen to dragchanged events and set transion on drag end
			$(".pswp__container")
				.on("drag:changed", function(evt, isDragging){

					if (isDragging)
						clearTransition();	// clear transition that was set on mouseUsed event
					else
						setTimeout(setTransition, 500);
				})
				.dragchanged();				// wire plugin so the events will fire
		});


    	$(function(){

    		var pswp = $(".pswp")[0];
    		var slides = [];

			function getSlideDimensions(slide, photoSwipe) {

				if (!slide.doGetSlideDimensions)
					return;

				var img = new Image();

				$(img).on("error", function(evt){

					slide.doGetSlideDimensions = false;
				});

				$(img).on("load", function(evt){

					slide.doGetSlideDimensions = false;

					slide.w = img.naturalWidth;
					slide.h = img.naturalHeight;

					photoSwipe.invalidateCurrItems();
					photoSwipe.updateSize(true);
				});

				img.src = slide.src;
			}

			/** return the thumbnail's bounds for zomm-in and zoom-out animation */
			function getThumbBounds(index) {

				var slide = slides[index];

				var  thumbnail   = slide.$figure.find("a img")//.find("img")
					,thumbOffset = thumbnail.offset()
					,thumbWidth  = thumbnail.width();

				return { x: thumbOffset.left, y: thumbOffset.top, w: thumbWidth };
			}

			$(".photoswipe-gallery")
				.find("figure")
					.each(function(ix, el){
						// parse markup and retrieve slides information from ".photoswipe-gallery figure"
						var  $figure = $(this);
						var  $anchor = $figure.find("a");

						var size = ($anchor.data("size") || "0x0").split("x");
						// var thumbOffset = $figure.offset();

						var slide = {

							 $figure : $figure
							,src     : $anchor.attr("href")
							,w       : size[0]
							,h       : size[1]

							,title   : $figure.find("figcaption").html()
						};

						slide.doGetSlideDimensions = (slide.w == 0 || slide.h == 0);

						slides.push(slide);

						$figure.on("click", function(evt){

							evt.preventDefault();

							var options = {
								 index                 : ix
								,bgOpacity             : 0.85
								,showHideOpacity       : false
								,getThumbBoundsFn      : getThumbBounds
								,showAnimationDuration : 500
								,hideAnimationDuration : 500
							}

							var photoSwipe = new PhotoSwipe(pswp, PhotoSwipeUI_Default, slides, options);


							photoSwipe.listen("gettingData", function(index, slide){

								if (slide.doGetSlideDimensions) {

									setTimeout(
										// use setTimeout to run in the event loop
										 function(){ getSlideDimensions(slide, photoSwipe); }
										,300
									);
								}
							}); // .listen(gettingData)

							photoSwipe.listen("imageLoadComplete", function(index, slide){

								if (slide.doGetSlideDimensions)
									getSlideDimensions(slide, photoSwipe);
							}); // .listen(imageLoadComplete)

							photoSwipe.listen("mouseUsed", setTransition);

							photoSwipe.init();
						});
					}); // .each()

    		// console.dir(slides);


			// prefetch slides images
			for (var i in slides) {

				setTimeout(
					function(url) {
						// console.log("preloading " + url);
						var img = new Image();
						img.src = url;
					}
					,2000 + i*20
					,slides[i].src 	// url argument
				);
			} // for-in
		});
		/** photoswipe   end **/

$(document).bind('contextmenu',function(){
	//sayfaya sağ tıklandığında sayfa bilgilerini gizle
	return false;
	});
		
$(document).ready(function(){
//sayfada yazı seçmeyi engelleme 
	var omitformtags=["input", "textarea", "select"]
	omitformtags=omitformtags.join("|")
		function disableselect(e){
		if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1)
		return false
		}
		function reEnable(){
		return true
		}
		if (typeof document.onselectstart!="undefined")
		document.onselectstart=new Function ("return false")
		else{
		document.onmousedown=disableselect
		document.onmouseup=reEnable
		}		
});	
