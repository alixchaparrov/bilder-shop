const product = {
  name: "product",
  title: "Produkt",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100).error("Der Name muss zwischen 3 und 100 Zeichen lang sein."),
    },
    {
      name: "price",
      title: "Preis (Euro)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).precision(2).error("El precio debe ser un número positivo con hasta dos decimales."),
    },
    {
      name: "image",
      title: "Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("La imagen es obligatoria."),
    },
    {
      name: "description",
      title: "Beschreibung",
      type: "text",
      validation: (Rule) => Rule.max(500).warning("La descripción no debe superar los 500 caracteres."),
    },
  ],
};

export default product;
