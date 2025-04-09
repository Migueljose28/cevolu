
let username = localStorage.getItem("username");
let token = localStorage.getItem("token");
let role = localStorage.getItem("role");



async function verificarAutenticacao() {
  // Obtém o token do localStorage
  //var valor = 0;
  //atualizarValor(valor);
  if (!token) {
    
    window.location.href = "login.html"; // Redireciona para a página de login
    return;
  }}

  console.log(username, token, role)

function logout(){
  //localStorage.removeItem("token");
  //localStorage.removeItem("username");
  window.location.href = "paginicial.html"; 
  console.log("logout")
}

async function sendget() {
  
    try {
      const response = await fetch(`${cevolu}/admin/`, {
        method: 'GET'
      });
  
      if (response.ok) {
        const data = await response.json();
      console.log(data)
      for (let i = 0; i < data.length; i++) {

        const dataObj = new Date(data[i].last_login);

        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = dataObj.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;
        duplicar(data[i].username, data[i].email, data[i].phone, data[i].role, dataFormatada);
        document.getElementById("countUser").innerHTML = data.length;
      }
      } else {
        console.error("Requisição falhou:", response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  
sendget();
  

  function duplicar(nome, email, telefone, role, last_login) {
    const tabela = document.getElementById('minhaTabela').querySelector('tbody');
    const linhaOriginal = document.getElementById('linhaModelo');
    const novaLinha = linhaOriginal.cloneNode(true); // true = clona tudo (deep clone)
    
    // Aqui você pode alterar os dados da nova linha se quiser:
    novaLinha.cells[0].textContent = nome;
    novaLinha.cells[1].textContent = email;
    novaLinha.cells[2].textContent = telefone;
    novaLinha.cells[3].textContent = role;
    novaLinha.cells[4].textContent = last_login;
    novaLinha.classList.remove('d-none');

    tabela.appendChild(novaLinha);

  }
  
  
  document.getElementById("formBusca").addEventListener("submit", async function(event) {
    event.preventDefault();
    try {
      const termo = document.getElementById("inputSearch").value;
      const response = await fetch(`${cevolu}/admin/${termo}`, {
        method: 'GET'
      });
  
      if (response.ok) {
        console.log(termo);
        const data = await response.json();
        console.log(data);
        limparTabela();
        console.log("pesquisa com sucesso");
  
        for (let i = 0; i < data.length; i++) {
          const dataObj = new Date(data[i].last_login);
          const dia = String(dataObj.getDate()).padStart(2, '0');
          const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
          const ano = dataObj.getFullYear();
          const dataFormatada = `${dia}/${mes}/${ano}`;
          console.log("Data formatada:", dataFormatada); // Se quiser exibir
          duplicar(data[i].username, data[i].email, data[i].phone, data[i].role, dataFormatada);
          document.getElementById("countUser").innerHTML = data.length;
        }
  
      } else {
        console.error("Requisição falhou:", response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });
  

  function limparTabela() {
    const tabela = document.getElementById('minhaTabela').querySelector('tbody');
    const modelo = document.getElementById('linhaModelo');
  
    // Remove todas as linhas, exceto a linha modelo
    tabela.querySelectorAll('tr').forEach((linha) => {
      if (linha !== modelo) {
        tabela.removeChild(linha);
      }
    });
  }
  