$(document).ready(function () {
  $(".item").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
  $(".toggle-mnu").click(function () {
    $(this).toggleClass("on");
    $(".main_mnu").slideToggle();
  });
  //Таймер обратного отсчета
  //Документация: http://keith-wood.name/countdown.html
  //<div class="countdown" date-time="2015-01-07"></div>
  var austDay = new Date($(".countdown").attr("date-time"));
  $(".countdown").countdown({ until: austDay, format: "yowdHMS" });

  //Попап менеджер FancyBox
  //Документация: http://fancybox.net/howto
  //<a class="fancybox"><img src="image.jpg" /></a>
  //<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
  $(".fancybox").fancybox();

  //Навигация по Landing Page
  //$(".top_mnu") - это верхняя панель со ссылками.
  //Ссылки вида <a href="#contacts">Контакты</a>
  $(".top_mnu").navigation();

  //Добавляет классы дочерним блокам .block для анимации
  //Документация: http://imakewebthings.com/jquery-waypoints/
  $(".block").waypoint(
    function (direction) {
      if (direction === "down") {
        $(".class").addClass("active");
      } else if (direction === "up") {
        $(".class").removeClass("deactive");
      }
    },
    { offset: 100 }
  );

  //Плавный скролл до блока .div по клику на .scroll
  //Документация: https://github.com/flesler/jquery.scrollTo
  $("a.scroll").click(function () {
    $.scrollTo($(".div"), 800, {
      offset: -90,
    });
  });

  //Каруселька
  //Документация: http://owlgraphic.com/owlcarousel/
  var owl = $(".carousel");
  owl.owlCarousel({
    items: 4,
  });
  owl.on("mousewheel", ".owl-wrapper", function (e) {
    if (e.deltaY > 0) {
      owl.trigger("owl.prev");
    } else {
      owl.trigger("owl.next");
    }
    e.preventDefault();
  });
  $(".next_button").click(function () {
    owl.trigger("owl.next");
  });
  $(".prev_button").click(function () {
    owl.trigger("owl.prev");
  });

  //Кнопка "Наверх"
  //Документация:
  //http://api.jquery.com/scrolltop/
  //http://api.jquery.com/animate/
  $("#top").click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });

  //Аякс отправка форм
  //Документация: http://api.jquery.com/jquery.ajax/
  /*$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});*/

  $("form-element").submit(function () {
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message");
    var formTitle = $(formNm).find(".form-title");
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: formNm.serialize(),
      success: function (data) {
        // Вывод сообщения об успешной отправке
        message.html(data);
        formTitle.css("display", "none");
        setTimeout(function () {
          formTitle.css("display", "block");
          message.html("");
          $("input").not(":input[type=submit], :input[type=hidden]").val("");
        }, 3000);
      },
      error: function (jqXHR, text, error) {
        // Вывод сообщения об ошибке отправки
        message.html(error);
        formTitle.css("display", "none");
        setTimeout(function () {
          formTitle.css("display", "block");
          message.html("");
          $("input").not(":input[type=submit], :input[type=hidden]").val("");
        }, 3000);
      },
    });
    return false;
  });
});
var $contactForm = $("#contact-form");
var $buttonsWrap = $(".button-wrap");

$contactForm.submit(function (e) {
  e.preventDefault();
  $.ajax({
    url: "//formspree.io/amamenko@ukr.net",
    method: "POST",
    data: $(this).serialize(),
    dataType: "json",
    beforeSend: function () {
      $buttonsWrap.append(
        '<div class="alert alert--loading">Sending message…</div>'
      );
    },
    success: function (data) {
      $contactForm.find(".alert--loading").hide();
      alert("Message sent!");
    },
    error: function (err) {
      console.log(err);
      $contactForm.find(".alert--loading").hide();
      alert("Ops, there was an error.");
    },
  });
});
