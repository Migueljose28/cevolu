

window.onload = function() {
  setTimeout(function() {
      document.body.style.opacity = 1;
  }, 1000); // Atraso de 1 segundo
};




document.getElementById("registrar").addEventListener("submit", async function (event) {
  event.preventDefault(); // Impede o envio tradicional do formulário
  
    nome = document.getElementById("nomeForm").value;
    email = document.getElementById("emailForm").value;
    phone = document.getElementById("telefoneForm").value;
    cpf_cnpj = document.getElementById("cpfForm").value;
    senha = document.getElementById("senhaForm").value;
    confirmarsenha = document.getElementById("confirmarsenha").value;


    function box_mensagem(mensagem, type){
      if(type == "erro"){
        title = "Atenção!";
    
      
      }if(type == "success"){
        title = "Sucesso"
      
      
      }if(type == "aviso"){
        title = "Aviso";
      }
      document.getElementById("title_box_alert").innerHTML = title;
      document.getElementById("alert").innerHTML = mensagem;
      document.getElementById("alert").style.color = "#2f2841";
      button = document.getElementById("button_box_alert");
      button.style.backgroundColor = "#2f2841";
      button.style.color = "white";
      button.addEventListener('mouseover', () => {
        button.style.backgroundColor = "black";  
      });
      
      button.addEventListener('mouseout', () => {
        button.style.backgroundColor = "#2f2841";  
      });
      
      document.getElementById("box-alert").style.display = "flex";
      }

campos = {'nome':nome,
   'email':email,
    'telefone':phone,
     'cpf_cnpj':cpf_cnpj,
     'senha': senha};

campos_name = ['nome', 'email', 'telefone', 'cpf_cnpj', 'senha'];
for(i=0; i<campos_name.length; i++){
  if(campos[campos_name[i]] == ""){
    return box_mensagem(`${campos_name[i]} não pode ser vazio`, "erro");
  }
  
}


if (senha != confirmarsenha){
  return box_mensagem("Senhas não conferem", "aviso");
}

else{
  
    // Função para criar um novo usuário (sem gerar o token)
    const createUser = async () => {
      for(let i = 0; i < 3; i++){
        try {
        
            console.log(i);
            const response = await fetch(`${cevolu}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: nome,  
                    email: email,
                    phone: phone,
                    cpf_cnpj: cpf_cnpj,
                    password: senha,  
                }),
            });

            if (response.ok) {
              const data = await response.json();
              box_mensagem("Usuário criado com Sucesso!", "success");
            
          
              // Aguarda 2 segundos antes de redirecionar
              setTimeout(() => {
                console.log('Usuário criado com sucesso!');
                console.log('Username:', data.username);
            }, 20000)
                window.location.href = "login.html";
                break;
            } else {
                const errorData = await response.json();
                box_mensagem(`Erro ao criar usuário! ${errorData.detail}`, "erro");
                console.log('Erro ao criar usuário:', errorData);
                if(i === 3){
                  box_mensagem(`Erro ao criar usuário! porfavor tente mais tarde.`, "erro");
                }
                continue;
                
            }
        }catch (error) {
            console.error('Erro na requisição:', error);
        }
      }
    };

    // CHAMANDO A FUNÇÃO PARA CRIAR O USUÁRIO
    createUser();


}});


function close_box_message(){
  document.getElementById("box-alert").style.display = "none";
}



function exibirpassword(elemento, buttonpassword) {
  const passwordField = document.getElementById(elemento);

  if (!passwordField) {
      console.error("Elemento não encontrado:", elemento);
      return;
  }

  if (passwordField.type === "password") {
      passwordField.type = "text";
      buttonpassword.innerHTML = `<svg class="size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18Z" />
          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12Z" />
          <path d="M12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
      </svg>`;
  } else {
      passwordField.type = "password";
      buttonpassword.innerHTML = `<svg  class="size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
  <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
</svg>
`;
  }
}
