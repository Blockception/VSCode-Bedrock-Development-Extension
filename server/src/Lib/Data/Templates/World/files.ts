/**The template for the world manifest*/
export const manifest: string = `{
   "format_version": 2,
   "header": {
     "name": "pack.name",
     "description": "pack.description",
     "uuid": "\${{uuid}}",
     "version": [1, 0, 0],
     "lock_template_options": true,
     "base_game_version": [1, 16, 200]
   },
   "modules": [
     {
       "type": "world_template",
       "uuid": "\${{uuid}}",
       "version": [1, 0, 0]
     }
   ],
   "metadata": { "authors": ["Example author"] }
}`;
