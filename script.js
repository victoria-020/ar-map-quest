function showMap() {
  const mapDiv = document.getElementById('map');
  mapDiv.style.display = 'block';

  mapboxgl.accessToken = 'pk.eyJ1IjoidmljdG9yaWEtOSIsImEiOiJjbWRhNXltZGIwY3IxMm1zZ2dhZ3F2eWl3In0.MW4pUoKhf-8f-sEar6WaTA';
  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.5234, 50.4501],
      zoom: 14
  });

  const marker = new mapboxgl.Marker()
      .setLngLat([30.5234, 50.4501])
      .addTo(map);

  marker.getElement().addEventListener('click', () => {
      alert('Открываем камеру и задание (в будущем)');
  });
}

// 1. Данные всех квестов
const quests = [
  {
    id: "quest1",
    title: "Задание у библиотеки",
    location: [30.5234, 50.4501],
    image: "zadanie1.jpg",
    targetArea: { x1: 100, y1: 100, x2: 200, y2: 200 },
    achievementText: "📚 Ты нашёл книгу!"
  },
  {
    id: "quest2",
    title: "Задание у моста",
    location: [30.5300, 50.4515],
    image: "zadanie2.jpg",
    targetArea: { x1: 50, y1: 60, x2: 130, y2: 120 },
    achievementText: "🌉 Мост пройден!"
  }
];

// 2. Функция показа карты и генерации маркеров
function showMap() {
  const mapDiv = document.getElementById('map');
  mapDiv.style.display = 'block';

  mapboxgl.accessToken = 'ТВОЙ_MAPBOX_ТОКЕН';
  const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [30.5234, 50.4501],
      zoom: 14
  });

  quests.forEach(quest => {
    const marker = new mapboxgl.Marker()
      .setLngLat(quest.location)
      .setPopup(new mapboxgl.Popup().setText(quest.title))
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      startQuest(quest);
    });
  });
}

// 3. Функция запуска квеста
function startQuest(quest) {
  alert("Сканируем здание через камеру (эмуляция)");

  const img = document.createElement("img");
  img.src = quest.image;
  img.id = "questImage";
  img.style = "width: 100%; margin-top: 10px;";
  img.onclick = (event) => checkAnswer(event, quest);

  const old = document.getElementById("questImage");
  if (old) old.remove();
  document.body.appendChild(img);
}

// 4. Функция проверки ответа
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

// 5. Функция показа всех ачивок
function showAchievements() {
  let result = "<h3>Твои ачивки:</h3>";
  quests.forEach(q => {
    const unlocked = localStorage.getItem(q.id);
    result += `<p>${q.title}: ${unlocked ? '✅' : '🔒'}</p>`;
  });
  document.getElementById('achievements').innerHTML = result;
}
