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
  
  
 