
let agenda = [];
export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(agenda);
  } 
  else if (req.method === "POST") {
    const novoPedido = req.body; 
    agenda.push(novoPedido);
    res.status(201).json(novoPedido);
  } 
  else if (req.method === "PUT") {
    const { id, ...dadosAtualizados } = req.body; 
    const index = agenda.findIndex((pedido) => pedido.id === id);
    if (index !== -1) {
      agenda[index] = { ...agenda[index], ...dadosAtualizados }; 
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


fetch('http://localhost:3000/api/agenda', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 1, 
    cliente: 'Maria', 
    pedido: 'Bolo15/20', 
    data: '2024-04-20', 
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Pedido adicionado:', data);
    
    
    return fetch('http://localhost:3000/api/agenda', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1, 
        cliente: 'João', 
        pedido: 'Bolo 25/30', 
        data: '2024-04-28', 
      }),
    });
  })
  .then(response => response.json())
  .then(data => {
    console.log('Pedido atualizado:', data);

    
    return fetch('http://localhost:3000/api/agenda', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1, 
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
