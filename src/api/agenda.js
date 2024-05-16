// pages/api/agenda.js

// Simulando dados da agenda (substitua isso pela integração com o banco de dados)
let agenda = [];
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(agenda);
  } 
  else if (req.method === "POST") {
    const novoPedido = req.body; // Assume-se que o corpo da requisição contém os detalhes do novo pedido
    agenda.push(novoPedido);
    res.status(201).json(novoPedido);
  } 
  else if (req.method === "PUT") {
    const { id, ...dadosAtualizados } = req.body; // Assume-se que o corpo da requisição contém o ID e os novos dados do pedido
    const index = agenda.findIndex((pedido) => pedido.id === id);
    if (index !== -1) {
      agenda[index] = { ...agenda[index], ...dadosAtualizados }; // Atualiza os detalhes do pedido
      res.status(200).json(agenda[index]);
    } 
    else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } 
  else if (req.method === "DELETE") {
    const { id } = req.body;
    const index = agenda.findIndex((pedido) => pedido.id === id);
    
    if (index !== -1) {
      agenda.splice(index, 1);
      res.status(200).json({ message: "Pedido excluido com sucesso!" });
    } 
    else {
      res.status(404).json({ message: "Pedido não encontrado" });
    }
  } 
  else {
    res.status(405).json({ message: "Método não permitido" });
  }
}

// Adicionando um novo pedido e, em seguida, atualizando-o e excluindo-o
fetch('http://localhost:3000/api/agenda', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1, // Defina o ID do novo pedido
    cliente: 'Maria', // Defina o nome do cliente
    pedido: 'Bolo15/20', // Defina a descrição do pedido
    data: '2024-04-20', // Defina a data do pedido
    // Adicione outros detalhes do pedido conforme necessário
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Pedido adicionado:', data);
    
    // Após adicionar o pedido, vamos atualizá-lo
    return fetch('http://localhost:3000/api/agenda', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1, // Substitua pelo ID do pedido que você quer atualizar
        cliente: 'João', // Defina o novo nome do cliente
        pedido: 'Bolo 25/30', // Defina a nova descrição do pedido
        data: '2024-04-28', // Defina a nova data do pedido
        // Adicione outros novos detalhes do pedido conforme necessário
      }),
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log('Pedido atualizado:', data);

    // Após atualizar o pedido, vamos excluí-lo
    return fetch('http://localhost:3000/api/agenda', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1, // Defina o ID do pedido a ser excluído
      }),
    });
  })
  .then(response => {
    if (response.ok) {
      console.log('Pedido excluído com sucesso');
    } else {
      throw new Error('Falha ao excluir pedido');
    }
  })
  .catch(error => console.error('Erro ao adicionar, atualizar ou excluir pedido:', error));
