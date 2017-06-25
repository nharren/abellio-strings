let view = {};

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

    event.preventDefault();
  });
}

$(document).ready(function() {
  view.handleMenuEvents();
});