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
  $.getJSON('data/music.json', view.createMusicTableRows);
  view.handleMusicTableHeaders();
}

view.createMusicTableRows = function(data) {
  let musicTable = document.getElementsByClassName('music-table')[0];

  for (let i = 0; i < data.length; i++) {
    let obj = data[i];
    
    let row = musicTable.insertRow(i + 1);
    row.className = 'music-row';

    Object.keys(obj).forEach(function(key, index) {
      let cell = row.insertCell(index);
      cell.innerText = obj[key];
    });
  }
}


view.handleMusicTableHeaders = function() {
  $('.music-table-title-header').on('click', function(event) {
    view.sortMusicTableByColumns($(this), [0]);
    event.preventDefault();
  });

  $('.music-table-composer-header').on('click', function(event) {
    view.sortMusicTableByColumns($(this), [0,1]);
    event.preventDefault();
  });

  $('.music-table-genre-header').on('click', function(event) {
    view.sortMusicTableByColumns($(this), [0,2]);
    event.preventDefault();
  });
}

view.sortMusicTableByColumns = function(header, columns) {
  let descend = header.hasClass('ascend');

  columns.forEach(c => view.sortMusicTableByColumn(c, !descend));
  
  $('.music-table a').removeClass('ascend');
  $('.music-table a').removeClass('descend');

  header.addClass(descend ? 'descend' : 'ascend');
}

view.sortMusicTableByColumn = function(column, ascend) {
  $('.music-row').detach()
                 .sort(function(a,b)  {
                   let aText = a.children[column].innerText;
                   let bText = b.children[column].innerText;
                   return ascend ? aText.localeCompare(bText) : bText.localeCompare(aText);
                 })
                 .appendTo('.music-table tbody');
}

$(document).ready(function() {
  view.handleMenuEvents();
});