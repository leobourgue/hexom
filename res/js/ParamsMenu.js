function ParamsMenu() {
  $("body").prepend('<div id="paramsMenu" class="unselectable">' +
    '<ul>' +
    '<li id="generalParams" onclick="ParamsMenu.prototype.generalParams()"></li>' +
    '<li id="addHexa" onclick="ParamsMenu.prototype.addHexa()"></li>' +
    '</ul>' +
    '</div>');

  $("#paramsMenu").hide();
}

ParamsMenu.prototype = {
  constructor: ParamsMenu,
  open: function() {
    $("#paramsMenu").fadeIn(fadeSpeed);
    paramsMenuOpen = true;
    if(grid.hexagons.positions.length > 0 && $("#modifHexa").length === 0){
      $("#paramsMenu ul").append('<li id="modifHexa" onclick="ParamsMenu.prototype.modif()"></li>');
      langManager.setLanguage();
    }
  },
  close: function() {
    $("#paramsMenu").fadeOut(fadeSpeed);
    paramsMenuOpen = false;
  },
  closeAll: function() {
    ParamsMenu.prototype.close();
    paramsWindow.close();
    ParamsWindowHexa.prototype.close();
    grid.removePreviewHexa();
    modifying = false;
  },
  modif: function() {
    this.closeAll();
    modifying = true;
  },
  generalParams: function() {
    this.closeAll();
    if (params)
      paramsWindow.close();
    else
      paramsWindow.open();
  },
  addHexa: function() {
    this.closeAll();
    if (!previewing)
      grid.addPreviewHexa();
    else
      grid.removePreviewHexa();
  }
};