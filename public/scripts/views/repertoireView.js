'use strict';

var app = app || {};

(function(module) {
  let repertoireView = {};
  let data;

  repertoireView.initialized = false;

  repertoireView.initialize = function() {
    app.view.showSection('repertoire');

    if (repertoireView.initialized) {
      return;
    }
    
    handleFilter('composer');
    handleFilter('genre');

    repertoireView.initialized = true;
    
    loadData(populateItems);
  }
  
  function handleFilter(name) {
    let selection = document.getElementById(`${name}-filter-selection`);
    let selectionHandler = displayFilterDropdown.bind(selection, name);
    selection.addEventListener('mousedown', selectionHandler);
    handleFilterItems(name);
  }

  function displayFilterDropdown(name, event) {
    this.style.display = 'none';
    let filterDropdown = document.getElementById(`${name}-filter-dropdown`);
    filterDropdown.classList.add('open');
    event.preventDefault();
  }

  function handleFilterItems(name) {
    let filterDropdown = document.getElementById(`${name}-filter-dropdown`);
    let filterOptionHandler = selectFilterItem.bind(null, name);
    filterDropdown.addEventListener('mousedown', filterOptionHandler);
  }

  function selectFilterItem(name, event) {
    let filterOption = event.target;

    if (notFilterItem(filterOption)) {
      return;
    }

    resetFilterSelections();

    let filterDropdown = document.getElementById(`${name}-filter-dropdown`);
    filterDropdown.classList.remove('open');
    
    let filterSelection = document.getElementById(`${name}-filter-selection`);
    filterSelection.innerText = filterOption.textContent;
    filterSelection.style.display = 'block';

    let repertoireList = document.getElementById('repertoire-list');
    repertoireList.innerHTML = '';

    if (filterOption === filterDropdown.firstElementChild) {
      populateList(data);
    } else {
      filterBy(name, filterOption.textContent);
    }

    event.preventDefault();
  }

  function loadData(callback) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = processDataResponse.bind(request, callback);
    request.open('GET', '/data/music.json');
    request.send();
  }

  function processDataResponse(callback) {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      callback(data);
    }
  }

  function populateItems(data) {
    populateComposerFilter(data);
    populateGenreFilter(data);
    populateList(data);
  }



  function notFilterItem(element) {
    return !element.classList.contains('filter-option');
  }

  function resetFilterSelections() {
    let filters = document.getElementsByClassName('filter');

    for (let i = 0; i < filters.length; i++) {
      let filter = filters[i];
      let filterSelection = filter.querySelector('.filter-selection');
      let firstFilterItem = filter.querySelector(`.filter-dropdown .filter-option`);
      filterSelection.innerText = firstFilterItem.textContent;
    }
  }

  function filterBy(name, value) {
    let filteredData = [];

    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];

      if (name === 'composer') {
        let match = dataItem.composer === value;

        if (match) {
          filteredData.push(dataItem);
        }
      } else if (name === 'genre') {
        let match = dataItem.genres.includes(value);

        if (match) {
          filteredData.push(dataItem);
        }
      }
    }

    populateList(filteredData);
  }

  function populateComposerFilter(data) {
    data.sort(sortByComposer);
    data = data.map(getComposer);
    data = getDistinct(data);
    let toHtml = compileTemplate('filter-option-template');
    let itemHtmlArray = data.map(toHtml);
    let list = document.getElementById('composer-filter-dropdown');
    let itemsHtml = itemHtmlArray.join('');
    list.insertAdjacentHTML('beforeend', itemsHtml);
  }

  function sortByComposer(a, b) {
    return a.composer.localeCompare(b.composer);
  }

  function getComposer(dataItem) {
    return dataItem.composer;
  }

  function getDistinct(items) {
    let distinctItems = {};
    
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      distinctItems[item] = item;
    }

    return Object.values(distinctItems);
  }

  function populateGenreFilter(data) {
    data = getGenres(data);
    data = getDistinct(data);
    let toHtml = compileTemplate('filter-option-template');
    let itemHtmlArray = data.map(toHtml);
    let list = document.getElementById('genre-filter-dropdown');
    let itemsHtml = itemHtmlArray.join('');
    list.insertAdjacentHTML('beforeend', itemsHtml);
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