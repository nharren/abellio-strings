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
      console.log($('.music-table tr'));
      view.buildMusicTable();
    }

    event.preventDefault();
  });
}

view.buildMusicTable = function() {
  let source = $(".music-template").html().trim();
  let template = Handlebars.compile(source);
  let table = $('.music-table tbody');

  $.getJSON('data/music.json', function(data) {
    console.log('data length: ' + data.length);
    for (let i = 0; i < data.length; i++) {
      let element = data[i];
      let musicRow = template(element);
      table.append(musicRow);
    }
  });
  
  view.handleMusicTableHeaders();
}

view.handleMusicTableHeaders = function() {
  $('.music-table-title-header').on('click', function(event) {
    view.sortMusicTableByColumn(0);
    event.preventDefault();
  });

  $('.music-table-composer-header').on('click', function(event) {
    view.sortMusicTableByColumn(1);
    event.preventDefault();
  });

  $('.music-table-genre-header').on('click', function(event) {
    view.sortMusicTableByColumn(2);
    event.preventDefault();
  });
}

view.sortMusicTableByColumn = function(column) {
  let sortedRows = $('.music-row').detach().sort(function(a,b) {
    return a.children[column].innerText.localeCompare(b.children[column].innerText);
  });
  console.log('rows length: ' + sortedRows.length);
  sortedRows.appendTo('.music-table tbody');
}

$(document).ready(function() {
  view.handleMenuEvents();
});