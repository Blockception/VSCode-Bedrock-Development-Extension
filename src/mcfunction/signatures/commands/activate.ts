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

import { SignatureManager } from "../SignatureManager";
import { GeneralSignatureProvider } from "./GeneralSignatures";
import { CloneSignatureProvider } from "./CloneSignatures";
import { EffectSignatureProvider } from "./EffectSignatures";
import { ExecuteSignatureProvider } from "./ExecuteSignatures";
import { FillSignatureProvider } from "./FillSignatures";
import { GameruleSignatureProvider } from "./GameruleSignatures";
import { LocateSignatureProvider } from "./LocateSignatures";
import { MobeventSignatureProvider } from "./MobeventSignatures";
import { ReplaceItemSignatureProvider } from "./ReplaceItemSignatures";
import { ScoreboardSignatureProvider } from "./ScoreboardSignatures";

//Add commands to the signatures
export function activate(context: SignatureManager) {
   console.log('\tThe signature completors (karen) want to talk to the manager');

   //no branching commands
   context.set(new GeneralSignatureProvider(), [
      'alwaysday','clear','connect','daylock','deop',
      'difficulty','enchant','function','gamemode',
      'give','kill','me','msg','op','particle','playsound',
      'reload','say','setblock','setmaxplayers','setworldspawn',
      'spawnpoint','spreadplayers','stopsound','tell',
      'tellraw','testfor','testforblock','testforblocks',
      'toggledownfall','weather','w','xp']);

   //Commands with branches
   context.set(new CloneSignatureProvider(), ['clone']);
   context.set(new EffectSignatureProvider(), ['effect']);
   context.set(new ExecuteSignatureProvider(), ['execute']);
   context.set(new FillSignatureProvider(), ['fill']);
   context.set(new GameruleSignatureProvider(), ['gamerule']);
   context.set(new LocateSignatureProvider(), ['locate']);
   context.set(new MobeventSignatureProvider(), ['mobevent']);
   context.set(new ReplaceItemSignatureProvider(), ['replaceitem']);
   context.set(new ScoreboardSignatureProvider(), ['scoreboard']);
   context.set(new SummonSignatureProvider(), ['summon']);
}
