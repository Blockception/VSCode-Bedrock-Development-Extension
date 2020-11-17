/*BSD 3-Clause License

Copyright (c) 2020, blockception Ltd
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

//The type of command parameter
export enum MCCommandParameterType {
  //Marks that the parameter is a block
  block,
  //Marks that the parameter is a boolean value
  boolean,
  //Marks that the parameter is the start of a command
  command,
  //Marks that the parameter is a coordinate
  coordinate,
  //Marks that the parameter is an effect
  effect,
  //Marks that the parameter is an entity
  entity,
  //Marks that the parameter is an event
  event,
  //Marks that the parameter is a function
  function,
  //Marks that the parameter is a float
  float,
  //Marks that the parameter is a gamemode
  gamemode,
  //Marks that the parameter is an integer
  integer,
  //Marks that the parameter is an item
  item,
  //Marks that the parameter is an json structure for items
  jsonItem,
  //Marks that the parameter is an json structure for text
  jsonRawText,
  //Marks that the parameter is a specified word
  keyword,
  //Marks that the parameter is a locate feature
  locateFeature,
  mirror,
  //Marks that the parameter is a scoreboard objective
  objective,
  //Marks that the parameter is a scoreboard operation
  operation,
  //Marks that the parameter is a particle
  particle,
  //Marks that the parameter is a replace mode
  replaceMode,
  rotation,
  //Marks that the parameter is a selector
  saveMode,
  //Marks that the parameter is a selector
  selector,
  //Marks that the parameter is a player selector
  slotType,
  //Marks that the parameter is a slot ID
  slotID,
  //Marks that the parameter is a sound
  sound,
  //Marks that the parameter is a string
  string,
  structureAnimationMode,
  //Marks that the parameter is a target
  target,
  //Marks that the parameter is a tag
  tag,
  //Marks that the parameter is a ticking area
  tickingarea,
  //Marks that the parameter is of an unknown type
  unknown,
  //Marks that the parameter is an xp value
  xp,
}
