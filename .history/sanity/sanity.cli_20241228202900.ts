import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'mo3mvugi',
    dataset: 'production',
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
  /**
   * Extend CLI commands with custom scripts or utilities.
   */
  hooks: {
    onStart: () => {
      console.log('CLI initialized. Ready to manage your Sanity project!');
    },
    onError: (error) => {
      console.error('An error occurred in the CLI:', error);
    },
  },
