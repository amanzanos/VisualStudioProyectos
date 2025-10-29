document.getElementById('btnBuscar').addEventListener('click', async () => {
  const valor = document.getElementById('userInput').value.trim();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = "";

  if (!valor) {
    resultado.innerHTML = "<p>Por favor introduce un valor de búsqueda.</p>";
    return;
  }

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${encodeURIComponent(valor)}`);
    if (!response.ok) throw new Error("Error en la petición");

    const albums = await response.json();
    if (!albums || albums.length === 0) throw new Error("No se encontraron álbumes para este usuario");

    resultado.innerHTML = `<h2>Álbumes del Usuario ${valor}</h2>`;

    const ul = document.createElement('ul');
    albums.forEach(album => {
      const li = document.createElement('li');
      li.textContent = album.title;
      ul.appendChild(li);
    });

    resultado.appendChild(ul);
  } catch (error) {
    window.location.href = "../errors/notFoundPage.html?from=albumes";
  }
});
