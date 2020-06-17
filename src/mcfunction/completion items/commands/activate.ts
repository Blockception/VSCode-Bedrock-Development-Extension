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

import { CompletionItemManager } from "../CompletionItemManager";

//Import commands
import { ClearCompletionProvider } from "./ClearCompletion";
import { CloneCompletionProvider } from "./CloneCompletion";
import { DifficultyCompletionProvider } from "./DifficultyCompletion";
import { EffectCompletionProvider } from "./EffectCompletion";
import { EnchantCompletionProvider } from "./EnchantCompletion";
import { ExecuteCompletionProvider } from "./ExecuteCompletion";
import { FillCompletionProvider } from "./FillCompletion";
import { FunctionCommandCompletionProvider } from "./FunctionCompletion";
import { SelectorCompletionProvider } from "../types/SelectorCompletion";
import { GamemodeCompletionProvider } from "./GamemodeCompletion";
import { GiveCompletionProvider } from "./GiveCompletion";
import { XpCompletionProvider } from "./XpCompletion";
import { TestforBlocksCompletionProvider } from "./TestforblocksCompletion";

//Add commands to the diagnoser
export function activate(context: CompletionItemManager) {
   var BooleanCompleter = context.BooleanCompletionProvider;
   var SelectorCompleter = new SelectorCompletionProvider();


   console.log('\tThe command completors (karen) want to talk to the manager');
   //Boolean stuff
   context.set(BooleanCompleter, ["alwaysday", "daylock"]);

   //Selector
   context.set(SelectorCompleter, ["deop", "op", "kill", "testfor"]);

   context.set(new ClearCompletionProvider(), ["clear"]);
   context.set(new CloneCompletionProvider(), ["clone"]);
   context.set(new DifficultyCompletionProvider(), ["difficulty"]);
   context.set(new EffectCompletionProvider(), ["effect"]);
   context.set(new EnchantCompletionProvider(), ["effect"]);
   context.set(new ExecuteCompletionProvider(), ["execute"]);
   context.set(new FillCompletionProvider(), ["fill"]);
   context.set(new FunctionCommandCompletionProvider(), ["function"]);
   context.set(new GamemodeCompletionProvider(), [ "gamemode" ]);
   context.set(new GamemodeCompletionProvider(), [ "gamerule" ]);
   context.set(new GiveCompletionProvider(), [ "give" ]);
   /*context.set(new LocateCompletionProvider(), [ "locate" ]);
   context.set(new MeCompletionProvider(), [ "me" ]);
   context.set(new MobeventCompletionProvider(), [ "mobevent" ]);
   context.set(new MsgCompletionProvider(), [ "msg" ]);
   context.set(new ParticleCompletionProvider(), [ "particle" ]);
   context.set(new PlaysoundCompletionProvider(), [ "playsound" ]);
   context.set(new ReloadCompletionProvider(), [ "reload" ]);
   context.set(new ReplaceItemCompletionProvider(), [ "replaceitem" ]);
   context.set(new SayCompletionProvider(), [ "say" ]);
   context.set(new ScoreboardCompletionProvider(), [ "scoreboard" ]);
   context.set(new SetblockCompletionProvider(), [ "setblock" ]);
   context.set(new SetmaxplayersCompletionProvider(), [ "setmaxplayer" ]);
   context.set(new SetWorldSpawnCompletionProvider(), [ "setworldspawn" ]);
   context.set(new SpawnpointCompletionProvider(), [ "spawnpoint" ]);
   context.set(new StopsoundCompletionProvider(), [ "stopsound" ]);
   context.set(new SpreadPlayersCompletionProvider(), [ "spreadplayer" ]);
   context.set(new SummonCompletionProvider(), [ "summon" ]);
   context.set(new TagCompletionProvider(), [ "tag" ]);
   context.set(new TellCompletionProvider(), [ "tell" ]);
   context.set(new TellrawCompletionProvider(), [ "tellraw" ]);
   context.set(new TeleportCompletionProvider(), [ "teleport", "tp" ]);
   context.set(new WCompletionProvider(), [ "w" ]);
   context.set(new ToggledownfallCompletionProvider(), [ "toggledownfall" ]);
   context.set(new TitleCompletionProvider(), [ "title" ]);
   context.set(new TitlerawCompletionProvider(), [ "titleraw" ]);
   context.set(new TimeCompletionProvider(), [ "time" ]);
   context.set(new TickingAreaCompletionProvider(), [ "tickingarea" ]);
   context.set(new TestforBlockCompletionProvider(), [ "testforblock" ]); */   
   context.set(new TestforBlocksCompletionProvider(), [ "testforblock" ]);
   context.set(new ClearCompletionProvider(), [ "weather" ]);
   context.set(new XpCompletionProvider(), [ "xp" ]);
}
