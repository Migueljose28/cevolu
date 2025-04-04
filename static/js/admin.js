async function sendget() {
    const container = document.getElementById("container");
    const tabela = document.getElementById("tabela");
  
    try {
      const response = await fetch("http://127.0.0.1:8000/admin/", {
        method: 'GET'
      });
  
      if (response.ok) {
        const data = await response.json();
      console.log(data)
  
      } else {
        console.error("Requisição falhou:", response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  
  sendget();
  