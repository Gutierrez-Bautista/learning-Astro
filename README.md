# Astro

Astro ([web](https://astro.build/)) es un framework de JavaScript (llamado JS de ahora en más) pensado para hacer páginas estáticas centradas en el contenido, como blogs o landing pages entre otras; no obstante Astro permite crear culaquier tipo de página. Las principales características de Astro son:

1. Agnostico a la UI: Esto quiere decir que Astro permite utilizar la mayoría de frameworks frontend más importantes, React, Preact, Svelt, Vue y Solid. Esto implica que con Astro podemos usar cualquiera de ellos, los 5 a la vez, dos o ninguno sin problemas.

2. Content Collections/Content Layers: Estas son colecciones de contenido que nos ayudan a la hora de manejar el contenido que mostramos el la página, post de un blog (productos de un ecommers, etc).

3. Cero JavaScript, por defecto: Por defecto Astro no manda JS al cliente, lo que ayuda al rendimiento.

4. View Transitions: Astro nos otorga una forma sencilla de usar la View Transition API para hacer transiciones entre páginas.

5. Plantillas: Astro posee muchas plantillas creadas por la comunidad que podemos utilizar como queramos, desde blogs, documentación, landing pages, entre otras.

## Crear Proyecto de Astro

En la página de Astro nada más entrar nos proporciona el comando para crear un proyecto `npm create astro@latest` el cual lo hace con la última versión de Astro, tras esto nos hará una serie de preguntas sobre el proyecto:

1. Nomre del proyecto
2. Incluir archivos por defecto (recomendable), blog template, o vacío.
3. Instalar dependencias (sí o no)
4. Inicializar repositorio (sí o no)

*Astro por defecto busca que escribamos TS*

En VS Code tenemos que instalar la [extensión de Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) para que nos resalte correctamente la sintaxis de los archivos `.astro`

### Estructura del Proyecto

El proyecto creado con Astro nos proporciona los siguientes archivos por defecto:

- **astro.config.mjs**
- **tsconfig.json**: en caso de que selecionemos que escribiremos TS
- **public/**: para archivos estáticos
- **src/**: Todo lo referente a la aplicación
- **src/components/**
- **src/layouts/**: los layouts son componentes de Astro que definen la estructura UI compartida por una o más páginas
- **src/pages/**: son las rutas de nuestra página, los tipos de archivos soportados son ".astro", ".md", ".mdx" (con la integración de MDX instalada), ".html", ".js/.ts" (como endpoints)

## Sintaxis de Astro

Para seguir la siguiente explicación recomiendo ver el archivo por defecto `*/src/components/Welcome.astro` creado por `npm create astro@latest`

Al principio de los archivos `.astro` nos encontramos un bloque encerrado entre 3 guiones medios (`---`), es allí donde podemos escribir JS o TS, es decir, es donde hacemos los imports de componentes, fetching de datos, acceder a props, etc.

![Imagen de ejemplo del párrafo anterior](./images/astro-sintax-1.png)

Si bajamos nos encontramos algo HTML que es aquello que se renderiza, si vemos `*/src/pages/index.astro` veremos que no solo puede ser HTML si no también componentes.

![Imagen de ejemplo del párrafo anterior](./images/astro-sintax-2.png)

Por último nos encontramos una etiqueta `<style>` que engloba los estilos que le daremos a esa parte de la página, cabe aclarar que estos estilos no son globales, tienen un scope limitado al archivo en el que se encuentran.

![Imagen de ejemplo del párrafo anterior](./images/astro-sintax-3.png)

En caso de que queramos que unos estilos sean globales debemos asignarle la directiva (ver [Directivas en Astro](#directivas-de-maquetado)) "is:global" como se ve a continuación.

```astro
<style is:global>
  <!-- ... -->
</style>
```

Es de aclarar que a diferencia de React, Astro no requiere que exportemos nada, el archivo en sí es el componente.

## Variable Global Astro

En todos los archivos `.astro` tenemos acceso a la variable Astro la cual guarda las propiedades que se le pasan al componente de Astro, cookies, respuestas, entre otas cosas.

## Integrar Frameworks a Astro

Para integrar un framework con Astro en la mayoría de los casos es tan simple como ejecutar `npm astro add <framework>`. Para ver todas las integraciones que podemos hacer con este comando ejecutamos `npx astro add --help`, no obstante aquí está la lista actualizada al día 18/02/2025:

- Frameworks UI:
    - react
    - preact
    - vue
    - svelte
    - solid-js
    - lit
    - alpinejs
- Frameworks de Documentación:
    - starlight
- Adaptadores SSR:
    - netlify
    - vercel
    - deno
    - cloudflare
    - node
- Otros:
    - db
    - tailwind
    - mdx
    - markdoc
    - partytown
    - sitemap

Que un framework no se encuentre en esta lista no implica que no se pueda usar junto con Astro, simlplementa hay que buscar una integración hecha por la comunidad y hacerla manualmente.

## Layouts y Slot

Los layouts son componentes que están pensados para envolver toda la página, son los que tienen la etiqueta "html", "body", "head", todas las etiquetas "meta", etc, si vemos el layout por defecto de Astro en `*/src/layouts/Layout.astro` veremos que es justamente esto:

![contenido del archivo mencionado](./images/layouts-1.png)

Pero hay algo peculiar en este archivo y es la etiqueta "<slot\>" dentro de "<body\>" esta etiqueta slot es el equivalete a la igualmente llamada en Vue y Svelt y a "children" en React, esta contiene todo lo que se le pase como hijo al componente de Astro. es decir,  que si en nuestro `*/src/pages/index.astro` tenemos lo siguiente:

```astro
---
import Layout from '../layouts/Layout.astro'
---

<Layout>
	<h1>Hola Mundo</h1>
  <p>Texto de ejemplo</p>
</Layout>
```

Se renderizará el h1 y el párrafo dentro de la etiqueta "body" del Layout.astro

Ahora supongamos que tenemos un componente MenuBtn y queremos poder indicar facilmente si el icono va antes o después del texto siendo ambos hijos del componente, si bien podríamos directamente cambiar el orden de estos al momento de pasarlos al componente es más práctico usar slots nombrados. Para ello en nuestro componente MenuBtn hacemos lo siguiente:

```astro
<!-- path: */src/components/MenuBtn.astro -->
<a class="menu-btn">
  <!-- Le asignamos un nombre a este slot -->
  <slot name="before">

  <!-- A los hijos que no le asignemos un slot especifico van al que no tiene nombre -->
  <slot />

  <slot name="after">
</a>
```

Ahora para asignar un slot a los hijos usamos la propiedad de Astro "slot" como se ve a continuación: 

```js
// path: */src/components/Menu.astro

// Pongo como bloques separados el JS del resto del archivo .astro para que MD dé el formato correcto
---
import MenuBtn from "./MenuBtn.astro"
import InfoIcon from "./icons/Info.astro" // Esto sería un SVG, suponemos que está aparte para reducir el código de ejemplo
import ProductsIcon from "./icons/Products.astro"
---
```
```astro


<div class="main-menu">
  <MenuBtn>
    <InfoIcon slot="before">
    Información
  </MenuBtn>
  <MenuBtn>
    Productos
    <ProductsIcon slot="before">
  </MenuBtn>
</div>
```

En este caso ambos iconos se mostraran antes del texto, porque es texto se asigna al slot por defecto mietras que el slot de ambos iconos se encuentra antes que ese

## Enrutamiento en Astro

Al igual que otros frameworks como NextJS Astro usa el sistema de archivos para definir las rutas, en este caso usa el directorio `*/src/pages/`, por ejemplo, si tenemos un archivo `index.astro` en ese directorio será ese el que se cargue namas abrir la página ("mipagina.com/"), por otro lado si tenemos un `about.astro` este archivo se servirá al acceder a "mipagina.com/about"

### Error 404

Si creamos una página llamada "404.*" Astro lo interpretará como la página que debe mostrar al no encontrar otra.

### Rutas Dinamicas

In progress...

## Directivas de Maquetado

Las directivas de maquetado son atributos especiales de HTML disponibles dentro de los componentes de Astro.

Las directivas de maquetado se utilizan para controlar el comportamiento de un elemento o componente de una forma concreta. Una directiva de maquetado puede habilitar alguna característica del compilador que nos hagan la vida más fácil, o puede decirle al compilador de Astro que haga algo especial con ese componente.

Todas las directivas de Astro incluyend ":" en su sintaxis

### Algunas Directivas Comunes

#### class:list

Toma un array de clases y los convierte en un string. impulsado por la biblioteca auxiliar [clsx](https://github.com/lukeed/clsx)

class:list toma un array de varios tipos de valores posibles diferentes:
- `string`: Agregado al atributo `class`
- `Object`: Todas las keys verdaderas se agregan al atributo `class`
- `Array `: aplanado
- `false `, `null`, o `undefined`: Omitido

```astro
<!-- Esto -->
<span class:list={[ 'hola foo', { mundo: true }, [ 'buz' ] ]} />
<!-- Se convierte en -->
<span class="hola foo mundo buz"></span>
```

### Directivas del Clinente

In progress...