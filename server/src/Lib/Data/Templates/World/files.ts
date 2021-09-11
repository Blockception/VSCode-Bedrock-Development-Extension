/**The template for the world manifest*/
export function create_manifest(UUID1: string, UUID2: string): string {
  return manifest.replace(/%UUID1%/gi, UUID1).replace(/%UUID2%/gi, UUID2);
}
const manifest: string = `{
   "format_version": 2,
   "header": {
     "name": "pack.name",
     "description": "pack.description",
     "uuid": "%UUID1%",
     "version": [1, 0, 0],
     "lock_template_options": true,
     "base_game_version": [1, 16, 200]
   },
   "modules": [
     {
       "type": "world_template",
       "uuid": "%UUID2%",
       "version": [1, 0, 0]
     }
   ],
   "metadata": { "authors": ["Example author"] }
}`;
