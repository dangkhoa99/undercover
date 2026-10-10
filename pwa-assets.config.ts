import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// `bun run pwa:icons` regenerates the PNG icons in public/ from public/icon.svg.
export default defineConfig({
  preset: minimal2023Preset,
  images: ['public/icon.svg'],
})
