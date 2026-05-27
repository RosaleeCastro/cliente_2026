const FormularioRegistro = require("./formularioRegistro");

describe("Funciones auxiliares", () => {
  /*
    TODO: Casos a testear:

    limpiarTexto
    - Debe eliminar espacios al principio y al final.
    - Debe devolver cadena vacía si recibe null.
    - Debe devolver cadena vacía si recibe undefined.
    - Debe convertir a texto otros valores si fuese necesario.

    estaVacio
    - Debe devolver true con cadena vacía.
    - Debe devolver true con cadena formada solo por espacios.
    - Debe devolver false con texto real.

    tieneLongitudMinima
    - Debe devolver true si el texto cumple la longitud mínima.
    - Debe devolver false si el texto no cumple la longitud mínima.
    - Debe tener en cuenta espacios sobrantes al principio y al final.
  */
  describe("limpiarTexto", () => {
    test("elimina espacios al principio y al final", () => {
      expect(FormularioRegistro.limpiarTexto("  Juan Perez  ")).toBe(
        "Juan Perez",
      );
    });

    test("devuelve cadena vacia si recibe null", () => {
      expect(FormularioRegistro.limpiarTexto(null)).toBe("");
    });

    test("devuelve cadena vacia si recibe undefined", () => {
      expect(FormularioRegistro.limpiarTexto(undefined)).toBe("");
    });

    test("convierte a texto otros valores si fuese necesario", () => {
      expect(FormularioRegistro.limpiarTexto(123)).toBe("123");
    });
  });

  describe("estaVacio", () => {
    test("devuelve true con cadena vacia", () => {
      expect(FormularioRegistro.estaVacio("")).toBe(true);
    });

    test("devuelve true con cadena formada solo por espacios", () => {
      expect(FormularioRegistro.estaVacio("   ")).toBe(true);
    });

    test("devuelve false con texto real", () => {
      expect(FormularioRegistro.estaVacio("hola")).toBe(false);
    });
  });

  describe("tieneLongitudMinima", () => {
    test("devuelve true si el texto cumple la longitud minima", () => {
      expect(FormularioRegistro.tieneLongitudMinima("abc", 3)).toBe(true);
    });

    test("devuelve false si el texto no cumple la longitud minima", () => {
      expect(FormularioRegistro.tieneLongitudMinima("ab", 3)).toBe(false);
    });

    test("tiene en cuenta espacios sobrantes al principio y al final", () => {
      expect(FormularioRegistro.tieneLongitudMinima("  ab  ", 3)).toBe(false);
    });
  });
});

describe("Validacion de email", () => {
  /*
    TODO: Casos a testear:

    emailValido
    - Debe devolver true con un email correcto.
    - Debe devolver false si falta la arroba.
    - Debe devolver false si falta el punto final.
    - Debe devolver false si contiene espacios.
    - Debe devolver false si está vacío.
    - Debe devolver false si la arroba está al principio.
    - Debe devolver false si el punto está justo después de la arroba.
    - Debe devolver false si el punto está al final.
  */
  test("devuelve true con un email correcto", () => {
    expect(FormularioRegistro.emailValido("usuario@example.com")).toBe(true);
  });

  test("devuelve false si falta la arroba", () => {
    expect(FormularioRegistro.emailValido("usuarioexample.com")).toBe(false);
  });

  test("devuelve false si falta el punto final", () => {
    expect(FormularioRegistro.emailValido("usuario@example")).toBe(false);
  });

  test("devuelve false si contiene espacios", () => {
    expect(FormularioRegistro.emailValido("usuario @example.com")).toBe(false);
  });

  test("devuelve false si esta vacio", () => {
    expect(FormularioRegistro.emailValido("")).toBe(false);
  });

  test("devuelve false si la arroba esta al principio", () => {
    expect(FormularioRegistro.emailValido("@example.com")).toBe(false);
  });

  test("devuelve false si el punto esta justo despues de la arroba", () => {
    expect(FormularioRegistro.emailValido("usuario@.com")).toBe(false);
  });

  test("devuelve false si el punto esta al final", () => {
    expect(FormularioRegistro.emailValido("usuario@example.")).toBe(false);
  });
});

describe("Validacion de edad", () => {
  /*
    TODO: Casos a testear:

    edadValida
    - Debe devolver true con 18.
    - Debe devolver true con 120.
    - Debe devolver false con 17.
    - Debe devolver false con 121.
    - Debe devolver false con un nÃºmero decimal.
    - Debe devolver false con texto.
    - Debe devolver false con cadena vacÃ­a.
    - Debe devolver false con espacios.
  */
  test("devuelve true con 18", () => {
    expect(FormularioRegistro.edadValida(18)).toBe(true);
  });

  test("devuelve true con 120", () => {
    expect(FormularioRegistro.edadValida(120)).toBe(true);
  });

  test("devuelve false con 17", () => {
    expect(FormularioRegistro.edadValida(17)).toBe(false);
  });

  test("devuelve false con 121", () => {
    expect(FormularioRegistro.edadValida(121)).toBe(false);
  });

  test("devuelve false con un numero decimal", () => {
    expect(FormularioRegistro.edadValida(1.5)).toBe(false);
  });
});
describe("Validacion de contrasena", () => {
  /*
    TODO: Casos a testear:

    passwordValida
    - Debe devolver true con 6 caracteres.
    - Debe devolver true con más de 6 caracteres.
    - Debe devolver false con menos de 6 caracteres.
    - Debe devolver false con cadena vacía.

    passwordsCoinciden
    - Debe devolver true cuando ambas contraseñas son iguales.
    - Debe devolver false cuando son distintas.
    - Debe devolver true si ambas están vacías y solo se compara igualdad literal.
    - Debe devolver false si una está rellena y la otra vacía.
  */
  describe("passwordValida", () => {
    test("devuelve true con 6 caracteres", () => {
      expect(FormularioRegistro.passwordValida("123456")).toBe(true);
    });

    test("devuelve true con mas de 6 caracteres", () => {
      expect(FormularioRegistro.passwordValida("1234567")).toBe(true);
    });

    test("devuelve false con menos de 6 caracteres", () => {
      expect(FormularioRegistro.passwordValida("12345")).toBe(false);
    });

    test("devuelve false con cadena vacia", () => {
      expect(FormularioRegistro.passwordValida("")).toBe(false);
    });
  });

  describe("passwordsCoinciden", () => {
    test("devuelve true cuando ambas contrasenas son iguales", () => {
      expect(FormularioRegistro.passwordsCoinciden("secreto", "secreto")).toBe(
        true,
      );
    });

    test("devuelve false cuando son distintas", () => {
      expect(FormularioRegistro.passwordsCoinciden("secreto", "distinta")).toBe(
        false,
      );
    });

    test("devuelve true si ambas estan vacias", () => {
      expect(FormularioRegistro.passwordsCoinciden("", "")).toBe(true);
    });

    test("devuelve false si una esta rellena y la otra vacia", () => {
      expect(FormularioRegistro.passwordsCoinciden("secreto", "")).toBe(false);
    });
  });
});
describe("Validacion de terminos", () => {
  /*
    TODO: Casos a testear:

    terminosAceptados
    - Debe devolver true si el checkbox está marcado.
    - Debe devolver false si el checkbox no está marcado.
  */
  describe("terminosAceptados", () => {
    test("devuelve true si el checkbox esta marcado", () => {
      expect(FormularioRegistro.terminosAceptados(true)).toBe(true);
    });

    test("devuelve false si el checkbox no esta marcado", () => {
      expect(FormularioRegistro.terminosAceptados(false)).toBe(false);
    });
  });
});

describe("Validaciones por campo", () => {
  describe("validarNombre", () => {
    test("devuelve error si esta vacio", () => {
      expect(FormularioRegistro.validarNombre("")).toBe(
        "El nombre es obligatorio.",
      );
    });

    test("devuelve error si tiene menos de 3 caracteres", () => {
      expect(FormularioRegistro.validarNombre("Jo")).toBe(
        "El nombre debe tener al menos 3 caracteres.",
      );
    });

    test("devuelve cadena vacia si es correcto", () => {
      expect(FormularioRegistro.validarNombre("Juan")).toBe("");
    });

    test("ignora espacios sobrantes al principio y al final", () => {
      expect(FormularioRegistro.validarNombre("  Ana  ")).toBe("");
      expect(FormularioRegistro.validarNombre("  An  ")).toBe(
        "El nombre debe tener al menos 3 caracteres.",
      );
    });
  });

  describe("validarEmail", () => {
    test("devuelve error si esta vacio", () => {
      expect(FormularioRegistro.validarEmail("")).toBe(
        "El correo electrónico es obligatorio.",
      );
    });

    test("devuelve error si no tiene formato valido", () => {
      expect(FormularioRegistro.validarEmail("usuarioexample.com")).toBe(
        "El correo electrónico no tiene un formato válido.",
      );
    });

    test("devuelve cadena vacia si es correcto", () => {
      expect(FormularioRegistro.validarEmail("usuario@example.com")).toBe("");
    });
  });

  describe("validarEdad", () => {
    test("devuelve error si esta vacia", () => {
      expect(FormularioRegistro.validarEdad("")).toBe(
        "La edad es obligatoria.",
      );
    });

    test("devuelve error si no es valida", () => {
      expect(FormularioRegistro.validarEdad("17")).toBe(
        "La edad debe ser un número entero entre 18 y 120.",
      );
    });

    test("devuelve cadena vacia si es correcta", () => {
      expect(FormularioRegistro.validarEdad("18")).toBe("");
    });
  });

  describe("validarPassword", () => {
    test("devuelve error si esta vacia", () => {
      expect(FormularioRegistro.validarPassword("")).toBe(
        "La contraseña es obligatoria.",
      );
    });

    test("devuelve error si tiene menos de 6 caracteres", () => {
      expect(FormularioRegistro.validarPassword("12345")).toBe(
        "La contraseña debe tener al menos 6 caracteres.",
      );
    });

    test("devuelve cadena vacia si es correcta", () => {
      expect(FormularioRegistro.validarPassword("123456")).toBe("");
    });
  });

  describe("validarRepetirPassword", () => {
    test("devuelve error si esta vacia", () => {
      expect(FormularioRegistro.validarRepetirPassword("123456", "")).toBe(
        "Debes repetir la contraseña.",
      );
    });

    test("devuelve error si no coincide con la contrasena original", () => {
      expect(
        FormularioRegistro.validarRepetirPassword("123456", "654321"),
      ).toBe("Las contraseñas no coinciden.");
    });

    test("devuelve cadena vacia si coincide", () => {
      expect(
        FormularioRegistro.validarRepetirPassword("123456", "123456"),
      ).toBe("");
    });
  });

  describe("validarTerminos", () => {
    test("devuelve error si no se aceptan", () => {
      expect(FormularioRegistro.validarTerminos(false)).toBe(
        "Debes aceptar los términos y condiciones.",
      );
    });

    test("devuelve cadena vacia si se aceptan", () => {
      expect(FormularioRegistro.validarTerminos(true)).toBe("");
    });
  });
});

describe("Validacion global del formulario", () => {
  /*
    TODO: Casos a testear:

    validarRegistro
    - Debe devolver esValido true si todos los datos son correctos.
    - Debe devolver todos los errores vacíos si el formulario es válido.
    - Debe devolver los datos limpios sin espacios sobrantes.
    - Debe devolver esValido false si varios campos son incorrectos.
    - Debe devolver error de nombre obligatorio si el nombre está vacío.
    - Debe devolver error de nombre corto si tiene menos de 3 caracteres.
    - Debe devolver error de email obligatorio si el email está vacío.
    - Debe devolver error de email inválido si no tiene formato correcto.
    - Debe devolver error de edad obligatoria si la edad está vacía.
    - Debe devolver error de edad inválida si es menor de 18.
    - Debe devolver error de edad inválida si es mayor de 120.
    - Debe devolver error de edad inválida si no es entera.
    - Debe devolver error de contraseña obligatoria si está vacía.
    - Debe devolver error de contraseña corta si tiene menos de 6 caracteres.
    - Debe devolver error de repetir contraseña obligatoria si está vacía.
    - Debe devolver error si las contraseñas no coinciden.
    - Debe devolver error si no se aceptan los términos.
    - Debe permitir un formulario correcto aunque los campos de texto tengan espacios alrededor.
  */
  const datosValidos = {
    nombre: "Juan Perez",
    email: "juan@example.com",
    edad: "30",
    password: "123456",
    repetirPassword: "123456",
    terminos: true,
  };

  test("devuelve esValido true si todos los datos son correctos", () => {
    expect(FormularioRegistro.validarRegistro(datosValidos).esValido).toBe(
      true,
    );
  });

  test("devuelve todos los errores vacios si el formulario es valido", () => {
    expect(FormularioRegistro.validarRegistro(datosValidos).errores).toEqual({
      nombre: "",
      email: "",
      edad: "",
      password: "",
      repetirPassword: "",
      terminos: "",
    });
  });

  test("devuelve los datos limpios sin espacios sobrantes", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        nombre: "  Juan Perez  ",
        email: "  juan@example.com  ",
        edad: "  30  ",
      }).datosLimpios,
    ).toEqual(datosValidos);
  });

  test("devuelve esValido false si varios campos son incorrectos", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        nombre: "",
        email: "correo-invalido",
        edad: "17",
        terminos: false,
      }).esValido,
    ).toBe(false);
  });

  test("devuelve error de nombre obligatorio si el nombre esta vacio", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        nombre: "",
      }).errores.nombre,
    ).toBe(FormularioRegistro.validarNombre(""));
  });

  test("devuelve error de nombre corto si tiene menos de 3 caracteres", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        nombre: "Jo",
      }).errores.nombre,
    ).toBe(FormularioRegistro.validarNombre("Jo"));
  });

  test("devuelve error de email obligatorio si el email esta vacio", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        email: "",
      }).errores.email,
    ).toBe(FormularioRegistro.validarEmail(""));
  });

  test("devuelve error de email invalido si no tiene formato correcto", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        email: "usuarioexample.com",
      }).errores.email,
    ).toBe(FormularioRegistro.validarEmail("usuarioexample.com"));
  });

  test("devuelve error de edad obligatoria si la edad esta vacia", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        edad: "",
      }).errores.edad,
    ).toBe(FormularioRegistro.validarEdad(""));
  });

  test("devuelve error de edad invalida si es menor de 18", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        edad: "17",
      }).errores.edad,
    ).toBe(FormularioRegistro.validarEdad("17"));
  });

  test("devuelve error de edad invalida si es mayor de 120", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        edad: "121",
      }).errores.edad,
    ).toBe(FormularioRegistro.validarEdad("121"));
  });

  test("devuelve error de edad invalida si no es entera", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        edad: "18.5",
      }).errores.edad,
    ).toBe(FormularioRegistro.validarEdad("18.5"));
  });

  test("devuelve error de contrasena obligatoria si esta vacia", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        password: "",
        repetirPassword: "",
      }).errores.password,
    ).toBe(FormularioRegistro.validarPassword(""));
  });

  test("devuelve error de contrasena corta si tiene menos de 6 caracteres", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        password: "12345",
        repetirPassword: "12345",
      }).errores.password,
    ).toBe(FormularioRegistro.validarPassword("12345"));
  });

  test("devuelve error de repetir contrasena obligatoria si esta vacia", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        repetirPassword: "",
      }).errores.repetirPassword,
    ).toBe(FormularioRegistro.validarRepetirPassword("123456", ""));
  });

  test("devuelve error si las contrasenas no coinciden", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        repetirPassword: "654321",
      }).errores.repetirPassword,
    ).toBe(FormularioRegistro.validarRepetirPassword("123456", "654321"));
  });

  test("devuelve error si no se aceptan los terminos", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        terminos: false,
      }).errores.terminos,
    ).toBe(FormularioRegistro.validarTerminos(false));
  });

  test("permite un formulario correcto aunque los campos de texto tengan espacios alrededor", () => {
    expect(
      FormularioRegistro.validarRegistro({
        ...datosValidos,
        nombre: "  Juan Perez  ",
        email: "  juan@example.com  ",
        edad: "  30  ",
      }).esValido,
    ).toBe(true);
  });
});
