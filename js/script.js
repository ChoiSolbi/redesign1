$(function () {
  // =====mobile
  const mBtn = $(".mb-btn"),
    mNav = $(".nav"),
    mSubMenu = $(".mb-subMenu"),
    mMenuLi = $(".mb-menu > li"),
    mMenuLi_a = $(".mb-mainMenu");

  mBtn.click(function (e) {
    e.preventDefault();

    // 모바일 메뉴 열기
    mBtn.toggleClass("open");
    mNav.toggleClass("open");
    // $("html,body").css("overflow", "hidden");

    // 초기값 설정
    mSubMenu.hide();
    mMenuLi_a.removeClass("on");

    //모바일 서브메뉴 열고 닫기
    $.each(mMenuLi, function (index, item) {
      let depth1 = $(this).find(".mb-mainMenu");
      depth1.click(function (e) {
        e.preventDefault();
        let temp = $(this).hasClass("on");
        if (temp) {
          $(this).removeClass("on");
          $(this).next().stop().slideUp();
          $(this).removeClass("on");
        } else {
          mMenuLi.removeClass("on");
          mSubMenu.stop().slideUp();
          mMenuLi_a.removeClass("on");
          $(this).next().stop().slideDown();
          $(this).addClass("on");
        }
      });
    });
  });

  // 리사이즈(960px 이상)되면 모바일메뉴 제거
  $(window).resize(
    $.throttle(1000 / 15, function () {
      let winWidth = $(window).width();
      if (winWidth > 960) {
        mBtn.removeClass("open");
        mNav.removeClass("open");
      }
    })
  );

  // =====header
  const header = $("header"),
    nav = $("nav"),
    subMenu = $(".subMenu");

  let headerHeight = header.outerHeight();
  let subMenuHeight = getMaxSubMenuHeight();

  // 서브메뉴 높이 설정
  function getMaxSubMenuHeight() {
    let maxSubMenuHeight = 0;
    subMenu.each(function () {
      const height = $(this).outerHeight();
      if (height > maxSubMenuHeight) {
        maxSubMenuHeight = height;
      }
    });
    return maxSubMenuHeight;
  }
  // 마우스 가져다둘때
  nav.mouseenter(function () {
    header.css("height", `${headerHeight + subMenuHeight}px`);
  });
  // 마우스 뗄때
  nav.mouseleave(function () {
    header.css("height", `${headerHeight}px`);
  });

  // Resize 이벤트 핸들러
  function resizeHandler() {
    header.css("height", "");
    headerHeight = header.outerHeight();
    // 서브메뉴 높이 업데이트
    subMenuHeight = getMaxSubMenuHeight();
  }

  $(window).resize($.throttle(1000 / 15, resizeHandler));

  //=====visual
  var bullet = ["쏟아지는 혜택", "Dr.햄스트롱 런칭", "신규 건초 이벤트"];
  let bannerSlide = new Swiper(".sw-visual", {
    autoplay: {
      delay: 3000,
      dosableOnInteraction: false,
    },
    loop: true,
    speed: 1500,
    effect: "fade",
    pagination: {
      el: ".sw-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return (
          '<div class="' +
          className +
          '"><span>' +
          bullet[index] +
          "</span></div>"
        );
      },
    },
  });

  // =====recommend

  //tab-menu
  const tabMenu = $(".tabMenu li"),
    swProd = $(".sw-prod");

  tabMenu.click(function (e) {
    e.preventDefault();
    tabMenu.removeClass("on");
    $(this).addClass("on");
    // swProd.hide();
    let targetIdx = $(this).index();
    // swProd.eq(targetIdx).show();
    swProd.removeClass("focus");
    swProd.eq(targetIdx).addClass("focus");
  });
  tabMenu.eq(0).trigger("click");

  // slide
  new Swiper(".sw-prod", {
    autoplay: false,
    loop: true,
    slidesPerView: 4,
    spaceBetween: 40,
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: ".pre-button",
      nextEl: ".next-button",
    },
    breakpoints: {
      1200: { slidesPerView: 4 },
      960: { slidesPerView: 3, spaceBetween: 30 },
      750: { slidesPerView: 3, spaceBetween: 20 },
      480: { slidesPerView: 2, spaceBetween: 20 },
      // 385: { slidesPerView: 2, spaceBetween: 20 },
      0: { slidesPerView: 1 },
    },
  });

  //===== new
  $(".heart").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("click");
  });
  $(".cart").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("click");
  });

  //===== notice
  const tabArea = $(".treadmill .box"),
    tabSign = $(".hamster-chat .hamster-img"),
    tabImg = $(".tab-image a");

  tabArea.mouseenter(function (e) {
    e.preventDefault();
    //기본 제거
    tabArea.removeClass("on");
    tabSign.hide();
    tabImg.hide();
    //마우스올리는 부분 나오게 하기
    $(this).addClass("on");
    let targetI = $(this).index();
    tabSign.eq(targetI).show();
    tabImg.eq(targetI).show();
  });
  //tabSign.eq(0).trigger("click");
  tabImg.eq(0).trigger("click");
  tabSign.not(":eq(0)").hide();

  //=====top(화면위로 이동)
  $(".goTop").click(function () {
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });

  // =====search
  const searchBt = $(".search-mag");
  const search = $(".search-wrap");

  // 검색버튼 클릭 시 검색창 나오고 사라지기
  searchBt.click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    search.stop().fadeToggle();
    searchBt.toggleClass("active");

    // active 가지고 있는지 확인하여 바꿔주기
    let temp = searchBt.hasClass("active");
    if (temp) {
      $(this).find("span").css("background-image", "url(images/icon-x-w.png)");
    } else {
      $(this)
        .find("span")
        .css("background-image", "url(images/icon-magnifier-w.png)");
    }
  });
  //body 클릭 시 검색창 사라지게
  $("body").click(function () {
    search.stop().fadeOut();
    searchBt
      .find("span")
      .css("background-image", "url(images/icon-magnifier-w.png)");
    searchBt.removeClass("active");
  });

  //검색창 클릭시 검색창 사라지는 것 막기
  $(".search-wrap").click(function (e) {
    e.stopPropagation();
  });

  // =====AOS
  AOS.init({
    duration: 1000,
    once: true,
    easing: "ease-in",
  });
});
