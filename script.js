function showMap() {
  const mapDiv = document.getElementById('map');
  mapDiv.style.display = 'block';

  mapboxgl.accessToken = 'ВСТАВЬ_СЮДА_СВОЙ_MAPBOX_ТОКЕН';
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
