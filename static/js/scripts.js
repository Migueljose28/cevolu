//variaveis
let cevolu = "https://api.cevolu.com.br";
let localhost = "http://127.0.0.1:8000";
let cevoluu = "http://127.0.0.1:8000";

let valor = 0;
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
var pdfDoc = null;
var totalPages = 0;
var container = document.getElementById('pdf-container');
let pdf = "pdf"


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
  
//token and username
let username = localStorage.getItem("username");
let token = localStorage.getItem("token");
const nomeUsuario = document.getElementById("nomeUsuario");
nomeUsuario.textContent = username ? username : '';

async function verificarAutenticacao() {
  // Obtém o token do localStorage
  //var valor = 0;
  //atualizarValor(valor);
  if (!token) {
    
    window.location.href = "login.html"; // Redireciona para a página de login
    return;
  }}

  console.log(username, token)

function logout(){
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  window.location.href = "login.html"; 
  console.log("Ahhhahahahaha")
}

document.addEventListener("DOMContentLoaded", function() {
  valor = 0;
  atualizarValor(valor)
});
// Chama a função quando a página carregar
window.onload = verificarAutenticacao;



function atualizarValor(valor) {
 document.getElementById('displayValor').textContent = valor;
  limpandoContainer()
  const pdf = "pdf"
  loadPDF(`/static/${pdf}/${valor}.pdf`);
};

function valueByinput() {
    value = document.getElementById("imput_value").value;
    if (value  == 'NaN' ){
         valor = 0;
        
    }else{
         valor = parseInt(value);  // Atualiza a variável 'valor' com o valor do textarea
     }
      atualizarValor(valor)  // Exibe o valor atualizado
 };
 
// Função para carregar o PDF
function loadPDF(pdfUrl) {
 
  pdfjsLib.getDocument(pdfUrl).promise.then(function(pdfDoc_) {
    pdfDoc = pdfDoc_;
    totalPages = pdfDoc.numPages;
    renderPages(totalPages); // Começar a renderizar todas as páginas
  });
};




// Função para renderizar todas as páginas corretamente
function renderPages(totalPages) {
  // Renderiza as páginas da primeira até a última
  for (var i = 1; i <= totalPages; i+=1) {
     renderPage(i); // Renderiza a página i
}
};

// Função para renderizar uma página individualmente
function renderPage(pageNum) {
  pdfDoc.getPage(pageNum).then(function(page) {
    var canvas = document.createElement('canvas'); // Cria um canvas para cada página
    var ctx = canvas.getContext('2d');
    var viewport = page.getViewport({ scale: 1.2 }); // Ajuste de escala
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Renderiza a página no canvas
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext).promise.then(function() {
      // Adiciona o canvas ao container após renderizar
      container.appendChild(canvas);
    });
  });
};

function limpandoContainer() {
  container.innerHTML = '';
};


// Função para diminuir
function decrementar() {
if (valor == 0) {
        valor = 0;}
else{
 valor -= 1;
}
 atualizarValor(valor);
};

function incrementar() {
 valor += 1;
 atualizarValor(valor);

};


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

    
     function box_mensagem(mensagem, type){
      if(type == "erro"){
        title = "Atenção!";
    
      
      }if(type == "success"){
        title = "Sucesso"
      
      
      }if(type == "aviso"){
        title = "Aviso";
      }
      document.getElementById("title_box_alert").innerHTML = title;
      document.getElementById("title_box_alert").style.color ="black";
      document.getElementById("alert").innerHTML = mensagem;
      document.getElementById("alert").style.color = "black";
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

  document.getElementById("selecionarCurriculos").addEventListener("click", async function (event) {
    
      //const lista = str.split(",").map(Number);

      for(let i = 0; i < 3; i++){
        console.log("contagem do i", i)
      try{
        token = localStorage.getItem("token")
        const response = await fetch(`${cevolu}/read`,{ 
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`
          },
        });
        const data = await response.json();
        if(response.ok){
          
        if(data.error){
          box_mensagem(data.error, "erro")
        }
        
       else{
      const lista = data.mensagem.split(",").map(Number); 
      lista.push(valor);
      let novaString = lista.join(",");
      console.log(novaString); 
      enviarAlteration(novaString)
      break;
      }
    }
      }catch{
        console.log("erro");
        continue;
      }
    }
    });

async function enviarAlteration(nPaginas){
  for(let i = 0; i < 3; i++){

      try{
        const response = await fetch(`${cevolu}/update`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              token,
              nPaginas  
          }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        box_mensagem("Selecionado com Sucesso", "success");
        break;
        
      }
      else{

        console.log("ssssssssssaaaaaaaaaaaaaaa")
        continue;
      }
      }catch{
          return {"erro": "erro de catch"}
      }
    }};


    function close_box_message(){
      document.getElementById("box-alert").style.display = "none";
    }
    