document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const verificationContainer = document.getElementById('verification-container');
    const submitBtn = document.getElementById('submit-btn');
    const verificationCodeBtn = document.getElementById('verification-code-btn')
    let verificationCodeSent = false;

  
    async function sendVerificationCode(emailEnv) {
      const email = document.getElementById('email').value;

      try {
        const response = await fetch('http://localhost:3000/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

  
        if (response.ok) {
          verificationCodeSent = true;
          alert('Código de verificação enviado para o seu e-mail.');
        }

      } catch (error) {
        console.error('Erro ao enviar o código de verificação:', error);
        alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      }
    }
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
    
      // Obtenha os valores atualizados dos campos aqui
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const verificationCode = document.getElementById('verification-code').value;
    
      try {
        const response = await fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: username, email, password, confirmationCode: verificationCode }),
        });
    
        const data = await response.json();
        alert(data.message);
        form.reset();
        verificationContainer.classList.add('hidden');
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        alert('Erro ao conectar ao servidor.');
    }
    });
    
    verificationCodeBtn.addEventListener('click', () => {
      sendVerificationCode(email);
    })
  });