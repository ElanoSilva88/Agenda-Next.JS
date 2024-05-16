import React, { useState } from "react";

const PedidosForm = () => {
  const [pedido, setPedido] = useState({
    cliente: "",
    descricao: "",
    dataHora: "",
    valorOrçamento: "",
    valorPG: "",
    localizarCliente: "", 
    entrega: "", 
    local: "",
  });

  const handleChange = (event, campo) => {
    let { value } = event.target;

    if (campo === "valorOrçamento" || campo === "valorPG") {
      value = value.replace(/\s/g, "").replace(/[^0-9,.]/g, "");
    }

    setPedido({ ...pedido, [campo]: value });

    if (campo === "valorOrçamento" || campo === "valorPG") {
      setPedido((prevPedido) => ({
        ...prevPedido,
        restante: calcularRestante(
          prevPedido.valorOrçamento,
          prevPedido.valorPG
        ),
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Enviando pedido:", pedido);
  };

  const formatarReal = (valor) => {
    if (typeof valor === "string") {
      const numero = parseFloat(valor.replace(",", ".")); 
      return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return ""; 
    }
  };

  const calcularRestante = (valorOrçamento, valorPG) => {
    if (valorOrçamento && valorPG) {
      const orçamento = parseFloat(valorOrçamento.replace(",", "."));
      const pg = parseFloat(valorPG.replace(",", "."));
      if (!isNaN(orçamento) && !isNaN(pg)) {
        return formatarReal(orçamento - pg);
      }
    }
    return "";
  };

  return (
    
    <form className="" onSubmit={handleSubmit}>
      <div className="">
        <label htmlFor="cliente">Cliente</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          value={pedido.cliente}
          onChange={(e) => handleChange(e, "cliente")}
          required
        />
      </div>
      <div>
        <label htmlFor="descricao">Descrição</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          value={pedido.descricao}
          onChange={(e) => handleChange(e, "descricao")}
        />
      </div>
      <div>
        <label htmlFor="valorOrçamento">Orçamento</label>
        <input
          type="text"
          id="valorOrçamento"
          name="valorOrçamento"
          value={pedido.valorOrçamento}
          onChange={(e) => handleChange(e, "valorOrçamento")}
        />
      </div>
      <div>
        <label htmlFor="valorPG">Valor Pago</label>
        <input
          type="text"
          id="valorPG"
          name="valorPG"
          value={pedido.valorPG}
          onChange={(e) => handleChange(e, "valorPG")}
        />
      </div>
      <div>
        <label>Entrega</label>
        <div>
          <input
            type="radio"
            id="entregaSim"
            name="entrega"
            value="sim"
            checked={pedido.entrega === "sim"}
            onChange={() => setPedido({ ...pedido, entrega: "sim" })}
          />
          <label htmlFor="entregaSim">Sim</label>
          <input
            type="radio"
            id="entregaNao"
            name="entrega"
            value="nao"
            checked={pedido.entrega === "nao"}
            onChange={() => setPedido({ ...pedido, entrega: "nao" })}
          />
          <label htmlFor="entregaNao">Não</label>
        </div>
      </div>
      <div>
        <label>Localizar Cliente</label>
        <div>
          <input
            type="radio"
            id="localizarInstagram"
            name="localizarCliente"
            value="instagram"
            checked={pedido.localizarCliente === "instagram"}
            onChange={() =>
              setPedido({ ...pedido, localizarCliente: "instagram" })
            }
          />
          <label htmlFor="localizarInstagram">Instagram</label>
          <input
            type="radio"
            id="localizarWhatsapp"
            name="localizarCliente"
            value="whatsapp"
            checked={pedido.localizarCliente === "whatsapp"}
            onChange={() =>
              setPedido({ ...pedido, localizarCliente: "whatsapp" })
            }
          />
          <label htmlFor="localizarWhatsapp">Whatsapp</label>
        </div>
      </div>
      <div className="hidden">
        <label htmlFor="restante">Restante:</label>
        <p>{calcularRestante(pedido.valorOrçamento, pedido.valorPG)}</p>
      </div>
      <div>
        <label htmlFor="dataHora">Data:</label>
        <input
          type="datetime-local"
          id="dataHora"
          name="dataHora"
          value={pedido.dataHora}
          onChange={(e) => handleChange(e, "dataHora")}
        />
      </div>
      <div>
        <label htmlFor="local">Local:</label>
        <input
          type="text"
          id="local"
          name="local"
          value={pedido.local}
          onChange={(e) => handleChange(e, "local")}
          required
        />
      </div>

      <button className="" type="submit">Enviar</button>
    </form>
  );
};

export default PedidosForm;
