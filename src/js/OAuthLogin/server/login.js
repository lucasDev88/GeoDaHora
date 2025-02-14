document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login").value;
    const password = document.getElementById('password').value;
    const btnEntrar = document.getElementById("btn-entrar");

    async function login(username, password) {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                document.getElementById("login-form").reset();
                localStorage.setItem("token", data.token);  // Armazenando token no localStorage
                window.location.href = "../../../../index.html";  // Redireciona após login
            } else {
                alert(data.error);  // Exibe a mensagem de erro em vez de "Erro ao conectar"
            }

        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Erro ao conectar ao servidor.');
        }
    }

    login(username, password);  // Chama a função de login diretamente ao submeter o formulário
});
