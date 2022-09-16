export const manifest: string = `{
   "format_version": 2,
   "header": {
     "name": "pack.name",
     "description": "pack.description",
     "uuid": "$\{\{uuid\}\}",
     "version": [1, 0, 0],
     "lock_template_options": true,
     "min_engine_version": [1, 18, 0]
   },
   "modules": [
     {
       "type": "world_template",
       "uuid": "$\{\{uuid\}\}",
       "version": [1, 0, 0]
     }
   ],
   "metadata": { 
     "authors": ["Example author"],
     "generated_with": {
       "$\{\{tool\}\}": [
         "$\{\{tool.version\}\}"
       ]
     }
   }
}`;
