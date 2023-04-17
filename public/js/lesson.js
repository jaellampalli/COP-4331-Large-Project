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
  
});
