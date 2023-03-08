; (function () {

	'use strict';

	var isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};


	var fullHeight = function () {

		if (!isMobile.any()) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function () {
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};

	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 100, 'easeInOutExpo');
					});

				}, 50);

			}

		}, { offset: '85%' });
	};



	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var pieChart = function () {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#92a4a6',
			trackColor: "#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function () {
		if ($('#fh5co-skills').length > 0) {
			$('#fh5co-skills').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(pieChart, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};


	$(function () {
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


	var typingBool = false;
	var typingIdx = 0;
	var liIndex = 0;
	var liLength = $(".typing-txt>ul>li").length;
	var del = -1;
	var repeatInt = null;
	var tyInt = null;


	// 타이핑될 텍스트를 가져온다 
	var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

	typingTxt = typingTxt.split(""); // 한글자씩 자른다. 

	if (typingBool == false) {
		// 타이핑이 진행되지 않았다면 
		typingBool = true;
		tyInt = setInterval(typing, 200); // 첫번재 반복동작 
	}

	function typing() {
		if (typingIdx < typingTxt.length) {
			// 타이핑될 텍스트 길이만큼 반복 
			$(".typing").append(typingTxt[typingIdx]);
			// 한글자씩 이어준다. 
			typingIdx++;
			if (typingIdx == typingTxt.length) {
				//첫번째 단어가 써지면 1분쉰다.
				clearInterval(tyInt);
				setTimeout(function () {
					tyInt = setInterval(typing, 200);
				}, 1000);
			}
		} else {

			//한문장이끝나면
			if (-typingTxt.length - 1 < del) {
				//한글자씩 지운다.
				$(".typing").html(typingTxt.slice(0, del))
				del--;
			} else {
				if (liIndex >= liLength - 1) {
					liIndex = 0;
				} else {
					liIndex++;
				}

				//변수초기화 
				typingIdx = 0;
				del = -1;
				typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

				//1분후 다음분장 타이핑 
				clearInterval(tyInt);
				setTimeout(function () {
					tyInt = setInterval(typing, 200);
				}, 1000);
			}


		}
	}
}());