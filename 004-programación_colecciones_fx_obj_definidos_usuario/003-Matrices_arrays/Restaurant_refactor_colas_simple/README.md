# Restaurant Refactor Colas Simple



## Archivos

- `index.html`: interfaz minima
- `cola.js`: clase `Cola` con atributo privado y metodos simples
- `app.js`: logica del restaurante con 5 colas
- `validar_plato.php`: dice si el plato es valido y a que cocina va
- `info_coccion.php`: tiempo e ingredientes
- `info_emplatado.php`: tiempo y descripcion de emplatado
- `platosTerminados.php`: actualiza la cookie de platos terminados

## Idea principal

Todo gira alrededor de la clase `Cola`, igual que en `colas.html`:

- `enqueue()` mete pedidos
- `dequeue()` saca pedidos
- `front()` mira el primero sin quitarlo
- `size()` controla el limite de 3
- `toArray()` permite pintar la interfaz

## Flujo

1. El usuario escribe un plato.
2. Se valida con PHP.
3. Entra en la cola de espera.
4. Pasa a parrilla, horno o plancha si hay hueco.
5. Se cocina con `setTimeout()`.
6. Pasa a emplatado.
7. Se emplata con otro `setTimeout()`.
8. Se actualiza el contador final con cookie.
