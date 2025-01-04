import { defineConfig } from "sanity";

export default defineConfig({
  projectId: "",
  dataset: "your_dataset",
  plugins: [],
  studio: {
    components: {
      logo: () => <div>Bilder-Shop Studio</div>, // Logotipo personalizado
      navbar: ({ renderDefault }) => (
        <div className="custom-navbar">{renderDefault()}</div> // Navbar personalizado
      ),
    },
  },
});


mo3mvugi