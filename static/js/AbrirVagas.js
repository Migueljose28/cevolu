let cevolu = "https://api.cevolu.com.br";
let cevolua = "http://127.0.0.1:8000";


let sidebar = document.getElementById('sidebar-multi-level-sidebar')

 // Função que será chamada quando o mouse estiver perto do lado esquerdo da tela
 function opensidebar(opensidebar) {
 document.getElementById(opensidebar).classList.toggle('-translate-x-full');

}
function closesiedeBar(closesidebar){
  document.getElementById(closesidebar).classList.add('-translate-x-full');
}

document.addEventListener('mousemove', function(event) {
  const mouseX = event.clientX;
  if (mouseX < 10) {
    if (sidebar.classList.contains('-translate-x-full')) {
    opensidebar('sidebar-multi-level-sidebar'); 
    }

  }
});


// Selecionar o botão, o sidebar e o conteúdo
const sidebarToggle = document.getElementById('sidebar_button');

sidebarToggle.addEventListener('click', (event) => {
  opensidebar('sidebar-multi-level-sidebar');
});

document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
    closesiedeBar('sidebar-multi-level-sidebar');
  }
});

//Dorpdown banco_de_talento
document.getElementById("dropdown-button_banco_de_talento").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown_banco_de_talento");
    dropdown.classList.toggle("hidden");
  });
  


  document.getElementById("dropdown-button_pro").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown_pro");
    dropdown.classList.toggle("hidden");
  });

  

async function verificarAutenticacao() {
  token = localStorage.getItem("token");// Obtém o token do localStorage
  //var valor = 0;
  //atualizarValor(valor);
  if (!token) {
    window.location.href = "login.html"; // Redireciona para a página de login
    return;

  }else{
   console.log("Deu bom")
  
  }}

  window.onload = verificarAutenticacao;
  

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

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("title");
    localStorage.removeItem("lista");
    window.location.href = "login.html"; 
    console.log("Ahhhahahahaha")
  }


   document.addEventListener("keydown", function(event) {
       if (event.ctrlKey && event.key === "p") {
         event.preventDefault(); // Impede a ação padrão
         alert("A impressão desta página foi desativada!");
       }
     });


     document.getElementById("createVacancy").addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita o recarregamento da página
      
      const form = document.getElementById("createVacancy");
      const formData = new FormData(form);

      // Converte os dados do FormData em um objeto JavaScript
      const dados = Object.fromEntries(formData.entries());

      console.log(dados); // Exibe os dados no console

      // Aqui você pode enviar os dados para o backend via Fetch API
    const  response = await fetch("http://127.0.0.1:8000/createVacancy", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
      })
      if(response.ok){
        const data = await response.json();
        console.log(data)
      }



      //.then(response => response.json())
      //.then(data => console.log("Sucesso:", data))
      //.catch(error => console.error("Erro:", error));
  }
     );


