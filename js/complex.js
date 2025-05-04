
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}
fetch('data/properties.json')
  .then(res => res.json())
  .then(data => {
    const name = getQueryParam('name');
    const complex = data.find(c => c.complex_info.property_name === name);
    if (!complex) return;
    document.getElementById('complex-info').innerHTML = `<h1>${complex.complex_info.property_name}</h1><p>${complex.complex_info.address}</p>`;
    const container = document.getElementById('unit-listings');
    complex.available_units.forEach(unit => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${unit.unit_identifier}</h3><p>${unit.unit_type} - $${unit.price}</p><p>${unit.square_footage} sq ft</p>`;
      container.appendChild(div);
    });
  });
