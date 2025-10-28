document.getElementById('btnBuscar').addEventListener('click', async () => {
  const id = document.getElementById('userId').value.trim();
  const resultado = document.getElementById('resultado');
  let notFound = false;
  resultado.innerHTML = "";

  if (!id) {
    resultado.innerHTML = "<p>Por favor introduce un número de usuario.</p>";
    return;
  }

  try {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!userResponse.ok) throw new Error("Usuario no encontrado");
    const user = await userResponse.json();

    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`);
    const posts = await postsResponse.json();

    const direccion = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    resultado.innerHTML = `
      <h1>${user.name}</h1>
      <h2>${direccion}</h2>
      <h3>Publicaciones:</h3>
    `;

    const ul = document.createElement('ul');
    posts.forEach(post => {
      const li = document.createElement('li');
      li.textContent = post.title;
      ul.appendChild(li);
    });
    resultado.appendChild(ul);

  } catch (error) {
    notFound = true;
    window.location.href = "errors/notFoundPage.html";
  }
});
