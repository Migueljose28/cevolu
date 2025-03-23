

// Selecionar o botão, o sidebar e o conteúdo
const sidebarToggle = document.getElementById('sidebar_button');
const sidebar = document.getElementById('sidebar-multi-level-sidebar');

sidebarToggle.addEventListener('click', (event) => {
  sidebar.classList.toggle('-translate-x-full');
});
document.addEventListener('click', (event) => {
  if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
    sidebar.classList.add('-translate-x-full');
  }
});

//Dorpdown banco_de_talento
document.getElementById("dropdown-button_banco_de_talento").addEventListener("click", () => {
    const dropdown = document.getElementById("dropdown_banco_de_talento");
    dropdown.classList.toggle("hidden");
  });
  


async function verificarAutenticacao() {
  const token = localStorage.getItem("token"); // Obtém o token do localStorage
  var valor = 0;
  atualizarValor(valor);
  if (!token) {
    
    //window.location.href = "login.html"; // Redireciona para a página de login
    return;
  }}

  window.onload = verificarAutenticacao;
  
function logout(){
    localStorage.removeItem("token");
    window.location.href = "../login.html"; 
    console.log("Ahhhahahahaha")
  }


  // Bloquear o clique direito no canvas
document.getElementById('pdf-container').addEventListener('contextmenu', function(event) {
    event.preventDefault();  // Impede a ação padrão (abrir o menu de contexto)
    return false;
   });
   
   document.addEventListener("keydown", function(event) {
       if (event.ctrlKey && event.key === "p") {
         event.preventDefault(); // Impede a ação padrão
         alert("A impressão desta página foi desativada!");
       }
     });
