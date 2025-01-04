import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Bilder-Shop',

  projectId: 'mo3mvugi',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  /**
   * Preview document-specific configurations (optional).
   * Example: Set up live previews or customize document views.
   */
  document: {
    actions: (prev, context) => {
      if (context.schemaType === 'product') {
        return prev.filter((action) => action.action !== 'delete'); // Example: prevent deletion for products.
      }
      return prev;
    },
  },

  /**
   * Optional hooks for fine-grained control of Studio behavior.
   */
  hooks: {
    onSchemaReady: () => {
      console.log('Schema loaded successfully!');
    },
    onSchemaError: (error) => {
      console.error('Schema loading error:', error);
    },
  },

  /**
   * Custom branding for Studio.
   */
  studio: {
    components: {
      logo: () => <div>Bilder-Shop Studio</div>,
      navbar: ({ renderDefault }) => (
        <div className="custom-navbar">
          {renderDefault()}
          <div>Extra Menu</div>
        </div>
      ),
    },
  },
});
