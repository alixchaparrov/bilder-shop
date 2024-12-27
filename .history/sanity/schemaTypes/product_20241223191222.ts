const product = {
    name: "product",
    title: "Produkt",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "price",
        title: "Preis (Euro)",
        type: "number",
        validation: (Rule) => Rule.min(0),
      },
      {
        name: "image",
        title: "Bild",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "description",
        title: "Beschreibung",
        type: "text",
      },
    ],
  };
  
  export default product;
  