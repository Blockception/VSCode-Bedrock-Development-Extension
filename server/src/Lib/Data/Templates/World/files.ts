import { ToolIdentification } from '../../../Constants';
import { Version } from '../../../Version';

/**The template for the world manifest*/
export function create_manifest(UUID1: string, UUID2: string): string {
  return manifest.replace(/%UUID1%/gi, UUID1).replace(/%UUID2%/gi, UUID2).replace(/%TOOL%/gi, ToolIdentification).replace(/%Version%/gi, Version)
}
const manifest: string = `{
   "format_version": 2,
   "header": {
     "name": "pack.name",
     "description": "pack.description",
     "uuid": "%UUID1%",
     "version": [1, 0, 0],
     "lock_template_options": true,
     "min_engine_version": [1, 18, 0]
   },
   "modules": [
     {
       "type": "world_template",
       "uuid": "%UUID2%",
       "version": [1, 0, 0]
     }
   ],
   "metadata": { 
     "authors": ["Example author"],
     "generated_with": {
       "%TOOL%": [
         "%Version%"
       ]
     }
   }
}`;
