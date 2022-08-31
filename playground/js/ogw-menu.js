var menuAPI = "https://jaysoft.dev/playground/data/menu-ogw.json";

//get json and print
$.getJSON(menuAPI, {
  format: "json",
  async: true,
}).done(function (data) {
  //loop menu main
  var mainmenu = "";
  var mainmenum = "";

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
      "<span class=icon><i aria-hidden=true class='fa-fw icon icon-chevron-left'></i></span></itemm>" +
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
        "><container>" +
        "<div class='close left'><i aria-hidden=true class='fa-fw icon icon-chevron-left'></i> Back to Home</div> <div class='closeright'><i aria-hidden='true' class='icon icon-cross'></i></div>" +
        "<div><img src=" +
        data[i].navigation.item[j].imgURL +
        " /></div>" +
        "<h4>" +
        data[i].navigation.item[j].title +
        "</h4>";
      //loop 3rd
      $.each(data[i].navigation.item[j].menu, function (x, item) {
        submenuCol2 =
          submenuCol2 +
          `<li><a href="${data[i].navigation.item[j].menu[x].URL}"><i class="fas fa-caret-right"></i>${data[i].navigation.item[j].menu[x].text}</a></li>`;

        //popup menu
        popupm =
          popupm +
          `<li><a href="${data[i].navigation.item[j].menu[x].URL}"><i class="fas fa-caret-right"></i>${data[i].navigation.item[j].menu[x].text}</a></li>`;
      });

      popupm = popupm + "</container><overlay></overlay></wrapperm>"; // closing m
      submenuCol2 = submenuCol2 + "</ul></div>"; //closing right
      submenuCol2 = submenuCol2 + "</wrapper2>"; //cloding wrapper2
    });

    submenuCol1 = submenuCol1 + "</wrapper1>"; //close reapper1
    mainmenum = mainmenum + "</subitemms>";
  });

  //action after success

  function getWindowDimensions() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = (width / height) * 100;
    return { width, height, ratio };
  }

  const { width } = getWindowDimensions();

  if (width < 830) {
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

  $("wrapperm").addClass("dismissnav");

  $("subitemm").click(function () {
    obj = $(this).attr("aria-controls");
    if ($("wrapperm[aria-controls=" + obj + "]").hasClass("dismissnav")) {
      $("wrapperm[aria-controls=" + obj + "]")
        .removeClass("dismissnav")
        .addClass("selectednav")
        .show();
    }
  });
  $(".close, overlay").click(function () {
    var parent = $(".close").parent().parent();
    parent.removeClass("absolutenav");
    parent.removeClass("selectednav").addClass("dismissnav");
  });
});

$(function () {
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
