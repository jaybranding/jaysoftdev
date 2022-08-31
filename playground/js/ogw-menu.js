$(function () {
  var menuAPI = "https://jaysoft.dev/playground/data/menu-ogw.json";

  //get json and print
  $.getJSON(menuAPI, {
    format: "json",
    async: true,
  }).done(function (data) {
    //loop menu main
    var mainmenu = "";
    var mainmenum =
      "<div class=navmhead>" +
      '<a href="/"><img width="156" height="37" src="https://ogawa.cdn.jaysoft.asia/wp-content/uploads/2022/01/Logo-Ogawa.png.webp" class="attachment-full size-full" alt="" srcset="https://ogawa.cdn.jaysoft.asia/wp-content/uploads/2022/01/Logo-Ogawa.png.webp 156w,https://ogawa.cdn.jaysoft.asia/wp-content/uploads/2022/01/Logo-Ogawa-150x37.png.webp 150w,https://ogawa.cdn.jaysoft.asia/wp-content/uploads/2022/01/Logo-Ogawa-18x4.png.webp 18w" sizes="(max-width: 156px) 100vw, 156px"></a>' +
      "<div id='closenavm'>" +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg>' +
      "</div></div>";
    var pathnameLang = window.location.pathname.slice(0, 4); // Returns path only (/path/example.html)

    var popupm = "";

    var submenuCol1 = "";
    var submenuCol2 = "";

    //loop 1st
    $.each(data, function (i, item) {
      mainmenu =
        mainmenu +
        "<div class=menu-item link=" +
        [i] +
        ">" +
        data[i].navigation.title +
        "</div>";

      //mobile
      mainmenum =
        mainmenum +
        "<itemm class=itemm link=" +
        [i] +
        ">" +
        data[i].navigation.title +
        '<span class="icon icoright"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg></span></itemm>' +
        "<subitemms link=" +
        [i] +
        ">";

      submenuCol1 = submenuCol1 + "<wrapper1 link=" + [i] + ">";

      // loop 2nd
      $.each(data[i].navigation.item, function (j, item) {
        ariacontrols = [i] + "-" + [j];
        submenuCol1 =
          submenuCol1 +
          "<item aria-controls=" +
          ariacontrols +
          "><i class='fas fa-caret-right'></i>" +
          data[i].navigation.item[j].title +
          "</item>";
        submenuCol2 =
          submenuCol2 +
          "<wrapper2 aria-controls=" +
          ariacontrols +
          " link=" +
          [i] +
          ">";
        submenuCol2 = submenuCol2 + "<div class=left>";
        submenuCol2 =
          submenuCol2 + `<img src=${data[i].navigation.item[j].imgURL} />`;
        submenuCol2 = submenuCol2 + "</div>";
        submenuCol2 = submenuCol2 + "<div class=right><ul>";

        //menu mobile sub

        mainmenum =
          mainmenum +
          "<subitemm aria-controls=" +
          ariacontrols +
          ">" +
          "<img src=" +
          data[i].navigation.item[j].imgURL +
          " />" +
          "<h4>" +
          data[i].navigation.item[j].title +
          "</h4>" +
          "</subitemm>";

        //popup menu

        popupm =
          popupm +
          "<wrapperm aria-controls=" +
          ariacontrols +
          " ><container>" +
          "<div class='close left' aria-controls=" +
          ariacontrols +
          ">" +
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>' +
          " Menu</div> <div class='close right' aria-controls=" +
          ariacontrols +
          '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/></svg></div>' +
          "<div class=image><img src=" +
          data[i].navigation.item[j].imgURL +
          " /></div>" +
          "<h4>" +
          data[i].navigation.item[j].title +
          "</h4>";
        //loop 3rd
        $.each(data[i].navigation.item[j].menu, function (x, item) {
          if (pathnameLang == "/en/") {
            pathURL = "/en" + data[i].navigation.item[j].menu[x].URL;
          } else {
            pathURL = "/en" + data[i].navigation.item[j].menu[x].URL;
          }
          submenuCol2 =
            submenuCol2 +
            `<li><a href="${pathURL}"><i class="fas fa-caret-right"></i>${data[i].navigation.item[j].menu[x].text}</a></li>`;

          //popup menu
          popupm =
            popupm +
            `<li><a href="${pathURL}">
          <i class="fas fa-caret-right"></i>
        ${data[i].navigation.item[j].menu[x].text}</a></li>`;
        });

        popupm =
          popupm +
          "</container><overlay aria-controls=" +
          ariacontrols +
          "></overlay></wrapperm>"; // closing m
        submenuCol2 = submenuCol2 + "</ul></div>"; //closing right
        submenuCol2 = submenuCol2 + "</wrapper2>"; //cloding wrapper2
      });

      submenuCol1 = submenuCol1 + "</wrapper1>"; //close reapper1
      mainmenum =
        mainmenum +
        "<collection><a href='/mua-sam'>Bộ Sưu Tập</a></collection></subitemms>";
    });

    //action after success
    /*
  function getWindowDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = (width / height) * 100;
    return { width, height, ratio };
  }

  const { width } = getWindowDimensions();

  if (width < 769) {
    //mobile & tablet
    $("render-mobile navm").html(mainmenum);
    $("render-mobile popupm").html(popupm);
    $("render-desktop").remove();
  } else {
    //desktop
    $("render-desktop nav").html(mainmenu);
    var rowhtml =
      "<div id=col1>" +
      submenuCol1 +
      "</div><div id=col2>" +
      submenuCol2 +
      "</div>";
    $("render-desktop sub .row").html(rowhtml);
    //$("render-desktop #col1").html(submenuCol1);
    //$("render-desktop #col2").html(submenuCol2);
    $("render-mobile").remove();
  }
*/
    $("render-mobile navm").html(mainmenum);
    $("render-mobile popupm").html(popupm);
    $("render-desktop nav").html(mainmenu);
    var rowhtml =
      "<div id=col1>" +
      submenuCol1 +
      "</div><div id=col2>" +
      submenuCol2 +
      "</div>";
    $("render-desktop sub .row").html(rowhtml);

    //action of menu
    //$("sub").hide();
    $("wrapper1").hide();
    $("wrapper2").hide();

    $(".menu-item").mouseenter(function () {
      $("wrapper1").hide();
      $("wrapper2").hide();
      $("#menu-main-container").hide();

      obj = $(this).attr("link");
      $("wrapper1[link=" + obj + "]").slideDown();
      $("wrapper1[link=" + obj + "] item").removeClass("itemselect");
      $("wrapper1[link=" + obj + "] item")
        .first()
        .addClass("itemselect");

      $("wrapper2[link=" + obj + "]")
        .first()
        .slideDown();
    });
    $("sub").mouseleave(function () {
      /* obj = $(this).attr("link");
    $("wrapper1[link=" + obj + "]").slideUp();
    $("wrapper2[link=" + obj + "]")
      .first()
      .slideUp();*/

      $("wrapper1").slideUp();
      $("wrapper2").slideUp();
      $("#menu-main-container").slideUp();
    });

    $("wrapper1 item").click(function () {
      $("wrapper2").hide();
      $("item").removeClass("itemselect");
      $(this).addClass("itemselect");
      obj = $(this).attr("aria-controls");
      $("wrapper2[aria-controls=" + obj + "]").fadeIn();
    });

    //action of menu mobile
    $("subitemms").hide();
    //$("wrapperm").hide();
    $("itemm").click(function () {
      obj = $(this).attr("link");
      $("subitemms[link=" + obj + "]").slideToggle();
    });

    //$("wrapperm").addClass("dismissnav");

    $("subitemm").click(function () {
      obj = $(this).attr("aria-controls");
      //if ($("wrapperm[aria-controls=" + obj + "]").hasClass("dismissnav")) {
      $("wrapperm[aria-controls=" + obj + "]")
        .removeClass("dismissnav")
        .addClass("selectednav")
        .show();
      //}
    });
    $(".close, overlay").click(function () {
      obj = $(this).attr("aria-controls");
      $("wrapperm[aria-controls=" + obj + "]")
        .removeClass("selectednav")
        .addClass("dismissnav")
        .show();
      //parent.removeClass("absolutenav");
      //parent.removeClass("selectednav").addClass("dismissnav");
      //console.log(obj);
    });
    $("#closenavm").click(function () {
      $("render-mobile").css({
        left: "100vh",
      });
      console.log("click");
    });
  });

  //ẩn sub
  //$("sub").hide();

  //button function
  $("#menu-main-container").hide();

  $("#btn-menu-main-container").mouseenter(function () {
    $("wrapper1").hide();
    $("wrapper2").hide();

    $("#menu-main-container").slideDown();
  });
  $("#menu-main-container").mouseleave(function () {
    $("#menu-main-container").slideUp();
  });
});
