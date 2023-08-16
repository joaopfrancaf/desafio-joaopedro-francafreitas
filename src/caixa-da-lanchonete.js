class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = [
      {
        codigo: "cafe",
        descricao: "Café",
        valor: 3,
      },
      {
        codigo: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
      },
      {
        codigo: "suco",
        descricao: "Suco Natural",
        valor: 6.2,
      },
      {
        codigo: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.5,
      },
      {
        codigo: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2,
      },
      {
        codigo: "salgado",
        descricao: "Salgado",
        valor: 7.25,
      },
      {
        codigo: "combo1",
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.5,
      },
      {
        codigo: "combo2",
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.5,
      },
    ];

    const itensCardapio = Array.from(itens);

    if (
      itensCardapio === undefined ||
      itensCardapio === null ||
      !itensCardapio.length ||
      itensCardapio.length === 0
    )
      return "Não há itens no carrinho de compra!";

    if (
      metodoDePagamento === undefined ||
      metodoDePagamento === null ||
      (metodoDePagamento !== "dinheiro" &&
        metodoDePagamento !== "debito" &&
        metodoDePagamento !== "credito")
    )
      return "Forma de pagamento inválida!";

    let error = undefined;
    const itensSelecionados = itensCardapio.map((item) => {
      const result = item.split(",");
      const itemVlr = {
        codigo: result[0],
        quantidade: parseInt(result[1]),
      };

      const itemCard = cardapio.find((el) => el.codigo === itemVlr.codigo);

      if (itemCard === undefined || itemCard === null) {
        error = "Item inválido!";
        return;
      }

      if (!itemVlr.quantidade > 0) {
        error = "Quantidade inválida!";
        return;
      }

      return {
        ...itemCard,
        quantidade: itemVlr.quantidade,
      };
    });

    if (error) return error;

    itensSelecionados.forEach((item) => {
      const sanduiche = itensSelecionados.find(
        (el) => el.codigo === "sanduiche"
      );

      if (
        item.codigo === "queijo" &&
        (sanduiche === undefined || sanduiche === null)
      ) {
        error = "Item extra não pode ser pedido sem o principal";
        return;
      }

      const cafe = itensSelecionados.find((el) => el.codigo === "cafe");

      if (item.codigo === "chantily" && (cafe === undefined || cafe === null)) {
        error = "Item extra não pode ser pedido sem o principal";
        return;
      }
    });

    if (error) return error;

    const soma = itensSelecionados.reduce((acc, a) => {
      const m1 = a.valor * a.quantidade;
      return acc + m1;
    }, 0);

    let resultado = soma;
    if (metodoDePagamento === "dinheiro") {
      const percentual = 0.05;
      const res = resultado * percentual;
      resultado = soma - res;
    }

    if (metodoDePagamento === "credito") {
      const percentual = 0.03;
      const res = resultado * percentual;
      resultado = soma + res;
    }

    return "R$ " + resultado.toFixed(2).replace(".", ",");
  }
}

export { CaixaDaLanchonete };
