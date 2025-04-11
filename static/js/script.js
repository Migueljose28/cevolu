document.getElementById("open-btn").addEventListener("click", function() 
{ document.getElementById('sidebar').classList.toggle("open-sidebar");

});

function abrirModal() {
    const modal = document.getElementById('modal-avisos');
    modal.style.display = 'flex'; // Exibe a modal como flexbox para centralização
}

function fecharModal() {
    const modal = document.getElementById('modal-avisos');
    modal.style.display = 'none'; // Esconde a modal
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "login.html"; 
    console.log("logout")
  }