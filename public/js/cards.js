function toTitleCase(str) {
  // Given a string in the format "this-is-a-string", return "This Is A String"
  return str.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

function doesImageExist(lessonName) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = `/lessons/${lessonName.name}/main.png`;

    img.onload = () => {
      resolve(img.height !== 0);
    };

    img.onerror = () => {
      resolve(false);
    };
  });
}

async function getValidImageSrc(lessonName) {
  const exists = await doesImageExist(lessonName);
  if (exists) {
    return `/lessons/${lessonName.name}/main.png`;
  } else {
    return '/img/placeholder.png';
  }
}

async function fetchLessons() {
  try {
    const response = await fetch('/api/lessons');
    const lessonNames = await response.json();
    const container = document.querySelector('.container');
    
    for (const [index, lessonName] of lessonNames.entries()) {
      const card = document.createElement('div');
      card.className = 'card my-3 mx-auto';
      card.style.width = '23rem';
      card.style.animationDelay = `${index * 100}ms`;
      const imgSrc = await getValidImageSrc(lessonName);
      card.innerHTML = `
        <img src="${imgSrc}" class="card-img-top" alt="${lessonName.name}">
        <div class="card-body">
          <h5 class="card-title">${toTitleCase(lessonName.name)}</h5>
          <a href="/${lessonName.name}" class="btn btn-primary">View Lesson</a>
        </div>
      `;
      container.appendChild(card);

      setTimeout(() => {
        card.classList.add('fade-in');
      }, 0);
    }
  } catch (error) {
    console.error('Error fetching lessons:', error);
  }
}

fetchLessons();

function filterLessons(input) {
  const cards = document.querySelectorAll('.card');
  const searchTerm = input.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  filterLessons(e.target.value);
});

// add an event listener to run when a message is received
window.addEventListener("message", ({ data, source }) => {
  console.log("Express recieved data:");
  console.log(data);
});
