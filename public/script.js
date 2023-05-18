
//Método POST



//Função que envia os dados para o servidor

function enviarDados() {
    //Obtem os valores dos inputs
  
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const cpf = document.getElementById('cpf').value;
    const nomeD = document.getElementById('nomeD').value;
    const nomeA = document.getElementById('nomeA').value;
    const dataEhora = document.getElementById('dataEhora').value;
    const local = document.getElementById('local').value;
    const ocorrencia = document.getElementById('ocorrencia').value;
    const testemunhas = document.getElementById('testemunhas').value;
    const evidencias = document.getElementById('evidencias').value;
    const infoAdicionais = document.getElementById('infoAdicionais').value;
  
   
    //Envia os dados para o json utilizando o método fetch()
  
    fetch("denuncias", {
      method: 'POST', //Método HTTP utilizando (POST)
      //Headers é um objeto de requisição http que insere no Json as informações
  
      headers: {
        'Content-Type':
          'application/json' //Tipo de conteúdo enviado
      },
      //Body é um objeto JS que foi convertido para JSON. Usando o método Json.stringfy. Enviando no formato JSON  
      body: JSON.stringify({ email: email, senha: senha, cpf: cpf, nomeD: nomeD, nomeA: nomeA, dataEhora: dataEhora, local: local, ocorrencia: ocorrencia, testemunhas: testemunhas, evidencias: evidencias, infoAdicionais: infoAdicionais })
    })
      .then(response => response.json())
    //Converte a resposta para Json
  }
  
  
  
  // Método GET
  
  function buscarDados() {
    const cpf = document.getElementById("cpf").value;
    fetch(`denuncias`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(data => {
        const pessoaEncontrada = data.find(pessoa => pessoa.cpf === cpf)
        if (pessoaEncontrada) {
  
          document.getElementById('id').value = pessoaEncontrada.id
          document.getElementById('emailAtualizar').value = pessoaEncontrada.email
          document.getElementById('senhaAtualizar').value = pessoaEncontrada.senha
          document.getElementById('nomeDAtualizar').value = pessoaEncontrada.nomeD
          document.getElementById('nomeAAtualizar').value = pessoaEncontrada.nomeA
          document.getElementById('dataEhoraAtualizar').value = pessoaEncontrada.dataEhora
          document.getElementById('localAtualizar').value = pessoaEncontrada.local
          document.getElementById('ocorrenciaAtualizar').value = pessoaEncontrada.ocorrencia
          document.getElementById('testemunhasAtualizar').value = pessoaEncontrada.testemunhas
          document.getElementById('evidenciasAtualizar').value = pessoaEncontrada.evidencias
          document.getElementById('infoAdicionaisAtualizar').value = pessoaEncontrada.infoAdicionais
  
          Swal.fire({
            icon: 'success',
            titleText: 'Denúncia encontrada!'
          })
  
        } else {
          Swal.fire({
            icon: 'error',
            titleText: 'Denúncia não encontrada'
          })
  
  
        }
      });
  }
  
  //PUT
  
  
  
  function atualizarDados() {
  
  
    const email = document.getElementById('emailAtualizar').value;
    const senha = document.getElementById('senhaAtualizar').value;
    const cpf = document.getElementById('cpf').value;
    const nomeD = document.getElementById('nomeDAtualizar').value;
    const nomeA = document.getElementById('nomeAAtualizar').value;
    const dataEhora = document.getElementById('dataEhoraAtualizar').value;
    const local = document.getElementById('localAtualizar').value;
    const ocorrencia = document.getElementById('ocorrenciaAtualizar').value;
    const testemunhas = document.getElementById('testemunhasAtualizar').value;
    const evidencias = document.getElementById('evidenciasAtualizar').value;
    const infoAdicionais = document.getElementById('infoAdicionaisAtualizar').value;
  
    const id = document.getElementById('id').value;
  
    fetch(`denuncias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: senha,
        cpf: cpf,
        nomeD: nomeD,
        nomeA: nomeA,
        dataEhora: dataEhora,
        local: local,
        ocorrencia: ocorrencia,
        testemunhas: testemunhas,
        evidencias: evidencias,
        infoAdicionais: infoAdicionais,
        id: id
      }),
    }).then((response) => response.json());
  }
  
  
  //DELETAR
  //Função para deletar dados do servidor
  function deletarDados() {
    //Obtem o valor do campo input
    const cpf = document.getElementById('cpf').value;
  
    fetch(`denuncias`)
      .then(response => response.json())
      .then(data => {
        data.forEach(objeto => {
          if (objeto.cpf === cpf) {
            fetch(`denuncias/${objeto.id}`, {
              method: 'DELETE'
            })
          }
        })
      })
  
  
    // .then(response => response.json())
    // //Converte a resposta para json
  }
  
  //LOGIN
  
  function fazerLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
  
    fetch(`denuncias`)
      .then(response => response.json())
      .then(data => {
        const pessoa = data.find(p => p.email === email && p.senha == senha)
  
        //Busca as pessoas cujo nome e idade coincidem com os valores digitados
        //Esse (p) seria o parametro do find (procurar) função callback
  
        if (pessoa) {
       
          window.location.href = "bemVindo.html";
          
         
        } else {
          Swal.fire({
            icon: 'error',
            titleText: 'Usuário não encontrado'
          })
        }
      })
  }
  
  
  
  
  const cpfInput = document.getElementById('cpf');
  
  cpfInput.addEventListener('input', (event) => {
    const cpf = event.target.value;
    let formattedCPF = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    formattedCPF = formattedCPF.replace(/(\d{3})(\d)/, '$1.$2');
    formattedCPF = formattedCPF.replace(/(\d{3})(\d)/, '$1.$2');
    formattedCPF = formattedCPF.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    cpfInput.value = formattedCPF;
  });
  
  