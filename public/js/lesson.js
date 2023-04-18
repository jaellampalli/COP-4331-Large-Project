$(document).ready(function () {
  // Load lesson content
  $.get('/lessons/' + lessonName, function (data) {
    $('#lessonContent').html(data);
  });

  // Handle edit button click
  $('#editButton').click(function () {
    $('#lessonContent').hide();
    $.get('/lessons/' + lessonName + '/raw')
      .done(function (data) {
        $('#editTextarea').val(data);
        $('#editContent').show();
      })
      .fail(function () {
        alert('Failed to load lesson content.');
      });
  });
  
  // Handle cancel button click
  $('#cancelButton').click(function () {
    $('#editContent').hide();
    $('#lessonContent').show();
  });

  // Handle form submit
  $('#editForm').submit(function (e) {
    e.preventDefault();
    
    $.ajax({
      url: '/lessons/' + lessonName + '/save',
      type: 'POST',
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function (data) {
        window.location.href = '/' + lessonName;
      },
      error: function () {
        alert('Error saving lesson');
      }
    });
  });

  $('#notesButton').click(function () {
    const notesArea = $('#notesArea');
    notesArea.toggleClass('notes-transition');
  });
  
  
  function fadeIn(element) {
    element.removeClass('hidden').addClass('visible');
    element.animate({ opacity: 1 }, 50);
  }
  
  function fadeOut(element) {
    element.removeClass('visible').addClass('hidden');
    element.animate({ opacity: 0 }, 50, function () {
      element.css('pointer-events', 'none');
    });
  }
  
});
