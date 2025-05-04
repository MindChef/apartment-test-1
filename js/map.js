
fetch('data/properties.json')
  .then(response => response.json())
  .then(data => {
    const map = L.map('map').setView([30.2672, -97.7431], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    data.forEach(complex => {
      const marker = L.marker([complex.lat, complex.lng]).addTo(map);
      marker.bindPopup(`<b>${complex.complex_info.property_name}</b><br><a href='complex.html?name=${encodeURIComponent(complex.complex_info.property_name)}'>View Units</a>`);
    });
  });
