3D MODELS

Place project .glb files here before publishing the site.
=====================================

Each project that shows the 360° viewer looks for its model at a fixed
path. Drop a file with the matching name into this folder and it loads
automatically and permanently — no code changes needed.

  models/duna.glb            → Duna
  models/coffee-ritual.glb   → Coffee Ritual
  models/sense-rituals.glb   → Sense Rituals
  models/prisma.glb          → Prisma

Until a file exists here, the viewer shows a placeholder sample model.

Tips
----
• Export from your 3D tool as .glb (binary glTF). It bundles geometry +
  textures into one file, which is what the viewer wants.
• Keep files reasonably small (ideally under ~5 MB) so they load fast.
  In Blender: File ▸ Export ▸ glTF 2.0 (.glb), and turn on Compression.
• The name must match exactly (lowercase, no spaces), e.g. "duna.glb".

To point a project at a different filename, change its `model:` field in
src/data.jsx.
