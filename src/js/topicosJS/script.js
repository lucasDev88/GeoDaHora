const btnExit = document.getElementById("exit");
btnExit.addEventListener("click", () => {
    window.location.href = "../../../dashboard.html";
});

const btnConfigOpen = document.getElementById("config");

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (token) {
        async function checkAdmin() {
            try {
                const response = await fetch("http://localhost:3000/admin-verify", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`  // Enviando o token no header de autorização
                    }
                });

                const data = await response.json();
                console.log("Resposta da API", data);  // Verifique o que está retornando da API

                const isAdmin = data.isAdmin;

                console.log("Resultado da verificação de admin:", isAdmin);

                if (isAdmin) {
                    console.log("É admin");
                    // Coloque a lógica para mostrar elementos de admin, por exemplo
                } else {
                    console.log("Não é admin");
                    // Coloque a lógica para mostrar elementos não admin ou redirecionar
                }
            } catch (error) {
                console.error('Erro ao verificar admin:', error);
                alert('Erro ao verificar status de admin.');
            }
        }

        checkAdmin();  // Chama a função para verificar o admin
    } else {
        console.log("Token não encontrado");
    }

    // Carregar tópicos
    const container = document.getElementById('topics-container');

    fetch('http://localhost:3000/topics')
        .then(response => response.json())
        .then(topics => {
            if (topics.length === 0) {
                container.innerHTML = '<p class="text-center text-gray-500">Nenhum tópico encontrado.</p>';
                return;
            }

            topics.forEach(topic => {
                const topicCard = document.createElement('div');
                topicCard.classList.add('topic-card', 'bg-white', 'rounded-lg', 'shadow-md', 'p-4');

                topicCard.innerHTML = `
                    <h2 class="text-xl font-bold mb-2">${topic.title}</h2>
                    <p class="text-gray-700 mb-4">${topic.description}</p>
                    ${topic.imageUrl ? `<img src="http://localhost:3000/uploads/${topic.imageUrl}" alt="${topic.title}" class="rounded-lg mb-4 w-full h-48 object-cover">` : ''}
                    <button class="bg-red-500 text-white py-2 px-4 rounded mt-4 hidden delete-btn" data-id="${topic._id}">Deletar</button>
                `;

                container.appendChild(topicCard);
            });

            // Verifique se o usuário é admin e mostre/esconda o botão de exclusão
            checkAdminStatusAndToggleDeleteBtn();

            // Função para deletar o tópico
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const topicId = e.target.getAttribute('data-id');
                    fetch(`http://localhost:3000/topics/${topicId}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Passa o token no cabeçalho
                        }
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.message) {
                            alert('Tópico deletado com sucesso!');
                            e.target.closest('div').remove();  // Remove o card do DOM
                        } else {
                            alert('Erro ao deletar o tópico.');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao deletar o tópico:', error);
                        alert('Erro ao deletar o tópico.');
                    });
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar tópicos:', error);
            container.innerHTML = '<p class="text-center text-red-500">Erro ao carregar os tópicos.</p>';
        });

    // Verificar o status de admin e mostrar ou ocultar o botão de exclusão
    function checkAdminStatusAndToggleDeleteBtn() {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("Token não encontrado");
            return;
        }

        fetch("http://localhost:3000/admin-verify", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Enviando o token no header de autorização
            }
        })
        .then(response => response.json())
        .then(data => {
            const isAdmin = data.isAdmin;

            // Encontrar os botões de exclusão
            const deleteButtons = document.querySelectorAll('.delete-btn');
            deleteButtons.forEach(button => {
                if (isAdmin) {
                    button.classList.remove('hidden');  // Mostrar botão de deletar para admin
                } else {
                    button.classList.add('hidden');  // Esconder botão de deletar para não-admin
                }
            });
        })
        .catch(error => {
            console.error('Erro ao verificar admin:', error);
            alert('Erro ao verificar status de admin.');
        });
    }

    // Abrir/Fechar painel de configurações
    btnConfigOpen.addEventListener("click", () => {
        const panel = document.getElementById("configuration-panel");
        panel.classList.toggle("active");
    });

    // Scroll para a seção
    const menuLinks = document.querySelectorAll(".menu a[href^='#']");
    menuLinks.forEach((e) => {
        e.addEventListener("click", scrollToSection);
    });

    function nativeScroll(distanceFromTheTop) {
        window.scroll({
            top: distanceFromTheTop,
            behavior: "smooth",
        });
    }

    function getDistanceFromTheTop(element) {
        const id = element.getAttribute("href");
        return document.querySelector(id).offsetTop;
    }

    function scrollToSection(event) {
        event.preventDefault();

        const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
        nativeScroll(distanceFromTheTop);
    }

    // Enviar novo tópico
    document.getElementById('btn-submit-topic').addEventListener('click', async () => {
        const title = document.getElementById('topic-title').value;
        const description = document.getElementById('topic-description').value;
        const imageFile = document.getElementById('topic-image').files[0];
        const token = localStorage.getItem("token");

        console.log("token recebido: ", token)

        if (!token) {
            alert("Faça login novamente.");
            window.location.href = "../../../dashboard.html";
            return;
        }

        if (!title || !description) {
            alert('Preencha o título e a descrição.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);

        if (imageFile) {
            formData.append('image', imageFile);  // Adiciona a imagem apenas se for fornecida
        }

        try {
            const response = await fetch('http://localhost:3000/add-topic', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();
            console.log("Resposta da API:", data);  // Verifique o retorno da API aqui

            if (response.ok) {
                console.log('Tópico adicionado', data);
                alert('Tópico adicionado com sucesso!');
            } else {
                alert('Erro ao adicionar o tópico: ' + data.error);
            }
        } catch (error) {
            console.error('Erro ao adicionar tópico:', error);
            alert('Erro ao adicionar o tópico.');
        }

    });

    // Abrir e fechar o modal
    const modal = document.getElementById("modal-topic-ori");
    const closeModalBtn = document.getElementById("exit-modal");

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }

    const addTopic = document.getElementById("add-topic");

    if (addTopic) {
        addTopic.addEventListener("click", () => {
            modal.classList.remove("hidden");
        });
    }
})
