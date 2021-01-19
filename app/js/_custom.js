document.addEventListener("DOMContentLoaded", function() {
  //  Slider price
  $(".range-price").slider({
      range: true,
      min: 0,
      max: 500,
      step: 5,
      values: [20, 125],
      slide: function slide(event, ui) {
          $(".js-price-low").val(ui.values[0] + "р.");
          $(".js-price-high").val(ui.values[1] + "р.");
      }
  });
  $(".js-price-low").val($(".range-price").slider("values", 0) + "р.");
  $(".js-price-high").val($(".range-price").slider("values", 1) + "р.");

  $('.js-price-low').click(function () {
      $(".js-price-low").val('');
  });
  $('.js-price-high').click(function () {
      $(".js-price-high").val('');
  });

  $('.js-price-low').change(function () {
      if ($('.js-price-low').val() >= parseInt($('.js-price-high').val())) {
          return false;
      } else {
          $(".range-price").slider({
              range: true,
              min: 0,
              max: 500,
              step: 1,
              values: [Math.round(parseInt($(".js-price-low").val()) / 10) * 10, Math.round(parseInt($(".js-price-high").val()) / 10) * 10],
              slide: function slide(event, ui) {
                  $(".js-price-low").val(ui.values[0] + "р.");
                  $(".js-price-high").val(ui.values[1] + "р.");
              }
          });
      }
  });
  $('.js-price-high').change(function () {
      if ($('.js-price-high').val() <= parseInt($('.js-price-low').val())) {
          return false;
      } else {
          $(".range-price").slider({
              range: true,
              min: 0,
              max: 500,
              step: 1,
              values: [Math.round(parseInt($(".js-price-low").val()) / 10) * 10, Math.round(parseInt($(".js-price-high").val()) / 10) * 10],
              slide: function slide(event, ui) {
                  $(".js-price-low").val(ui.values[0] + "р.");
                  $(".js-price-high").val(ui.values[1] + "р.");
              }
          });
      }
  });

  //  Slider volume
  $(".range-volume").slider({
      range: true,
      min: 0,
      max: 4,
      step: 0.1,
      values: [0.5, 1.1],
      slide: function slide(event, ui) {
          $(".amount-volume").text(ui.values[0] + "л" + " - " + ui.values[1] + "л");
      }
  });
  $(".amount-volume").text($(".range-volume").slider("values", 0) + "л" + " - " + $(".range-volume").slider("values", 1) + "л");

  //  Slider params
  $(".range-param").slider({
      range: true,
      min: 0,
      max: 4,
      step: 0.1,
      values: [1, 3.4],
      slide: function slide(event, ui) {
          $(".amount-param").text(ui.values[0] + "%" + " - " + ui.values[1] + "%");
      }
  });
  $(".amount-param").text($(".range-param").slider("values", 0) + "%" + " - " + $(".range-param").slider("values", 1) + "%");

  // owl-carousel slider catalog
  $(".js-owl-slider").owlCarousel({
      nav: false,
      // navText: [ '&nbsp;', '&nbsp;' ],
      dots: false,
      // margin:20,
      loop: true,
      autoHeight: true,
      responsiveClass:true,
      responsive: {
          0: {
              items: 1
          },
          452: {
              items: 2
          },
          751: {
              items: 3
          },
          992: {
              items: 4
          },
          1200: {
              items: 5
          }
      }
  });

  // owl slider bombay
  $(".js-bombay-slider").owlCarousel({
      nav: true,
      navText: [ '&nbsp;', '&nbsp;' ],
      // margin:20,
      loop: true,
      dots: true,
      autoHeight: true,
      responsiveClass: true,
      responsive: {
          0: {
              items: 1
          }
      }
  });

  // question popup
  const popupQuestions = document.querySelectorAll('.og-see-details');
  for (let item of popupQuestions) {
    item.addEventListener('click', function (e) {
      const left = this.getBoundingClientRect().left;
      const top = this.getBoundingClientRect().top;
      const popup = item.firstElementChild;
      const popupLink = item.querySelectorAll('a');
      const popupClose = item.querySelector('.og-close');
      if ( item !== e.target ) {
        if (popupClose === e.target || (e.target.tagName === 'SPAN')) {
          item.classList.remove('og-active');
        }
        if (popupLink === e.target) return;
        return false;
      }
      if (item.classList.contains('og-active')) {
        for (let popupItem of popupQuestions) {
          popupItem.classList.remove('og-active');
        }
      } else {
        for (let popupItem of popupQuestions) {
          popupItem.classList.remove('og-active');
        }
        item.classList.toggle('og-active');
      }
      const popupWidth = popup.offsetWidth;
      const popupHeight = popup.offsetHeight;
      const questionWidth = item.offsetWidth;
      const popupPosition = document.documentElement.clientWidth - left - questionWidth;
      if (top < popupHeight) {
        item.classList.add('bottom');
      } else {
        item.classList.remove('bottom');
      }
      if (popupPosition < popupWidth / 2) {
        popup.style.marginLeft = -(popupWidth - popupPosition) + 'px';
      } else {
        popup.style.marginLeft = -(popupWidth / 2) + 'px';
      }
    });
  }

  /* Og tooltip close */
  $(document).bind("mouseup touchend", function (e) {
      var popupQuestion = $('.og-see-details');
      if (!popupQuestion.is(e.target) && popupQuestion.has(e.target).length === 0) {
          $('.og-see-details').removeClass('og-active');
      }
  });

  /* Params popup close */
  $(document).bind("mouseup touchend", function (e) {
      var paramBodyTip = $('.js-parametrs-popup');
      if (!paramBodyTip.is(e.target) && paramBodyTip.has(e.target).length === 0) {
          $('.parametrs-popup_text').removeClass('show');
      }
  });

  $(document).on('click','.js-videoPoster',function(e) {
    //отменяем стандартное действие button
    e.preventDefault();
    var poster = $(this);
    // ищем родителя ближайшего по классу
    var wrapper = poster.closest('.js-videoWrapper');
    videoPlay(wrapper);
  });

  //вопроизводим видео, при этом скрывая постер
  function videoPlay(wrapper) {
    var iframe = wrapper.find('.js-videoIframe');
    // Берем ссылку видео из data
    var src = iframe.data('src');
    // скрываем постер
    wrapper.addClass('videoWrapperActive');
    // подставляем в src параметр из data
    iframe.attr('src',src);
  }

  // smooth scroll
  $('.menu-envato-link').on('click', function(e) {
      if (this.hash !== "") {
          e.preventDefault();

          var hash = this.hash;

          $('html, body').animate({
              scrollTop: $(hash).offset().top
          }, 800, function(){
              window.location.hash = hash;
          });
      }
  });

  //styling select
  $('select').styler();

  // Closing additional menu on tablet on click
  document.onclick = function (e) {
      if ($(e.target).parents('nav .main-menu').length == 0 && window.innerWidth < 992 && window.innerWidth > 767) {
          for (var i = 0; i < sub_menu.length; i++) {
              var sub_menu_elem = sub_menu[i];
              sub_menu_elem.classList.remove('opened');
              sub_menu_elem.parentElement.classList.remove('active');
          }
      }
  };

  // Main menu navigation
  var nav_link = document.querySelectorAll('.top-menu_link');
  for (var i = 0; i < nav_link.length; i++) {
      nav_link[i].onclick = function () {
          if (this.parentElement.classList.contains('active')) {
              return false;
          }

          var el = nav_link[0].parentElement;
          while (el) {
              if (el.tagName === "LI") {
                  el.classList.remove('active');
              }
              el = el.nextElementSibling;
          }
          this.parentElement.classList.add('active');
      };
  }

  // Switch tabs home page
  var tabs_main = document.querySelectorAll('.tabs .tab');
  for (var i = 0; i < tabs_main.length; i++) {
      tabs_main[i].onclick = function () {
          var tabs_main_link = document.querySelector('.tab.active');
          tabs_main_link.setAttribute('aria-selected', false);
          tabs_main_link.classList.remove('active');
          this.classList.add("active");
          this.setAttribute('aria-selected', true);

          var tab = this.getAttribute('data-tab');
          var elements = document.getElementsByClassName("tab_content");
          for (var i = 0; i < elements.length; i++) {
              elements[i].classList.remove('active');
              elements[i].setAttribute('aria-hidden', true);
          }
          document.getElementById(tab).classList.add('active');
          document.getElementById(tab).setAttribute('aria-hidden', false);
      };
  }

  // Switch tabs catalog page
  var tabs_catalog = document.querySelectorAll('.catalog_tabs a');
  for (var i = 0; i < tabs_catalog.length; i++) {
      tabs_catalog[i].onclick = function () {
          document.querySelector('.catalog_tabs .active').setAttribute('aria-selected', false);
          document.querySelector('.catalog_tabs .active').classList.remove('active');
          this.classList.add("active");
          this.setAttribute('aria-selected', true);

          var tab = this.getAttribute('data-tab');
          var elements = document.getElementsByClassName("catalog_block");
          for (var i = 0; i < elements.length; i++) {
              elements[i].classList.remove('active');
              elements[i].setAttribute('aria-hidden', true);
          }
          document.getElementById(tab).classList.add('active');
          document.getElementById(tab).setAttribute('aria-hidden', false);
      };
  }

  // Switch tabs product card page
  var tabs_comment = document.querySelectorAll('.comments_link');
  for (var i = 0; i < tabs_comment.length; i++) {
      tabs_comment[i].onclick = function () {
          var tabs_comment_active = document.querySelector('.comments_link.active');
          tabs_comment_active.setAttribute('aria-selected', false);
          tabs_comment_active.classList.remove('active');
          this.classList.add("active");
          this.setAttribute('aria-selected', true);

          var tab = this.getAttribute('data-tab');
          var elements = document.getElementsByClassName("comments_tab");
          for (var i = 0; i < elements.length; i++) {
              elements[i].classList.remove('active');
              elements[i].setAttribute('aria-hidden', true);
          }
          document.getElementById(tab).classList.add('active');
          document.getElementById(tab).setAttribute('aria-hidden', false);
      };
  }

  // Switch tabs personal area
  var tabs_private = document.querySelectorAll('.private-tabs li');
  for (var i = 0; i < tabs_private.length; i++) {
      tabs_private[i].onclick = function () {
          var tabs_private_active = document.querySelector('.private-tabs .active');
          tabs_private_active.setAttribute('aria-selected', false);
          tabs_private_active.classList.remove('active');
          this.classList.add("active");
          this.setAttribute('aria-selected', true);

          var tab = this.getAttribute('data-tab');
          var elements = document.getElementsByClassName("private-block");
          for (var i = 0; i < elements.length; i++) {
              elements[i].classList.remove('active');
              elements[i].setAttribute('aria-hidden', true);
          }
          document.getElementById(tab).classList.add('active');
          document.getElementById(tab).setAttribute('aria-hidden', false);
      };
  }

  // Sidebar. Toggle links
  var elemsInner = document.querySelectorAll(".catalog_inner-list li");
  var sidebar_link = document.querySelectorAll('.catalog_inner-link');
  for (var i = 0; i < sidebar_link.length; i++) {
      sidebar_link[i].onclick = function (e) {
          e.preventDefault();
          var outerLi = this.parentElement;
          var innerList = outerLi.querySelector('.catalog_inner-list');
          if (outerLi.classList.contains('active')) {
              outerLi.classList.remove('active');
              if (innerList !== null) {
                  innerList.classList.remove('opened');
                  innerList.style.maxHeight = null;
              }
              return false;
          }
          var elems = document.getElementsByClassName("catalog_inner-item");
          for (var i = 0; i < elems.length; i++) {
              if (elems[i].classList.contains('active')) {
                  elems[i].classList.remove('active');
                  var innerListUl = elems[i].querySelector('.catalog_inner-list');
                  if (innerListUl !== null) {
                      innerListUl.classList.remove('opened');
                      innerListUl.style.maxHeight = null;
                  }
              }
          }
          for (var i = 0; i < elemsInner.length; i++) {
              if (elemsInner[i].classList.contains('active')) {
                  elemsInner[i].classList.remove('active');
              }
          }
          outerLi.classList.add('active');
          if (innerList !== null) {
              innerList.style.maxHeight = innerList.scrollHeight + innerList.offsetHeight + "px";
              innerList.classList.add('opened');
          }
      };
  }

  // $('.catalog_inner-link').click(function(e) {
  //     e.preventDefault();
  //     if ($(this).parent().hasClass('active')) {
  //         $(this).parent().find('.catalog_inner-list').fadeToggle('100');
  // 				$(this).parent().removeClass('active');
  //         return false;
  //     }
  //     $('.catalog_inner .catalog_inner-item.active').removeClass('active').find('.catalog_inner-list').fadeOut('100');
  //     $(this).parent().addClass('active');
  //     $(this).parent().find('.catalog_inner-list').fadeIn('100');
  // });

  var sidebar_in_link = document.querySelectorAll('.catalog_inner-list a');
  for (var i = 0; i < sidebar_in_link.length; i++) {
      sidebar_in_link[i].onclick = function (e) {
          e.preventDefault();
          if (this.parentElement.classList.contains('active')) {
              return false;
          }
          for (var i = 0; i < elemsInner.length; i++) {
              if (elemsInner[i].classList.contains('active')) {
                  elemsInner[i].classList.remove('active');
              }
          }
          this.parentElement.classList.add('active');
      };
  }

  // $('.catalog_inner-list a').click(function(e) {
  //     e.preventDefault();
  //     if ($(this).parent().hasClass('active')) {
  //         return false;
  //     }
  //     $('.catalog_inner-list .active').removeClass('active');
  //     $(this).parent().addClass('active');
  // });

  // Burger main menu
  var burger_main = document.querySelector('.js-collapse');
  var burger_main_menu = document.querySelector('.js-main-menu');
  if (burger_main !== null) {
      burger_main.onclick = function () {
          if (this.classList.contains('collapsed')) {
              burger_main_menu.style.maxHeight = null;
              this.classList.remove('collapsed');
          } else {
              burger_main_menu.style.maxHeight = burger_main_menu.scrollHeight + "px";
              this.classList.add('collapsed');
          }
          this.classList.toggle('change');
      };
  }

  // Burger sidebar menu
  var burger_catalog = document.querySelectorAll('.js-catalog');
  for (var i = 0; i < burger_catalog.length; i++) {
      var burger_catalog_menu = document.querySelector('.js-catalog-menu');
      burger_catalog[i].onclick = function () {
          if (this.classList.contains('collapsed')) {
              burger_catalog_menu.classList.remove('opened');
              this.classList.remove('collapsed');
          } else {
              burger_catalog_menu.classList.add('opened');
              this.classList.add('collapsed');
          }
          this.classList.toggle('change');
      };
  }

  var sub_menu = document.querySelectorAll('.main-menu_item .sub-menu');

  window.addEventListener("resize", function (e) {
    if (window.innerWidth < 768 && burger_main_menu !== null ) {
        burger_main_menu.style.maxHeight = null;
        burger_main.classList.remove('collapsed');
        burger_main.classList.remove('change');
    }

    var b_catalog_menu = document.querySelectorAll('.js-catalog-menu');
    if (window.innerWidth < 768) {
      for (var i = 0; i < b_catalog_menu.length; i++) {
          b_catalog_menu[i].classList.remove('opened');
      }
      for (var i = 0; i < burger_catalog.length; i++) {
          burger_catalog[i].classList.remove('collapsed');
          burger_catalog[i].classList.remove('change');
      }
    }

    if (window.innerWidth >= 992 || window.innerWidth <= 767) {
        // $('.main-menu_item .sub-menu').removeClass('opened').parent().removeClass('active');
        for (var i = 0; i < sub_menu.length; i++) {
            var sub_menu_elem = sub_menu[i];
            sub_menu_elem.classList.remove('opened');
            sub_menu_elem.parentElement.classList.remove('active');
        }
    }
  });

  // Dropdown menu on click on resolution 768 - 991
  var menu_link = document.querySelectorAll('.js-main-menu .main-menu_link');
  for (var i = 0; i < menu_link.length; i++) {
      menu_link[i].onclick = function (e) {
          if (window.innerWidth >= 768 && window.innerWidth <= 991) {
              if (this.parentElement.classList.contains('active')) {
                  return false;
              }
              var elems = document.getElementsByClassName('main-menu_item');
              for (var i = 0; i < elems.length; i++) {
                  if (elems[i].classList.contains('active')) {
                      elems[i].classList.remove('active');
                      elems[i].querySelector('.sub-menu').classList.remove('opened');
                  }
              }
              this.parentElement.classList.add('active');
              this.parentElement.querySelector('.sub-menu').classList.add('opened');
              e.preventDefault();
          }
      };
  }

  // show more block
  const listShowMore = document.querySelectorAll('.product_description-right li');
  listShowMore.forEach((item, i) => {
    if ( i >= 3) {
      item.classList.add('invisible');
    }
  });

  document.addEventListener('click', function (e) {
    const buttonShowMore = document.querySelector('.product_description-right .all');
    let target = e.target;
    if ( target !== buttonShowMore ) return;
    if ( target.classList.contains('show') ) {
      target.classList.remove('show');
      target.innerHTML = 'Показать еще магазины';
      listShowMore.forEach((item, i) => {
        if ( i >= 3) {
          item.classList.add('invisible');
        }
      });
    } else {
      target.innerHTML = 'Скрыть лишние';
      target.classList.add('show');
      listShowMore.forEach((item, i) => {
        item.classList.remove('invisible');
      });
    }
  });

  // Quantity of products input
  var productQuantity = document.querySelector("input[name='prodQuantity']");

  if (productQuantity !== null) {
      var maxQuantity = parseInt(productQuantity.getAttribute('maxQ'));
      var minQuantity = parseInt(productQuantity.getAttribute('minQ'));
      var plusButton = document.querySelector('.js-amount-up');
      var minusButton = document.querySelector('.js-amount-down');
      plusButton.onclick = function () {
          var b = parseInt(productQuantity.value, 10);
          if (b >= maxQuantity) {
              this.setAttribute('disabled', 'disabled');
          } else {
              this.nextElementSibling.removeAttribute('disabled');
              b++;
              productQuantity.value = b;
          }
      };
      minusButton.onclick = function () {
          var b = parseInt(productQuantity.value, 10);
          if (b <= minQuantity) {
              this.setAttribute('disabled', 'disabled');
          } else {
              this.previousElementSibling.removeAttribute('disabled');
              b--;
              productQuantity.value = b;
          }
      };
  }

  // hidden block
  var checkBox = document.querySelectorAll('.price-block_inner input[type="checkbox"]');
  var checkBoxHiddenBlock = document.querySelectorAll('.parametrs-block-hidden');
  var button_more = document.querySelectorAll('.js-more');

  for (var i = 0; i < checkBox.length; i++) {
      checkBox[i].onchange = function () {
          if (this.checked) {
              checkBoxHiddenBlock[0].classList.add('open');
              button_more[0].classList.add('open');
              checkBoxHiddenBlock[0].style.height = checkBoxHiddenBlock[0].scrollHeight + "px";
              this.parentElement.childNodes[3].replaceWith("Отключить все");
              return;
          } else {
              checkBoxHiddenBlock[0].classList.remove('open');
              button_more[0].classList.remove('open');
              checkBoxHiddenBlock[0].style.height = null;
              this.parentElement.childNodes[3].replaceWith("Включить все");
          }
      };
  }

  for (var i = 0; i < button_more.length; i++) {
      button_more[i].onclick = function () {
          var hiddenBlock = this.parentElement.previousElementSibling;
          if (this.classList.contains('open')) {
              this.classList.remove('open');
              hiddenBlock.classList.remove('open');
              hiddenBlock.style.height = null;
              for (var i = 0; i < checkBox.length; i++) {
                  checkBox[i].checked = false;
                  checkBox[i].parentElement.childNodes[3].replaceWith("Включить все");
              }
          } else {
              this.classList.add('open');
              hiddenBlock.classList.add('open');
              hiddenBlock.style.height = hiddenBlock.scrollHeight + "px";
              for (var i = 0; i < checkBox.length; i++) {
                  checkBox[i].checked = true;
                  checkBox[i].parentElement.childNodes[3].replaceWith("Отключить все");
              }
          }
          return false;
      };
  }

  // reset checkboxes
  var parametrsCheckbox = document.querySelectorAll('.parametrs-block-left input[type="checkbox"]');
  var parametrsRadio = document.querySelectorAll('.parametrs-block-left input[type="radio"]');
  for (var i = 0; i < parametrsCheckbox.length; i++) {
    parametrsCheckbox[i].checked = false;
  }
  for (var i = 0; i < parametrsRadio.length; i++) {
    parametrsRadio[i].checked = false;
  }


  // window resizing on hidden block
  window.addEventListener("resize", function (e) {
    for (var i = 0; i < checkBoxHiddenBlock.length; i++) {
        if ( (window.innerWidth < 1200) && (checkBoxHiddenBlock[i].classList.contains('open')) ) {
            checkBoxHiddenBlock[i].style.height = "auto";
        } else if ( (window.innerWidth > 1200) && (checkBoxHiddenBlock[i].classList.contains('open')) ) {
            checkBoxHiddenBlock[i].style.height = checkBoxHiddenBlock[i].scrollHeight + "px";
        } else {
            checkBoxHiddenBlock[i].style.height = null;
        }
    }
  });

  /* Popup review */
  document.addEventListener('mouseup', function (e) {
    const modal = document.querySelector('.popup_recall');
    if (e.target !== modal && e.target.getAttribute('data-close') !== 'close' ) return;
    modal.classList.remove('show');
    modal.classList.add('hiding');
    const popup_body = document.querySelector('.popup_body');
    sleep(400).then(function() {
      modal.classList.remove('hiding');
      popup_body.remove();
    });
    document.body.classList.remove('show');
  });

  document.addEventListener('click', function (e) {
    let target = e.target;
    let action = target.getAttribute('data-open');
    if (action !== 'open') return;
    sleep(600).then(function() {
      const popup_body = document.querySelector('.popup_recall');
      popup_body.classList.add('show');
      document.body.classList.add('show');
      const content = `<div class="popup_body">
                      <span class="close js-close" role="button" data-close="close"></span>
                      <div class="popup_content">
                        <div class="popup_header">
                          <h2>поделитесь вашим мнением</h2>
                        </div>
                        <form name="comment_form" class="form" data-thank="Спасибо. Ваше мнение принято.">
                          <div class="form-group">
                            <input name="com_name" class="required" id="comment-name" type="text" placeholder="Ваше имя">
                            <span id="com_name" class="error">Введите имя</span>
                          </div>
                          <div class="form-group">
                            <textarea name="com_area" id="comment-message" placeholder="Ваше сообщение"></textarea>
                            <span class="error">Введите текстовое сообщение</span>
                          </div>
                          <button class="btn btn-active" type="submit">Оставить комментарий</button>
                        </form>
                      </div>
                    </div>`;
      popup_body.insertAdjacentHTML('beforeend', content );
    });
  });

  // Parametrs popup
  const paramPopupClose = document.querySelectorAll('.js-parametrs-popup .close');
  const paramPopupsBody = document.querySelector('.js-parametrs');
  document.addEventListener('click', function (e) {
    if (!e.target.matches('.js-parametrs-popup') && !e.target.matches('.parametrs-popup_icon') && !e.target.matches('.js-parametrs-close')) return;
    let target = e.target.closest('div.js-parametrs-popup');
    let tabPopup = target.getAttribute('data-popup');
    const paramBodyTips = document.getElementsByClassName('parametrs-popup_text');

    if (target.lastElementChild.classList.contains('show')) {
      for (let item of paramBodyTips) {
        item.classList.remove('show');
      }
    } else {
      for (let item of paramBodyTips) {
        item.classList.remove('show');
      }
      document.getElementById(tabPopup).classList.add('show');
    }

    for (let item of paramPopupClose) {
      if (item === e.target) {
        target.parentElement.classList.remove('show');
      }
    }
    if (target.getBoundingClientRect().top < document.getElementById(tabPopup).offsetHeight) {
      document.getElementById(tabPopup).classList.add('bottom');
    } else {
      document.getElementById(tabPopup).classList.remove('bottom');
    }
  });

  // Items click to like icon
  var likeIcons = document.querySelectorAll('.like');
  for (var i = 0; i < likeIcons.length; i++) {
      likeIcons[i].onclick = function (e) {
          e.preventDefault();
          if (this.classList.contains('like-checked')) {
              this.classList.remove('like-checked');
              this.classList.remove('icon-like-checked');
              this.classList.add('icon-like');
          } else {
              this.classList.add('like-checked');
              this.classList.add('icon-like-checked');
          }
      };
  }

  // Click to Image
  document.addEventListener('click', function (e) {
    let target = e.target;
    const productImg = document.querySelector('.product_image img');
    if (target !== productImg) return;
    const modalImgWrap = document.querySelector('.product_image + .modal');
    const captionText = document.createElement('div');
    const modalImg = document.createElement('img');
    const modalClose = document.querySelector('.modal .close');
    modalImgWrap.classList.add('open');
    modalImg.src = target.src;
    modalImg.classList.add('modal-content');
    captionText.classList.add('modal-caption');
    captionText.innerHTML = target.alt;
    modalImgWrap.insertAdjacentElement('afterbegin', captionText );
    modalImgWrap.insertAdjacentElement('afterbegin', modalImg );
    modalImgWrap.onclick = function(e) {
      let target = e.target;
      if ( target !== modalImg ) {
        modalImgWrap.classList.remove('open');
        modalImg.remove();
        captionText.remove();
      }
    }
  });

  // Accordion
  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('accordion-head') || target.dataset === 'tooltip') {
      let targetDivHead = target.closest('div');
      let nextElem = targetDivHead.nextElementSibling;
      if (targetDivHead.classList.contains('active')) {
        nextElem.classList.remove('open');
        nextElem.style.maxHeight = null;
        targetDivHead.classList.remove('active');
      } else {
        const acc_head = document.getElementsByClassName('accordion-head');
        for (let item of acc_head) {
          item.classList.remove('active');
        }
        const acc_body = document.getElementsByClassName('accordion-body');
        for (let item of acc_body) {
          item.classList.remove('open');
          item.style.maxHeight = null;
        }
        targetDivHead.classList.add('active');
        nextElem.classList.add('open');
        nextElem.style.maxHeight = nextElem.scrollHeight + 'px';
      }
    }
  });

  // tooltip on hover
  let tooltipElem;
  document.onmouseover = function (e) {
    let target = e.target;
    let tooltipText = target.getAttribute('data-tooltip');
    if (!tooltipText) return;

    tooltipElem = document.createElement('div');
    tooltipElem.classList.add('tooltip');
    tooltipElem.innerHTML = tooltipText;
    tooltipElem.insertAdjacentHTML('afterbegin', '<span>немного </span>');
    target.insertAdjacentElement('afterend', tooltipElem);
  };

  document.onmouseout = function (e) {
    let target = e.target;
    if (tooltipElem) {
      tooltipElem.remove();
      tooltipElem = null;
    }
  };

  var field = document.querySelectorAll('#field-for-circle');
  var ball = document.getElementById('circle');

  for (var i = 0; i < field.length; i++) {
      field[i].onclick = function (e) {
          // координаты поля относительно окна
          var fieldCoords = this.getBoundingClientRect();

          // координаты левого-верхнего внутреннего угла поля
          var fInCoordTop = fieldCoords.top + this.clientTop;
          var fInCoordLeft = fieldCoords.left + this.clientLeft;

          ballCoordTop = e.clientY - fInCoordTop - ball.clientHeight / 2;
          ballCoordLeft = e.clientX - fInCoordLeft - ball.clientWidth / 2;

          if (ballCoordTop < 0) {
              ballCoordTop = 0;
          }

          if (ballCoordLeft < 0) {
              ballCoordLeft = 0;
          }

          if (ballCoordLeft + ball.clientWidth > this.clientWidth) {
              ballCoordLeft = this.clientWidth - ball.clientWidth;
          }

          if (ballCoordTop + ball.clientHeight > this.clientHeight) {
              ballCoordTop = this.clientHeight - ball.clientHeight;
          }

          ball.style.left = ballCoordLeft + 'px';
          ball.style.top = ballCoordTop + 'px';
      };
  }

  const thumbs = document.querySelector('.thumbs');
  if (thumbs !== null) {
    thumbs.addEventListener('click',(e) => {
      e.preventDefault();
      let target = event.target.closest('a');
      if (!target) return;

      largeImg.src = target.href;
      largeImg.alt = target.title;
    });
  }

  //Forms
  var formParam = document.forms.form_params;

  if (formParam !== undefined) {
      var selectformParam = formParam.elements.marka;
      selectformParam.selectedIndex = 3;
  }

  var footerForm = document.forms.form_footer;
  if (footerForm !== undefined) {
      var inputFooterForm = footerForm.elements.password;
      var checkBoxFooterForm = footerForm.elements.show;
  }

  if (checkBoxFooterForm !== undefined) {
      checkBoxFooterForm.onchange = function () {
          if (inputFooterForm.type === "password") {
              inputFooterForm.type = "text";
              checkBoxFooterForm.nextElementSibling.innerHTML = 'Скрыть';
          } else {
              inputFooterForm.type = "password";
              checkBoxFooterForm.nextElementSibling.innerHTML = 'Показать';
          }
      };
  }

  //Todo list
  const list = document.querySelector('.my-list');
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('my-list-li')) {
      e.target.classList.toggle('checked');
    }
  }, false);

  function closeListELement(selector) {
    const closeElem = document.querySelectorAll(selector);
    for (let item of closeElem) {
      item.onclick = function () {
        item.parentElement.remove();
      };
    }
  }

  closeListELement('.my-list .close');

  document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.classList.contains('my-list-add')) {
      const li = document.createElement('LI');
      const inputValue = document.querySelector('.myInput').value;
      const t = document.createTextNode(inputValue);
      li.classList.add('my-list-li');
      li.append(t);
      if (inputValue !== '') {
        list.append(li);
      }

      document.querySelector('.myInput').value = '';

      const mylistTask = document.querySelectorAll('.my-list-li');
      for (let item of mylistTask) {
        let spanElem = document.createElement('SPAN');
        spanElem.classList.add('close');
        item.append(spanElem);
      }

      closeListELement('.my-list .close');
    }
  });

  // sub menu links on hover
  for (var i = 0; i < sub_menu.length; i++) {
      sub_menu[i].onmouseover = function (e) {
          var target = e.target;
          if (target.tagName == 'A') {
              target.setAttribute('title', target.innerHTML);
              target.classList.add('hovered');
          }
      };
      sub_menu[i].onmouseout = function (e) {
          var target = e.target;
          if (target.tagName == 'A') {
              target.removeAttribute('title', target.innerHTML);
              target.classList.remove('hovered');
          }
      };
  }

  // fixed navigation menu
  const fixedNavBtn = document.getElementsByClassName('js-fixed-nav_btn');
  const overlayBack = document.querySelector('.overlay');
  const fixedNavClose = document.querySelector('.js-fixed-nav_close');

  for (let item of fixedNavBtn) {
    item.addEventListener('click', function (e) {
      document.querySelector('.js-fixed-nav').classList.add('opened');
      document.body.classList.add('fixed-nav-open');
      const fixedNavBtnOpen = document.querySelector('.js-fixed-nav_btn.open');
      const tab = document.querySelector(`.js-tabs_tab[data-tab=${this.dataset.tab}]`);
      const fixedNavBtnMenu = document.querySelector('.js-tabs_tab.open');
      if ( fixedNavBtnOpen !== null) {
        fixedNavBtnOpen.classList.remove('open');
      }
      if ( fixedNavBtnMenu !== null) {
        fixedNavBtnMenu.classList.remove('open');
      }
      tab.classList.add('open');
      this.classList.add('open');
    });
  }
  document.addEventListener('click', function (e) {
    let target = e.target;
    if ( target !== overlayBack && target !== fixedNavClose ) return;
    document.querySelector('.js-fixed-nav').classList.remove('opened');
    document.body.classList.remove('fixed-nav-open');
    document.querySelector('.js-fixed-nav_btn.open').classList.remove('open');
    document.querySelector('.js-tabs_tab.open').classList.remove('open');
  });

  //Sticky header
  function stickyHeader() {
      // Get the header
      var header = document.getElementsByClassName("bg-grey");
      // Get the offset position of the header

      if (header[0] !== undefined) {
          var sticky = header[0].offsetTop;
      }

      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      for (var i = 0; i < header.length; i++) {
          if (scrollTop > sticky && window.innerWidth >= 992) {
              header[i].classList.add("sticky");
              header[i].parentElement.classList.add("sticky");
          } else {
              header[i].classList.remove("sticky");
              header[i].parentElement.classList.remove("sticky");
          }
      }
  };
  window.addEventListener("scroll", stickyHeader);

  window.addEventListener("resize", function (e) {
    var header = document.getElementsByClassName("bg-grey");
    if (window.innerWidth < 992) {
        for (var i = 0; i < header.length; i++) {
            header[i].classList.remove("sticky");
            header[i].parentElement.classList.remove("sticky");
        }
    }
  });

  window.onscroll = function () {
      var buttonUp = document.getElementsByClassName("js-up");
      for (var i = 0; i < buttonUp.length; i++) {
          if (window.pageYOffset > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
              buttonUp[i].classList.add('up');
          } else {
              buttonUp[i].classList.remove('up');
          }
          buttonUp[i].onclick = function () {
              window.pageYOffset = 0;
              document.documentElement.scrollTop = 0;
          };
      }
  };

  window.onload = function () {
      var preLoader = document.getElementsByClassName('preloader');
      sleep(0).then(function() {
        for (var i = 0; i < preLoader.length; i++) {
            preLoader[i].style.display =  'none';
        }
      });
  };


  window.addEventListener('click', function (e) {
    const dropdownButton = document.querySelector('.dropdown_button');
    if (e.target !== dropdownButton) return;
    const dropdownBlock = document.getElementsByClassName('dropdown_content');
    for (let openDropdown of dropdownBlock) {
      openDropdown.classList.toggle('show');
    }
  });

  window.addEventListener('click', function (e) {
    if (!e.target.matches('.dropdown_button')) {
      const dropdownBlock = document.getElementsByClassName('dropdown_content');
      for (let openDropdown of dropdownBlock) {
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  });

});

function sleep(ms) {
  return new Promise(function(resovle){
    setTimeout( function() {
      resovle();
    }, ms);
  });
}

// Promise.all([sleep(4000), sleep(2000)]).then(function() {
//   console.log('All promises');
// });
//
// Promise.race([sleep(1000), sleep(2000)]).then(function() {
//   console.log('race promise');
// });

const delay = ( wait = 1000) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout( () => {
      resolve();
    }, wait)
  });
  return promise;
}

const getData = () => new Promise( resolve => resolve([1,1,2,3,5,8,13]));

// delay(2500)
//   .then(() => {
//     console.log('After 2.5s');
//   })
//   .catch( error => { console.error('Error', error);})
//   .finally(() => { console.log('Finally');});
async function asyncExample() {
  try {
    await delay(300);
    const data = await getData();
    console.log('Data', data);
  } catch(e) {
    console.log(e);
  } finally {
    console.log('Finally');
  }
}

asyncExample();

let url = 'http://jsonplaceholder.typicode.com/todos';

async function fetchAsyncTodos() {
  console.log('Fetch todo started');
  await delay(600);
  var response = await fetch(url);
  var data = await response.json();

  var dataObjectInner = document.querySelectorAll(".timeline-item p");
  for (var j = 0; j < dataObjectInner.length; j++) {
    dataObjectInner[j].innerHTML = '';
    var dataContent = data[j].title;
    var dataContentSpan = '<span>' + data[j].completed + '</span>';
    if (dataObjectInner[j] !== null) {
      dataObjectInner[j].insertAdjacentHTML("afterbegin", dataContent);
      dataObjectInner[j].insertAdjacentHTML("afterend", dataContentSpan);
    }
  }

  console.log('DATA:', data );
}

fetchAsyncTodos();

$('.ui-card .bombay-btn:first-child').hover(function(){
  $(this).parents('.ui-card').find('.ui-card-image').addClass('hover');
}, function(){
  $(this).parents('.ui-card').find('.ui-card-image').removeClass('hover');
});
