/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import * as fs from "fs";
import { Process } from "./Process";
import { GetDocument } from "../code/include";
import {
  McFunctionIdentifier,
  McLanguageIdentifier,
  McOtherIdentifier,
} from "../Constants";

//Traverse the directory
export function TraveseDirectory(Dir: string): void {
  //console.log('exploring: ' + Dir);
  if (!Dir.endsWith("\\")) {
    Dir += "\\";
  }

  fs.readdir(Dir, (err, files) => {
    if (err) {
      console.log(Dir);
      console.log(err);
    } else {
      if (files)
        files.forEach((file) => {
          let Path = Dir + file;

          if (Path.endsWith(".mcfunction")) {
            PromiseParse(Path, McFunctionIdentifier);
          } else if (Path.endsWith(".lang")) {
            PromiseParse(Path, McLanguageIdentifier);
          } else if (Path.endsWith(".json")) {
            PromiseParse(Path, McOtherIdentifier);
          } else if (fs.lstatSync(Path).isDirectory()) {
            PromiseTraveseDirectory(Path);
          }
        });
    }
  });
}

export async function PromiseTraveseDirectory(path: string): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        TraveseDirectory(path);
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    }, 0);
  });
}

async function PromiseParse(
  path: string,
  languageID: string
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      try {
        Parse(path, languageID);
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
      }
    }, 0);
  });
}

function Parse(path: string, languageID: string): void {
  let Doc = GetDocument(path, undefined, languageID);
  Process(Doc);
}
