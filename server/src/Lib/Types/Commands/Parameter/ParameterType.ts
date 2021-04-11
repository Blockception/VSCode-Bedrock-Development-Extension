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
  //An animation key
  animation,
  //Block identifiers
  block,
  //Block states
  blockStates,
  //Booleans
  boolean,
  //Camera Shake mode
  cameraShakeType,
  //Clone mode
  cloneMode,
  //Command start
  command,
  //Coordinate
  coordinate,
  //Difficulty mode
  difficulty,
  //Effect identifiers
  effect,
  //Entity identifiers
  entity,
  //Event in behaviours
  event,
  //The fill mode
  fillMode,
  //Functions paths
  function,
  //Float numbers
  float,
  //Game mode
  gamemode,
  //Integer numbers
  integer,
  //Item identifiers
  item,
  //Json item format
  jsonItem,
  //Json raw text
  jsonRawText,
  //Keyword
  keyword,
  //Locates feature mode
  locateFeature,
  //Mask mode
  maskMode,
  //Mirror mode
  mirror,
  //Music repeat mode
  musicRepeatMode,
  //Objective identifiers
  objective,
  //Old Block mode
  oldBlockMode,
  //Operation mode
  operation,
  //Particle iodentifier
  particle,
  //Replace mode
  replaceMode,
  //Ride Rules
  rideRules,
  //Ride Fill Mode
  ridefillMode,
  //Rotation Mode
  rotation,
  //Save Mode
  saveMode,
  //Selectors
  selector,
  //Slot type
  slotType,
  //Slot ID
  slotID,
  //Sound identifier
  sound,
  //Strings
  string,
  //Structre animation  mode
  structureAnimationMode,
  //Tag identifiers
  tag,
  //Teleport rules
  teleportRules,
  //Ticking area identifiers
  tickingarea,
  //Unknown
  unknown,
  //XP
  xp,
}
