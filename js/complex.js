
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
    window.unitList = complex.available_units;
    window.unitList.forEach(unit => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${unit.unit_identifier}</h3><p>${unit.unit_type} - $${unit.price}</p><p>${unit.square_footage} sq ft</p>`;
      container.appendChild(div);
    });
  });

function applyFilters() {
  const minPrice = parseInt(document.getElementById('min-price').value) || 0;
  const maxPrice = parseInt(document.getElementById('max-price').value) || Infinity;
  const bedrooms = document.getElementById('bedrooms').value;
  const sortBy = document.getElementById('sort-by').value;

  const container = document.getElementById('unit-listings');
  container.innerHTML = '';

  let filtered = window.unitList.filter(unit => {
    const price = unit.price || 0;
    const bedMatch = bedrooms ? unit.unit_type.includes(bedrooms) : true;
    return price >= minPrice && price <= maxPrice && bedMatch;
  });

  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'size-asc') filtered.sort((a, b) => a.square_footage - b.square_footage);
  if (sortBy === 'size-desc') filtered.sort((a, b) => b.square_footage - a.square_footage);

  filtered.forEach(unit => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${unit.unit_identifier}</h3><p>${unit.unit_type} - $${unit.price}</p><p>${unit.square_footage} sq ft</p>`;
    container.appendChild(div);
  });
}
