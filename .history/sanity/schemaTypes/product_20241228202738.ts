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
      validation: (Rule) => Rule.required().min(0).precision(2).error("Der Preis muss eine positive Zahl mit bis zu zwei Dezimalstellen sein."),
    },
    {
      name: "image",
      title: "Bild",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required().error("Das Bild ist obligatorisch."),
    },
    {
      name: "description",
      title: "Beschreibung",
      type: "text",
      validation: (Rule) => Rule.max(500).warning("Die Beschreibung sollte 500 Zeichen nicht überschreiten."),
    },
  ],
};

export default product;
