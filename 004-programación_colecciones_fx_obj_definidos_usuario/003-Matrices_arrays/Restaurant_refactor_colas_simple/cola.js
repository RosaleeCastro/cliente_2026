class Cola {
  #items;

  constructor() {
    this.#items = [];
  }

  enqueue(elemento) {
    this.#items.push(elemento);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#items.shift();
  }

  front() {
    if (this.isEmpty()) {
      return null;
    }

    return this.#items[0];
  }

  isEmpty() {
    return this.#items.length === 0;
  }

  size() {
    return this.#items.length;
  }

  toArray() {
    return [...this.#items];
  }

  mostrar() {
    if (this.isEmpty()) {
      return "(vacia)";
    }

    let resultado = "";

    for (let i = 0; i < this.#items.length; i++) {
      const pedido = this.#items[i];
      resultado += `${pedido.nombre} (#${pedido.id})`;

      if (i < this.#items.length - 1) {
        resultado += " -> ";
      }
    }

    return resultado;
  }
}
