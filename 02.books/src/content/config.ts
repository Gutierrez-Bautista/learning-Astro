import { defineCollection, z } from "astro:content";
// z --> Zod Schema

import { glob } from "astro/loaders";
// glob --> loader para directorios de archivos de cualquier lugar del sistema de archivos
/* Sintaxis
glob({
  pattern: string | string[],
  base?: string | URL (defaulr: "."),
  generateId?: (options: GenerateIdOptions) => string
})
*/

// - pattern: matron que deben cumplir los archivos generalmente usado para definir el tipo de archivo. Ej: "**/*.md" (todos los .md), "**./*.(md|mdx)" (todos los .md y .mdx)
// base: directorio donde base donde buscar, por defecto busca desde la raiz del proyecto, en general su valor será al parecido a ".src/content/collectionName"
// generateId: callback para generar un ID unico para esa entrada de la coleción

const books = defineCollection({
  // todos los .md (pattern) dentro de "./src/content/books" (base)
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    img: z.string(),
    readtime: z.number(),
    description: z.string(),
    buy: z.string().url(),

  })
})

export const collections = { books }