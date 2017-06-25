let view = {};

view.hasBuiltMusicTable = false;

view.handleMenuEvents = function() {
  $('.menu-item').on('click', function(event) {
    $('section').hide();
    $('.menu-item.selected').removeClass('selected');
    $('section:not(.hidden)').addClass('hidden');

    let selectedMenuItem = $(this);
    let selectedSectionName = selectedMenuItem.data('section');
    let selectedSection = $('section.' + selectedSectionName);

    selectedMenuItem.addClass('selected');
    selectedSection.removeClass('hidden');
    selectedSection.fadeIn(100);

    if (selectedSectionName === 'music' && !view.hasBuiltMusicTable) {
      view.buildMusicTable();
    }

    event.preventDefault();
  });
}

view.buildMusicTable = function() {
  let source = $(".music-template").html();
  let template = Handlebars.compile(source);
  let table = $('.music-table');

  $.getJSON('data/music.json', function(data) {
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let musicRow = template(element);
      table.append(musicRow);
    }
  });
  
}

$(document).ready(function() {
  view.handleMenuEvents();
});