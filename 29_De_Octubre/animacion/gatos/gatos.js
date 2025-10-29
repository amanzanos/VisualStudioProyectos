const galeria = document.getElementById('galeria');

function calcularCantidad() {
  if (window.matchMedia('(max-width: 767px)').matches) return 6;
  if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) return 9;
  return 12;
}

async function cargarGatos() {
  galeria.innerHTML = '<p>Cargando gatos... 😺</p>';
  const cantidad = calcularCantidad();

  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${cantidad}`);
    if (!response.ok) throw new Error('Error al obtener gatos');
    const gatos = await response.json();

    galeria.innerHTML = gatos.map(g => `
      <img src="${g.url}" alt="Gato adorable">
    `).join('');
  } catch (e) {
    galeria.innerHTML = `<p style="color:red;">Error al cargar los gatos 🐾</p>`;
    console.error(e);
  }
}

window.addEventListener('load', cargarGatos);
window.addEventListener('resize', cargarGatos);
