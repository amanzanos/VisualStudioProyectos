document.getElementById('btnBuscar').addEventListener('click', async () => {
  const tipo = document.getElementById('tipoBusqueda').value;
  const valor = document.getElementById('userInput').value.trim();
  const resultado = document.getElementById('resultado');
  resultado.innerHTML = "";

  if (!valor) {
    resultado.innerHTML = "<p>Por favor introduce un valor de búsqueda.</p>";
    return;
  }

  try {
    let user;
    if (tipo === "id") {
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${valor}`);
      if (!userResponse.ok) throw new Error("Usuario no encontrado");
      user = await userResponse.json();
    } else {
      const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users`);
      const users = await userResponse.json();
      user = users.find(u => u.email.toLowerCase() === valor.toLowerCase());
      if (!user) throw new Error("Usuario no encontrado");
    }

    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
    const posts = await postsResponse.json();

    const direccion = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;
    resultado.innerHTML = `
      <h1>${user.name}</h1>
      <h2>${direccion}</h2>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Teléfono:</strong> ${user.phone}</p>
      <p><strong>Empresa:</strong> ${user.company.name}</p>
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
    window.location.href = "errors/notFoundPage.html?from=usuarios";
  }
});
