function createNavbar(_inputInfo = "navbarInputInfo") {
  const inputInfo = document.getElementById(_inputInfo);
  let inputTextArray = '';
  if(inputInfo != null)
      inputTextArray = inputInfo.innerHTML.split("\n");
  let navBarText = '';
  if(inputInfo == null || inputTextArray.length == 0) {
      navBarText = ` Could not find the navbar descriptor at the element "${_inputInfo}".`;
      alert(navBarText);
      return; 
   }
  let theNavbar = document.getElementById("theNavbar");
  if(theNavbar == null) {
      theNavbar = document.createElement("nav");
      theNavbar.setAttribute("id","theNavbar");
      theNavbar.setAttribute("class", "navbar navbar-expand-sm bg-dark navbar-dark");
      document.body.insertBefore(theNavbar, document.body.firstChild);
  }
  for(i=0;i<inputTextArray.length;i ++) {
      input = inputTextArray[i];
      result = interpretNavbarLine(input);
      navBarText = navBarText + interpretNavbarLine(inputTextArray[i]);
  }
  theNavbar.innerHTML = navBarText;
}

function interpretNavbarLine(_navBarLine) {
  /*
  Possible tokens so far
  -brand
  -navbaritems
  -dropdown
  -item
  -enddropdown
  -endnavbaritems
  -navbarcontrols
  -button
  -endnavbarcontrols
   */
  let brokenDown = _navBarLine.split("|");
  let ret = '';
  if(brokenDown[0] == "initnavbar") {
  return "<div class=\"container-fluid\">";
  }
  else if(brokenDown[0] == "brand") {
      // Brand items
      // 0 - word "brand"
      // 1 - link to assign to the href
      // 2 - link to the logo that is displayed in the navbar
      // 3 - logo text
      ret = `<a class="navbar-brand" href="`;
      if(brokenDown[1] != '')
          ret = ret + brokenDown[1];
      else
          ret = ret + "#";
      ret = ret + `">`;
      if(brokenDown[2] != '') {
          ret = ret + `<img src="${brokenDown[2]}" width="30" height="30" alt="" class="me-2">`;
      }
      ret = ret + brokenDown[3] + "</a>";
  } else if(brokenDown[0] == "navbaritems") {
     ret = "<button class=\"navbar-toggler\" type=\"button\" data-bs-toggle=\"collapse\" "
           + "data-bs-target=\"#collapsibleNavbar\">";
     ret = ret + "<span class=\"navbar-toggler-icon\"></span></button>";
     ret = ret + "<div class=\"collapse navbar-collapse\" id=\"collapsibleNavbar\">";
     ret = ret + "<ul class=\"navbar-nav\">";      
  } else if(brokenDown[0] == "dropdown") {
      // 0 - word "dropdown"
      // 1 - link it points to
      // 2 - text for the item
      ret = "<li class=\"nav-item dropdown\">";
      ret = ret + "<a class=\"nav-link dropdown-toggle\" href=\"";
      ret = ret + brokenDown[1] + "\" role=\"button\" data-bs-toggle=\"dropdown\""
      ret = ret + " style=\"color: #ffffff\">";
      ret = ret + brokenDown[2] + "</a>";
      ret = ret + "<ul class=\"dropdown-menu dropdown-content\">";
  } else if(brokenDown[0] == "dditem") {
      // 0 - word "item"
      // 1 - link it points to
      // 2 - text for the item
      ret = "<li><a class=\"dropdown-item\" href=\""
            + brokenDown[1] + "\">" + brokenDown[2]
            + "</a></li>";
  } else if(brokenDown[0] == "enddropdown") {
      /* </ul></li> */
      ret = "</ul></li>";
  } else if(brokenDown[0] == "item") {
      // 0 - word "item"
      // 1 - link it points to
      // 2 - text for the item
      ret = "<li class=\"nav-item\"><a class=\"nav-link\" href=\"";
      ret = ret + brokenDown[1] + "\" style=\"color: #ffffff\">";
      ret = ret + brokenDown[2] + "</a></li>"; 
  } else if(brokenDown[0] == "endnavbaritems") {
      ret = "</ul></div>";
  } else if(brokenDown[0] == "navbarcontrols") {
      // Nothing to add here.
  } else if(brokenDown[0] == "button") {
      // 0 - word "button"
      // 1 - id for the button
      // 2 - class for the button
      // 3 - onClick function for the button
      // 4 - caption for the button
      ret = `<button id="${brokenDown[1]}" class="${brokenDown[2]}"` +
            ` onclick="${brokenDown[3]}">${brokenDown[4]}</button>`;
  } else if(brokenDown[0] == "endnavbarcontrols") {
      ret = "</div>";
  }
  return ret;
}
/*
function buttonClicked(_buttonId) {
  alert(`A button named "${_buttonId}" was clicked.`);
}*/
// remove this to have control on the source of the website's navbar
createNavbar();