'use strict';

var app = app || {};

(function(module) {
  let repertoireView = {};

  repertoireView.initialized = false;

  repertoireView.initialize = function() {
    app.view.showSection('repertoire');

    if (!repertoireView.initialized) {
      loadData();
      handleFilter('composer');
      handleFilterItems('composer');
      handleFilter('genre');
      handleFilterItems('genre');
      repertoireView.initialized = true;
    }
  }

  function handleFilter(name) {
    let selection = document.getElementById(`${name}-filter-selection`);
    selection.addEventListener('mousedown', generateSelectionHandler(name));
  }

  function generateSelectionHandler(name) {
    return function (event) {
      this.style.display = 'none';
      let filterDropdown = document.getElementById(`${name}-filter-dropdown`);
      filterDropdown.style.display = 'block';
      event.preventDefault();
    };
  }

  function handleFilterItems(name) {
    let dropdown = document.getElementById(`${name}-filter-dropdown`);
    dropdown.addEventListener('mousedown', generateFilterItemHandler(name));
  }

  function generateFilterItemHandler(name) {
    return function (event) {
      let isFilterItem = event.target.classList.contains('filter-item');

      if (!isFilterItem) {
        return;
      }
      
      let filterSelection = document.getElementById(`${name}-filter-selection`);
      filterSelection.innerText = event.target.innerText;
      filterSelection.style.display = 'block';

      let filterDropdown = document.getElementById(`${name}-filter-dropdown`);
      filterDropdown.style.display = 'none';

      event.preventDefault();
    };
  }

  function loadData() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = processDataResponse;
    request.open('GET', '/data/music.json');
    request.send();
  }

  function processDataResponse() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      populateComposerFilter(data);
      populateGenreFilter(data);
      populateList(data);
    }
  }

  function populateComposerFilter(data) {
    data.sort(sortByComposer);
    data = getDistinctComposers(data);
    let toHtml = compileTemplate('composer-filter-item-template');
    let itemHtmlArray = data.map(toHtml);
    let list = document.getElementById('composer-filter-dropdown');
    let itemsHtml = itemHtmlArray.join('');
    list.insertAdjacentHTML('beforeend', itemsHtml);
  }

  function sortByComposer(a, b) {
    return a.composer.localeCompare(b.composer);
  }

  function getDistinctComposers(data) {
    let distinctComposers = {};
    
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      let composer = item.composer;
      let distinctComposer = distinctComposers[composer];

      if (distinctComposer) {
        distinctComposer.count++;
      } else {
        distinctComposer = {};
        distinctComposer.name = composer;
        distinctComposer.count = 1;
        distinctComposers[composer] = distinctComposer;
      }
    }

    return Object.values(distinctComposers);
  }

  function populateGenreFilter(data) {
    data = getDistinctGenres(data);
    let toHtml = compileTemplate('genre-filter-item-template');
    let itemHtmlArray = data.map(toHtml);
    let list = document.getElementById('genre-filter-dropdown');
    let itemsHtml = itemHtmlArray.join('');
    list.insertAdjacentHTML('beforeend', itemsHtml);
  }

  function getDistinctGenres(data) {
    let genres = getGenres(data);
    let distinctGenres = {};
    
    for (let genreIndex = 0; genreIndex < genres.length; genreIndex++) {
      let genre = genres[genreIndex];
      let distinctGenre = distinctGenres[genre];

      if (distinctGenre) {
        distinctGenre.count++;
      } else {
        distinctGenre = {};
        distinctGenre.name = genre;
        distinctGenre.count = 1;
        distinctGenres[genre] = distinctGenre;
      }
    }

    return Object.values(distinctGenres);
  }

  function getGenres(data) {
    let genres = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      genres = genres.concat(item.genres);
    }

    return genres;
  }

  function populateList(data) {
    data.sort(sortByTitle);
    let toHtml = compileTemplate('repertoire-item-template');
    let itemHtmlArray = data.map(toHtml);
    let list = document.getElementById('repertoire-list');
    list.innerHTML = itemHtmlArray.join('');
  }

  function sortByTitle(a, b) {
    return a.title.localeCompare(b.title);
  }

  function compileTemplate(templateId) {
    let template = document.getElementById(templateId);
    return Handlebars.compile(template.innerHTML);
  }

  module.repertoireView = repertoireView;
})(app);