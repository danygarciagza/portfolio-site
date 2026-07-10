/* data.jsx — bilingual content for Daniela García's portfolio.
   Exposed on window.PF (data) and window.T (ui strings). */

const CATEGORIES = [
  {
    id: "product",
    color: "var(--tab-1)",
    name: { en: "Product design", es: "Diseño de producto" },
    spine: { en: "PRODUCT", es: "PRODUCTO" },
    blurb: {
      en: "Objects that solve something real and still make you smile — ergonomics, ritual and a bit of story.",
      es: "Objetos que resuelven algo real y también te hacen sonreír: ergonomía, ritual y un poco de historia.",
    },
  },
  {
    id: "graphic",
    color: "var(--tab-4)",
    name: { en: "Graphic & branding", es: "Gráfico y marca" },
    spine: { en: "BRAND", es: "MARCA" },
    blurb: {
      en: "Marks and identities — geometric play, warm type and logos I'm still fond of.",
      es: "Marcas e identidades: juego geométrico, tipografía cálida y logos que aún me gustan.",
    },
  },
  {
    id: "furniture",
    color: "var(--tab-2)",
    name: { en: "Furniture & space", es: "Mobiliario y espacio" },
    spine: { en: "SPACE", es: "ESPACIO" },
    blurb: {
      en: "Pieces and rooms — modular systems, furniture and a table that bends light.",
      es: "Piezas y espacios: sistemas modulares, mobiliario y una mesa que dobla la luz.",
    },
  },
];

/* Default sample .glb shown in the 3D viewer when a project model is not present.
   Per-project: add a `model` field with a .glb URL to override. */
/* Sample model shown until a project's real .glb is added. */
const DEFAULT_MODEL = "https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Models@master/2.0/WaterBottle/glTF-Binary/WaterBottle.glb";

/* Per-project .glb paths. Until the file exists, the viewer falls back to
   DEFAULT_MODEL automatically. */

const PROJECTS = [
  {
    slug: "duna", category: "product", year: "2024", has3d: true, show3dPoster: false, rot: "-2deg", coverSrc: "uploads/duna-cover-2.webp", coverAspect: "1410/2250", coverPosition: "50% 50%", coverScale: "1",
    model: "models/duna.glb",
    title: "Duna",
    tag: { en: "Family of products", es: "Familia de productos" },
    oneLine: {
      en: "Ergonomic kitchenware for hands with limited mobility — arthritis-friendly, dune-soft forms.",
      es: "Vajilla ergonómica para manos con dolor: amable con la artritis y suave como una duna.",
    },
    materials: { en: "Ceramic · Concept + renders", es: "Cerámica · Concepto + renders" },
    chips: { en: ["Inclusive Design", "Ergonomics", "System Design"], es: ["Inclusive Design", "Ergonomics", "System Design"] },
    body: {
      en: "Inspired by the sand dunes of Coahuila, Duna is a family of three pieces for people living with arthritis or chronic joint pain. A two-handled cup, sized like a matcha chawan, is easy to lift without gripping. A tabletop lime squeezer replaces the painful one-handed squeeze used across Mexico with a lever-hinge: rest it down, lift the arm, place the lime, press down. A handled container completes the set. Every form softens a daily ritual that usually hurts.",
      es: "Inspirada en las dunas de Coahuila, Duna es una familia de tres piezas para personas con artritis o dolor articular crónico. La taza de dos asas, con proporciones similares a un chawan de matcha, se puede levantar sin apretar. El exprimidor de limón de mesa sustituye el gesto doloroso de exprimir con una sola mano por una bisagra de palanca: lo apoyas, levantas el brazo, colocas el limón y presionas hacia abajo. Un contenedor con asa completa la familia. Cada pieza suaviza un ritual cotidiano que normalmente duele.",
    },
  },
  {
    slug: "coffee-ritual", category: "product", year: "2026", has3d: false, mainHeight: "500px", mainUnframed: true, rot: "1.5deg",
    title: { en: "Ryūsui", es: "Ryūsui" },
    mainSrc: "uploads/coffee-ritual-main.webp",
    thumbSrcs: { 2: "uploads/coffee-ritual-thumb-2.webp" },
    tag: { en: "Pour-over set", es: "Set para café de filtro" },
    oneLine: {
      en: "A pour-over set drawn from Japanese zen gardens — stone, moss, raked sand.",
      es: "Un set de café de filtro inspirado en jardines zen: piedra, musgo y arena rastrillada.",
    },
    materials: { en: "Ceramic · Concept + renders", es: "Cerámica · Concepto + renders" },
    chips: { en: ["Tableware", "Product Development"], es: ["Tableware", "Product Development"] },
    body: {
      en: "Drip coffee is a small ritual of patience and repeated, spiral motions — the same rhythm as tending a zen garden. The set translates that directly: the dripper is the garden stone, the cup-stand wears an irregular green moss texture, and the cup itself carries the raked lines of sand. Three textures, one quiet morning.",
      es: "El café de filtro es un pequeño ritual de paciencia y movimientos repetidos en espiral, el mismo ritmo que se encuentra al cuidar un jardín zen. El set lo traduce de forma directa: el dripper funciona como la piedra del jardín, el soporte lleva una textura irregular de musgo verde y la taza conserva las líneas rastrilladas de la arena. Tres texturas para una mañana tranquila.",
    },
  },
  {
    slug: "sense-rituals", category: "product", year: "2025", has3d: true, thumbCount: 6, modelHeight: "360px", cameraOrbit: "0deg 75deg 52%", rot: "-1.2deg",
    model: "models/sense-rituals.glb",
    title: "Sense Rituals",
    tag: { en: "Family of products", es: "Familia de productos" },
    oneLine: {
      en: "Three objects for the senses — candle, incense, tea — that nest into one sculptural form.",
      es: "Tres objetos para los sentidos —vela, incienso, té— que se guardan en una sola forma.",
    },
    materials: { en: "Brass and Wood · Concept", es: "Latón y madera · Concepto" },
    chips: { en: ["System Design", "Modular", "Experimental"], es: ["System Design", "Modular", "Experimental"] },
    body: {
      en: "A set of three home objects built from spheres and half-domes: a candle holder (sight & touch), an incense holder (smell) and a tea canister (taste). Two of them store together to read as a single sculptural piece, so the family stays calm and consistent on a shelf — and reveals itself only when used. Brass and wood.",
      es: "Un set de tres objetos para el hogar construidos con esferas y medias cúpulas: un portavelas (vista y tacto), un portaincienso (olfato) y un bote para té (gusto). Dos de ellos se guardan juntos y se leen como una sola pieza escultórica, de modo que la familia se mantiene tranquila y consistente en una repisa, y se revela sólo al usarse. Latón y madera.",
    },
  },
  {
    slug: "nido", category: "product", year: "2025", has3d: false, mainUnframed: true, wideSrc: "uploads/nido-elephant-views.webp", wideAspect: "4/3", rot: "1deg",
    title: "Nido",
    tag: { en: "Family of products", es: "Familia de productos" },
    oneLine: {
      en: "Animal-shaped hygiene dispensers that make hand-washing fun for kids.",
      es: "Dispensadores con forma de animal que hacen divertido lavarse las manos.",
    },
    materials: { en: "Concept · Renders", es: "Concepto · Renders" },
    chips: { en: ["Lifestyle Accessories", "Concept Development"], es: ["Lifestyle Accessories", "Concept Development"] },
    body: {
      en: "Nido (\u201cnest\u201d) is a family of classroom dispensers designed to turn hygiene routines into an intuitive, playful experience for kids. Combining safe, rounded forms with functional modularity, the Elephant Dispenser accommodates both standard and center-pull rolls across three distinct setups. Each configuration cleverly shapes the visual narrative: a vertical standard roll dispenses from the front to mimic elephant tusks, a vertical center-pull roll feeds downward like water spraying from a trunk, and a classic horizontal setup offers a familiar, intuitive downward pull.",
      es: "Nido es una familia de dispensadores para el salón de clases diseñada para convertir las rutinas de higiene en una experiencia intuitiva y lúdica para niños. Al combinar formas seguras y redondeadas con modularidad funcional, el Dispensador Elefante aloja rollos estándar y de extracción central en tres configuraciones distintas. Cada configuración construye de forma inteligente una narrativa visual: un rollo estándar vertical dispensa desde el frente para imitar los colmillos de un elefante, un rollo vertical de extracción central alimenta hacia abajo como agua saliendo de una trompa, y una configuración horizontal clásica ofrece un gesto familiar e intuitivo de jalar hacia abajo.",
    },
  },
  {
    slug: "prisma", category: "furniture", year: "2025", has3d: false, mainHeight: "440px", mainUnframed: true, rot: "-1.5deg",
    title: "Prisma",
    tag: { en: "Side table", es: "Mesa auxiliar" },
    oneLine: {
      en: "A triangular side table whose colored glass throws a Pink Floyd rainbow.",
      es: "Una mesa auxiliar triangular cuyo cristal de color proyecta un arcoíris al estilo Pink Floyd.",
    },
    materials: { en: "Colored glass · Steel · Render", es: "Cristal de color · Acero · Render" },
    chips: { en: ["Furniture Design", "Parametric"], es: ["Furniture Design", "Parametric"] },
    body: {
      en: "A triangular side table with colored glass panels set into its supports. When light passes through, the three primaries blend across the floor like a prism — a quiet nod to The Dark Side of the Moon. It isn't a real prism; it's three sheets of colored glass placed so their shadows overlap into a rainbow.",
      es: "Una mesa auxiliar triangular con paneles de cristal de color en sus soportes. Cuando la luz los atraviesa, los tres colores primarios se mezclan en el piso como un prisma: un guiño a The Dark Side of the Moon. No es un prisma real; son tres láminas de cristal de color colocadas para que sus sombras se superpongan y formen un arcoíris. Modelada y renderizada.",
    },
  },
  {
    slug: "concept-store", category: "furniture", year: "2025", has3d: false, galleryLayout: "main-grid", gridCount: 4, mainHeight: "380px", thumbAspect: "16/9", rot: "1.2deg",
    title: { en: "Symbiosis", es: "Symbiosis" },
    tag: { en: "Space + objects", es: "Espacio + objetos" },
    oneLine: {
      en: "A converging space — retail, performance, and coffee — with three families of modular objects designed for it.",
      es: "Un espacio de convergencia —tienda, performance y café— con tres familias de objetos modulares diseñadas para habitarlo.",
    },
    materials: { en: "Spatial · Furniture", es: "Espacio · Mobiliario" },
    chips: { en: ["Spatial Design", "Commercial Furniture"], es: ["Spatial Design", "Commercial Furniture"] },
    body: {
      en: "Symbiosis is a concept store built on convergence — retail, a central performance stage, and a coffee bar sharing one open room. A circular skylight pours light onto a sunken stage that spirals down in a continuous ramp, ringed by a floor-length curtain that opens or closes to re-stage the space for each day's program. I designed three modular families for it, named for the biology that inspired the concept: a Modular Tile that arranges into near-endless patterns; Membrane, interlocking seats and tables that puzzle together into countless configurations; and Cell, display stands for showing work by local artists and makers.",
      es: "Symbiosis es una tienda conceptual construida sobre la idea de convergencia: retail, un escenario central para performances y una cafetería conviven en una misma sala abierta. Un tragaluz circular deja caer la luz sobre un escenario hundido que desciende en una rampa continua en espiral, rodeado por una cortina de piso a techo que se abre o se cierra para reconfigurar el espacio según el programa de cada día. Diseñé tres familias modulares para este entorno, nombradas a partir de la biología que inspiró el concepto: un Azulejo Modular que se acomoda en patrones casi infinitos; Membrana, asientos y mesas que se entrelazan como un rompecabezas en múltiples configuraciones; y Célula, estantes de exhibición para mostrar el trabajo de artistas y creadores locales.",
    },
  },
  {
    slug: "pet-station", category: "furniture", year: "2026", has3d: false, coverSrc: "uploads/huella-main.webp", coverPosition: "44% 50%", mainSrc: "uploads/huella-main-station.webp", mainHeight: "500px", mainUnframed: true, rot: "-.6deg",
    title: "Huella",
    thumbSrcs: { 1: "uploads/huella-main.webp", 2: "uploads/huella-process-cropped.webp", 3: "uploads/huella-use-standing.webp" },
    thumbPositions: { 2: "50% 48%", 3: "50% 43%" },
    tag: { en: "Pet care station", es: "Estación para mascotas" },
    oneLine: {
      en: "A full-scale modular pet station built from concept to high-quality prototype.",
      es: "Una estación modular para mascotas desarrollada desde concepto hasta prototipo de alta calidad.",
    },
    materials: { en: "Laminated MDF · Blum hardware · Prototype", es: "MDF laminado · Herrajes Blum · Prototipo" },
    chips: { en: ["Furniture Design", "Modular", "Prototype"], es: ["Furniture Design", "Modular", "Prototype"] },
    body: {
      en: "Huella was developed for a university design challenge in collaboration with Blum, where the project specifications required the use of Blum hardware. My team designed and built a full modular pet station from concept to high-quality prototype using laminated MDF and integrated hardware for storage, access and daily use. The piece centralizes feeding, rest, accessories and organization into one furniture system for contemporary homes where pet care and everyday routines share the same space. Our project won the challenge, earning the team a trip to Austria to visit Blum's headquarters.",
      es: "Huella se desarrolló para un reto de diseño universitario en colaboración con Blum, donde las especificaciones del proyecto requerían integrar herrajes Blum. Mi equipo diseñó y construyó una estación modular completa para mascotas, desde el concepto hasta un prototipo de alta calidad, usando MDF laminado y herrajes integrados para almacenamiento, acceso y uso diario. La pieza centraliza alimentación, descanso, accesorios y organización en un solo sistema de mobiliario para hogares contemporáneos donde el cuidado de una mascota convive con las rutinas diarias. Nuestro proyecto ganó el reto, obteniendo para el equipo un viaje a Austria para visitar la sede de Blum.",
    },
  },
  {
    slug: "fronttec", category: "graphic", year: "2023", has3d: false, galleryLayout: "grid4", hideMaterials: true, rot: "-1deg",
    title: "FronTec",
    tag: { en: "Logo & identity", es: "Logo e identidad" },
    oneLine: {
      en: "An isometric-cube logo for a university front-end dev team.",
      es: "Un logo de cubo isométrico para un equipo universitario de desarrollo front-end.",
    },
    materials: { en: "Logo · Identity", es: "Logo · Identidad" },
    chips: { en: ["Visual Identity", "Brand Strategy"], es: ["Visual Identity", "Brand Strategy"] },
    body: {
      en: "A logo for FronTec, a university front-end development team. It's an isometric cube: the left face is an F, the right face a T, and the top face holds the angle-bracket pair </> that the cube's geometry frames perfectly. Built on geometric play, with a confident purple. One of the marks I'm most proud of.",
      es: "Un logo para FronTec, un equipo universitario de desarrollo front-end. Es un cubo isométrico: la cara izquierda es una F, la derecha una T, y la cara superior sostiene el par </> que la geometría del cubo enmarca a la perfección. Está construido desde un juego geométrico, con un morado firme. Es una de las marcas de las que estoy más orgullosa.",
    },
  },
  {
    slug: "candle-co", category: "graphic", year: "2023", has3d: false, rot: "1.5deg",
    title: { en: "Lumi", es: "Lumi" },
    tag: { en: "Logo & logotype", es: "Logo y logotipo" },
    oneLine: {
      en: "Logo and logotype for a small candle business.",
      es: "Logo y logotipo para un peque\u00f1o negocio de velas.",
    },
    materials: { en: "Logo · Logotype", es: "Logo · Logotipo" },
    chips: { en: ["Packaging Design", "Visual Identity"], es: ["Packaging Design", "Visual Identity"] },
    body: {
      en: "A compact identity for a candle business I ran briefly. I still like the mark — warm, simple, and easy to stamp on kraft paper and wax seals.",
      es: "Una identidad compacta para un negocio de velas que tuve por un tiempo. Todav\u00eda me gusta la marca: c\u00e1lida, simple y f\u00e1cil de estampar en papel kraft y sellos de cera.",
    },
  },
];

const T = {
  nav:    { en: ["Home", "About", "Work", "Contact"], es: ["Inicio", "Sobre m\u00ed", "Proyectos", "Contacto"] },
  role:   { en: "Industrial designer", es: "Dise\u00f1adora industrial" },
  intro:  {
    en: "Industrial designer. I make objects with a story, a bit of humor, and a reason to exist.",
    es: "Dise\u00f1adora industrial. Hago objetos con una historia, algo de humor y una raz\u00f3n de ser.",
  },
  tagline: {
    en: "I craft objects, brands, and experiences that bridge tactile storytelling with human-centered logic. From strategic ergonomics to poetic rituals.\n\nWelcome to my studio workspace.",
    es: "Diseño objetos, marcas y experiencias que conectan la narrativa táctil con una lógica centrada en las personas. Desde la ergonomía estratégica hasta los rituales poéticos.\n\nBienvenida a mi espacio de estudio.",
  },
  sig:    { en: "— hi, I'm Dani", es: "— hola, soy Dani" },
  openTag:{ en: "open", es: "\u00e1breme" },
  aboutTag:{ en: "that's me", es: "esa soy yo" },
  contactTag:{ en: "say hi", es: "escr\u00edbeme" },
  tocLabel:{ en: "Contents", es: "Contenido" },
  projects:{ en: "Projects", es: "Proyectos" },
  // about
  idOrg:  { en: "DG \u2014 Object Studio", es: "DG \u2014 Estudio de Objetos" },
  idSub:  { en: "Identification card", es: "Tarjeta de identificaci\u00f3n" },
  idName: { en: "Name", es: "Nombre" },
  idSpec: { en: "Specialty", es: "Especialidad" },
  idSpecV:{ en: "Industrial design", es: "Dise\u00f1o industrial" },
  idBelief:{ en: "Believes in", es: "Cree en" },
  idBeliefV:{ en: "Objects with a story", es: "Objetos con historia" },
  idPlace:{ en: "Issued in", es: "Emitida en" },
  idPlaceV:{ en: "Mexico", es: "M\u00e9xico" },
  idValid:{ en: "Valid", es: "Vigencia" },
  stamp:  { en: "Certified object maker", es: "Hacedora de objetos certificada" },
  bio: {
    en: "I'm <b>Daniela García</b>, an industrial designer based in Mexico. I create functional objects that balance genuine user empathy with aesthetic intent, bringing a thoughtful, human element to everyday interactions. My process bridges digital precision with physical craft, taking projects from initial concept and 3D modeling all the way to tangible, working prototypes.",
    es: "Soy <b>Daniela García</b>, diseñadora industrial basada en México. Creo objetos funcionales que equilibran una empatía genuina hacia el usuario con intención estética, aportando un elemento humano y considerado a las interacciones cotidianas. Mi proceso conecta la precisión digital con el oficio físico, llevando los proyectos desde el concepto inicial y el modelado 3D hasta prototipos tangibles y funcionales.",
  },
  // detail
  overview:{ en: "Overview", es: "Resumen" },
  year:   { en: "Year", es: "A\u00f1o" },
  type:   { en: "Type", es: "Tipo" },
  made:   { en: "Made with", es: "Materiales" },
  rotateHint:{ en: "hover to peek in 3D", es: "pasa el cursor para ver en 3D" },
  threeD: { en: "360\u00b0", es: "360\u00b0" },
  prev:   { en: "Previous", es: "Anterior" },
  next:   { en: "Next", es: "Siguiente" },
  backTo: { en: "Back to", es: "Volver a" },
  viewProject:{ en: "View project", es: "Ver proyecto" },
};

window.PF = { CATEGORIES, PROJECTS, DEFAULT_MODEL };
window.T = T;
