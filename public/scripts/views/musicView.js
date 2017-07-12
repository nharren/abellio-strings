'use strict';

var app = app || {};

(function(module) {
  let musicView = {};

  musicView.hasBuiltMusicTable = false;

  musicView.index = function() {
    $('#music').removeClass('hidden').siblings().addClass('hidden');

    if (!musicView.hasBuiltMusicTable) {
      musicView.buildMusicTable();

      musicView.hasBuiltMusicTable = true;
    }
  }

  musicView.buildMusicTable = function() {
    $.getJSON('data/music.json', musicView.createMusicTableRows);
    musicView.handleMusicTableHeaders();
  }

  musicView.createMusicTableRows = function(data) {
    let tbody = $('#music-table tbody').get(0);

    for (let i = 0; i < data.length; i++) {
      let obj = data[i];
      
      let row = tbody.insertRow(i);
      row.className = 'music-row';

      Object.keys(obj).forEach(function(key, index) {
        let cell = row.insertCell(index);
        cell.innerText = obj[key];
      });
    }
  }


  musicView.handleMusicTableHeaders = function() {
    $('.music-table-title-header').on('click', function(event) {
      musicView.sortMusicTableByColumns($(this), [0]);
      event.preventDefault();
    });

    $('.music-table-composer-header').on('click', function(event) {
      musicView.sortMusicTableByColumns($(this), [1,0]);
      event.preventDefault();
    });

    $('.music-table-genre-header').on('click', function(event) {
      musicView.sortMusicTableByColumns($(this), [2,0]);
      event.preventDefault();
    });
  }

  musicView.sortMusicTableByColumns = function(header, columns) {
    let descend = header.hasClass('ascend');

    let rows = $('.music-row').detach();
    let sortedRows = rows.sort((a, b) => sortRows(a, b, columns, 0, !descend));
    sortedRows.appendTo('#music-table tbody');

    $('#music-table a').removeClass('ascend');
    $('#music-table a').removeClass('descend');

    header.addClass(descend ? 'descend' : 'ascend');
  }

  function sortRows(rowA, rowB, columns, i, ascend) {
    let columnIndex = columns[i];
    let compareResult = directionalCompare(getCellValue(rowA, columnIndex), getCellValue(rowB, columnIndex), ascend);

    return compareResult === 0 && ++i < columns.length ? sortRows(rowA, rowB, columns, i, ascend) : compareResult;
  }

  function getCellValue(row, columnIndex) {
    return row.children[columnIndex].innerText;
  }

  function directionalCompare(a, b, ascend) {
    return ascend ? a.localeCompare(b) : b.localeCompare(a) 
  }

  module.musicView = musicView;
})(app);