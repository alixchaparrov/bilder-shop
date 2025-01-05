import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'bilder-shop',

  projectId: 'mo3mvugi',
  dataset: 'production',
  apiVersion: "2023-01-01",
  token: process.env.SANITY_WRITE_TOKEN, 
  useCdn: false, 

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
