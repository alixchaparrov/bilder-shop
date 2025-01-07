const product = {
    name: "product",
    title: "Produkt",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Name",
        type: "string",
      },
      {
        name: "price",
        title: "Preis (Euro)",
        type: "number",
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
  