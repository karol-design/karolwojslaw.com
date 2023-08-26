document.addEventListener("DOMContentLoaded", function () {
  // Resize sections on window resize
  // $(window).resize(resizeSections);
  // Run all functions once page is loaded
  $(window).on("load", function () {
    splides();
    resizeArticles();
    resizeThemes();
    addNavigation();
  });

  // Hide first up arrow
  $(".up").eq(0).css("color", "#ffffff");
  $(".left").eq(0).css("color", "#ffffff");
  $(".down").eq(-1).css("color", "#ffffff");
  $(".right").eq(-1).css("color", "#ffffff");

  function splides() {
    // Initialize splide for each splide class
    var elms = document.getElementsByClassName("splide");
    for (var i = 0; i < elms.length; i++) {
      var splide = new Splide(elms[i], {
        arrows: true,
        perPage: 1,
        lazyLoad: "sequential",
        interval: 5000,
        autoplay: "pause",
        intersection: {
          inView: {
            autoplay: true,
          },
          outView: {
            autoplay: false,
          },
        },
        video: {
          playerOptions: {
            youtube: {
              loop: false,
              mute: false,
            },
            vimeo: {
              loop: false,
              mute: false,
            },
            htmlVideo: {
              loop: true,
              mute: true,
            },
          },
        },
      });
      splide.mount(window.splide.Extensions);
      splide.on("lazyload:loaded", function () {
        resizeArticles();
        resizeThemes();
      });
    }
  }

  function addNavigation() {
    // Add hrefs to each navigation arrow

    // Get array of themes
    let themes = $(".theme-row")
      .map(function (_, x) {
        return x.id;
      })
      .get();
    themes.unshift("Home");
    themes.push("End");

    // Map elements with class 'up' to themes in array themes. Set href to each theme.
    $(".up").each(function (index) {
      $(this).attr("href", "#" + themes[index]);
    });

    // Map elements with class 'down' to themes in array themes. Set href to each theme.
    $(".down").each(function (index) {
      $(this).attr("href", "#" + themes[index + 2]);
    });

    // Get array of articles
    let articles = $(".article-row")
      .map(function (_, x) {
        return x.id;
      })
      .get();
    articles.unshift("Home");
    articles.push("End");

    // Map elements with class 'left' to articles in array articles. Set href to each article.
    $(".left").each(function (index) {
      $(this).attr("href", "#" + articles[index]);
    });

    // Map elements with class 'right' to articles in array articles. Set href to each article.
    $(".right").each(function (index) {
      $(this).attr("href", "#" + articles[index + 2]);
    });
  }

  function resizeArticles() {
    $(".article-row").each(function () {
      // console.log($(this).children(".article-sticky"));
      let stickyHeight = $(this).children(".article-sticky").eq(0).outerHeight(true);
      // Set margin if page width is greater than 1000px
      if ($(window).width() > 1000) {
        $(this)
          .children(".article-body")
          .eq(0)
          .css("margin-top", -stickyHeight + "px");
      }
    });
  }

  function resizeThemes() {
    $(".theme-row").each(function () {
      // Calculate sum of all article-body heights in theme-row
      let totalHeight = 0;

      // for each article-row in article-column in theme-row
      $(this)
        .children(".article-column")
        .each(function () {
          $(this)
            .children(".article-row")
            .each(function () {
              totalHeight += $(this).children(".article-body").eq(0).outerHeight(true);
              if ($(window).width() < 999) {
                totalHeight += $(this).children(".article-sticky").eq(0).outerHeight(true);
              }
            });
        });
      $(this).height(totalHeight);
    });
  }
});
