// 1. Данные всех квестов
const quests = [
  {
    id: "quest1",
    title: "Объект 1",
    location: [56.233073, 58.010752], // Пермь, краевая филармония
    preview: "images/preview-1-perm-philharmonic.jpg",
    targetArea: { x1: 100, y1: 100, x2: 200, y2: 200 },
    achievementText: "Предмет найден"
  },
  {
    id: "quest2",
    title: "Объект 2",
    location: [56.233902, 58.016209], // Пермь, художественная галерея
    preview: "images/preview-2-perm-art-gallery.jpg",
    targetArea: { x1: 50, y1: 60, x2: 130, y2: 120 },
    achievementText: "Предмет найден"
  }
];

// 2. Функция показа карты и генерации маркеров
function showMap() {
  const mapDiv = document.getElementById('map');
  mapDiv.style.display = 'block';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      // === Успешная геолокация ===

      const userLocation = [position.coords.longitude, position.coords.latitude];

      mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yaWEtOSIsImEiOiJjbWRhNXltZGIwY3IxMm1zZ2dhZ3F2eWl3In0.MW4pUoKhf-8f-sEar6WaTA';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 14
      });

      quests.forEach(quest => {
        const el = document.createElement('div');
        el.className = 'custom-marker';

        el.innerHTML = `
          <div class="popup-box">
            <div class="popup-title">${quest.title}</div>
            <img src="${quest.preview}" class="popup-image">
          </div>
        `;

        const marker = new mapboxgl.Marker(el)
          .setLngLat(quest.location)
          .addTo(map);

        el.addEventListener('click', () => {
          startQuest(quest);
        });
      });
    },

    (error) => {
      // === Fallback, если нет геолокации ===

      alert("Не удалось получить местоположение. Используем стандартную точку.");

      const fallbackLocation = [56.233073, 58.010752];

      mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yaWEtOSIsImEiOiJjbWRhNXltZGIwY3IxMm1zZ2dhZ3F2eWl3In0.MW4pUoKhf-8f-sEar6WaTA';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: fallbackLocation,
        zoom: 14
      });

      quests.forEach(quest => {
        const el = document.createElement('div');
        el.className = 'custom-marker';

        el.innerHTML = `
          <div class="popup-box">
            <div class="popup-title">${quest.title}</div>
            <img src="${quest.preview}" class="popup-image">
          </div>
        `;

        const marker = new mapboxgl.Marker(el)
          .setLngLat(quest.location)
          .addTo(map);

        el.addEventListener('click', () => {
          startQuest(quest);
        });
      });
    }
  );
}

// 3. Квест: камера, задание
let currentQuest = null;
function startQuest(quest) {
  currentQuest = quest; // сохраняем текущий квест для показа в подсказке
  // Показываем эмуляцию камеры
  const camera = document.querySelector(".camera-screen");
  const preview = document.getElementById("cameraPreview");
  preview.src = quest.preview;
  camera.style.display = "flex";
  document.getElementById("cameraHintThumb").src = quest.preview;


  // Через 5 сек закрываем "камеру" и показываем фото-задание
  setTimeout(() => {
    camera.style.display = "none";
    showQuestPhoto(quest);
  }, 5000);
}

// Что мне искать?
function showHint() {
  const popup = document.getElementById("hintPopup");
  const hintImage = document.getElementById("hintImage");
  hintImage.src = currentQuest?.preview || ""; // чтобы показать фото квеста
  popup.style.display = "block";
}

function closeHint() {
  document.getElementById("hintPopup").style.display = "none";
}



// 4. Показ фото с текстом-заданием
function showQuestPhoto(quest) {
  // Показываем картинку и задание
  const img = document.createElement("img");
  img.src = quest.preview;
  img.id = "questImage";
  img.style = "width: 100%; margin-top: 10px;";
  img.onclick = (event) => checkAnswer(event, quest);

  const old = document.getElementById("questImage");
  if (old) old.remove();
  document.body.appendChild(img);

  // Показываем текст-задание
  const instruction = document.createElement("p");
  instruction.innerText = "Это фото фонтана у Дома Советов, 1981г.\nНайди на фото предмет, которого в то время не существовало, и нажми на него.";
  instruction.style = "font-size: 18px; margin-top: 10px;";

  const oldText = document.getElementById("questInstruction");
  if (oldText) oldText.remove();
  instruction.id = "questInstruction";
  document.body.appendChild(instruction);
}


// 5. Функция проверки ответа
function checkAnswer(event, quest) {
  const x = event.offsetX;
  const y = event.offsetY;
  const { x1, y1, x2, y2 } = quest.targetArea;

  if (x >= x1 && x <= x2 && y >= y1 && y <= y2) {
    alert(quest.achievementText);
    localStorage.setItem(quest.id, 'true');
  } else {
    alert("Неверно, попробуй ещё раз!");
  }
}

// 6. Функция показа всех ачивок
function showAchievements() {
  let result = "<h3>Твои ачивки:</h3>";
  quests.forEach(q => {
    const unlocked = localStorage.getItem(q.id);
    result += `<p>${q.title}: ${unlocked ? '✅' : '🔒'}</p>`;
  });
  document.getElementById('achievements').innerHTML = result;
}