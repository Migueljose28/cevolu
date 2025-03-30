let cevolu = "https://api.cevolu.com.br";
let cevolu99 = "http://127.0.0.1:8000";

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
  




  const getTableCurriculos = async () => {
    token = localStorage.getItem("token")

    const response = await fetch(`${cevolu}/read`,{ 
      method: "GET",
      headers: {
          "Authorization": `Bearer ${token}`
      },
    });
    const data = await response.json();
    if(response.ok){
     console.log(data); 
    
    if(data.error){
      document.getElementById("ocultar").style.display = "none";
      document.getElementById("ocultar2").style.display = "none";
      return;
      
    }
    else{
      document.getElementById("form").classList.add("hidden");
      document.getElementById("tabela").classList.remove("hidden");
      document.getElementById("ocultar").classList.remove("hidden");
      document.getElementById("displayValor").classList.remove("hidden");
      const lista = data.mensagem.split(",").map(Number); 
      console.log(lista)
      if(lista.length === 1){
      document.getElementById("pdf-container").innerHTML = `${lista} currículo encontrado`;
    }
    else{
      document.getElementById("pdf-container").innerHTML = `${lista.length-1} currículo encontrado, passe para analiza-los`;
    }
      localStorage.setItem("title", data.title);
      localStorage.setItem("lista", data.mensagem);
      let title = localStorage.getItem("title");
      const title_span = document.getElementById("titletabela");
      title_span.textContent = title ? title : " ";
    }
    
    }else{
        alert("Erro ao obter o redirecionamento")

    }
};

async function verificarAutenticacao() {
  token = localStorage.getItem("token");// Obtém o token do localStorage
  //var valor = 0;
  //atualizarValor(valor);
  if (!token) {
    window.location.href = "login.html"; // Redireciona para a página de login
    return;

  }else{
    getTableCurriculos();
  
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
   
   function valor_lista(valor){
    lista_string = localStorage.getItem("lista");
    const lista = lista_string.split(",").map(Number); 

    if (valor < lista.length){
      console.log(valor);
      return lista[valor];
    }
       console.log(valor);
      return null;
    
   
    
   
  }
   // Função para diminuir
   function decrementar() {
   if (valor == 0) {
           valor = 0;}
   else{
    valor -= 1;
   }
   valor2 = valor_lista(valor)
   if(valor2 === null){
    return ;
  }
   return atualizarValor(valor2);
   };
   
   function incrementar() {
    valor += 1;
    valor2 = valor_lista(valor);
    if(valor2 === null){
      valor = -1;
      return ;
    }
     return atualizarValor(valor2);
   
    
   
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



document.getElementById("form").addEventListener("submit", async function (event) {
   // Impede o envio tradicional do formulário
    title = document.getElementById("title").value;
    token = localStorage.getItem("token");
    for(let i = 0; i < 3; i++){
      console.log(i)
      try{
      const response = await fetch(`${cevolu}/create`, {
        method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    title: title,
                    token
                  }),
            
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Acesso autorizado:', data);
        localStorage.getItem("title", title);
        break;
      }
      continue;
    }catch{
      console.log("deu erro");
      continue;
    }
  }
});

document.getElementById("deletarAll").addEventListener("click", async function (event) {
    token = localStorage.getItem("token");

    for(let i = 0; i < 3; i++){
      
    try{
      console.log(i);
    const response = await fetch(`${cevolu}/deleteAll`, {
      method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token
                }),
          
    });

    if (response.ok) {
      const data = await response.json();
      console.log("DELETEDO COM SUCESSO", data);
      getTableCurriculos();
      location.reload();
      break;
     
    }else{
      console.log("ahahahah ERRO, NÃO FOI DELETADP");
    }
  }catch{
    console.error("erro ao tentar realizar a requisição");
    continue;
  }
}
});

