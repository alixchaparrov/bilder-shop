import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'mo3mvugi',
    dataset: 'production',
    apiVersion: '2023-01-01', // Fecha del API
  useCdn: true, // Usa CDN para mejorar el rendimiento en producción
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
