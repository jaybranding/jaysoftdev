var menuAPI = "./menu-ogw.json";

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
      "<span class=icon>x</span></itemm>" +
      "<subitemms>";

    submenuCol1 = submenuCol1 + "<wrapper1 link=" + [i] + ">";

    // loop 2nd
    $.each(data[i].navigation.item, function (j, item) {
      ariacontrols = [i] + "-" + [j];
      submenuCol1 =
        submenuCol1 +
        "<item aria-controls=" +
        ariacontrols +
        ">" +
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
        "<subitemm>" +
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
        "<wrapperm>" +
        "<div>Back to Home</div><div>x</div>" +
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
          `<li><a href="${data[i].navigation.item[j].menu[x].URL}">${data[i].navigation.item[j].menu[x].text}</a></li>`;

        //popup menu
        popupm =
          popupm +
          `<li><a href="${data[i].navigation.item[j].menu[x].URL}">${data[i].navigation.item[j].menu[x].text}</a></li>`;
      });

      popupm = popupm + "</wrapperm><hr>"; // closing m
      submenuCol2 = submenuCol2 + "</ul></div>"; //closing right
      submenuCol2 = submenuCol2 + "</wrapper2>"; //cloding wrapper2
    });

    submenuCol1 = submenuCol1 + "</wrapper1>"; //close reapper1
    mainmenum = mainmenum + "</subitemms>";
  });

  //action after success

  $("nav").html(mainmenu);
  $("#col1").html(submenuCol1);
  $("#col2").html(submenuCol2);
  $("navm").html(mainmenum);
  $("popupm").html(popupm);

  //action of menu
  //$("sub").hide();
  $("wrapper1").hide();
  $("wrapper2").hide();

  $(".menu-item").mouseenter(function () {
    $("wrapper1").hide();
    $("wrapper2").hide();

    obj = $(this).attr("link");
    $("wrapper1[link=" + obj + "]").slideDown();
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
  });

  $("wrapper1 item").click(function () {
    $("wrapper2").hide();
    $("item").removeClass("itemselect");
    $(this).addClass("itemselect");
    obj = $(this).attr("aria-controls");
    $("wrapper2[aria-controls=" + obj + "]").show();
  });

  //menu mobile render
  //menu mobile render
});
