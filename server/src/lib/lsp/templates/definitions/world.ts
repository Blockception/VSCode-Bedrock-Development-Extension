export const manifest: string = `{
   "format_version": 2,
   "header": {
     "name": "pack.name",
     "description": "pack.description",
     "uuid": "$\{\{uuid\}\}",
     "version": [1, 0, 0],
     "lock_template_options": true,
     "min_engine_version": [1, 19, 50]
   },
   "modules": [
     {
       "type": "world_template",
       "uuid": "$\{\{uuid\}\}",
       "version": [1, 0, 0]
     }
   ],
   "metadata": { 
      "authors": [ "$\{\{project.attributes:author\}\}" ],
      "generated_with": {
        "$\{\{tool\}\}": [
          "$\{\{tool.version\}\}"
        ]
      }
   }
}`;
