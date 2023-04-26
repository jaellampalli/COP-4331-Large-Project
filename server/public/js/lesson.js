$(document).ready(function () {
  let isNotesOpen = false;
  let savedData = {
    notes: "",
    mark: 0
  };
  let email = localStorage.getItem("Login");
  let lesson = lessonName.replace(/\s/g, "").toLowerCase();

  // Load lesson content
  $.get('/lessons/' + lessonName, function (data) {
    console.log("Lesson name: " + lessonName);
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
    isNotesOpen = !isNotesOpen;
    
    // If the notes are closing
    if (!isNotesOpen)
    {
      console.log("Notes closed");
      const notesText = document.getElementById("notesTextarea");

      // Check if there were any changes before updating
      if (notesText.value != savedData.notes)
      {
        updateNotes(notesText.value)
      }
    }
  });
  
  function updateNotes(newNotes)
  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("title", lesson);
    urlencoded.append("newMarker", "1");
    urlencoded.append("newNotes", newNotes);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("/lessons/edit-user-lesson", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
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
  
  async function setup()
  {
    let isAdmin = await checkAdmin();
    document.getElementById("editButton").hidden = !isAdmin;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("title", lesson);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("/lessons/retrieve-lesson", requestOptions)
      .then(response => response.text())
      .then(result => {
        result = JSON.parse(result);

        savedData.notes = result[lesson + "_notes"];
        savedData.mark = result[lesson + "_mark"];
        
        console.log(savedData);

        if (savedData.notes)
        {
          const notesArea = document.getElementById("notesTextarea");
          notesArea.value = savedData.notes;
        }
      })
      .catch(error => console.log('error', error));
  }

  function checkAdmin()
  {
    return new Promise(function (resolve, reject) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", email);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      fetch("/users/check-admin", requestOptions)
        .then(response => response.text())
        .then(result => {
          result = JSON.parse(result);
          console.log("isAdmin: " + result.isAdmin);
          resolve(result.isAdmin);
        })
        .catch(error => reject(error));
    })
  }

  setup();
});
