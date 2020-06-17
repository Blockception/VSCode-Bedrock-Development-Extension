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
/*import { GamemodeCompletionProvider } from "./GamemodeCompletion";
import { GameruleCompletionProvider } from "./GameruleCompletion";
import { XpCompletionProvider } from "./XpCompletion";
import { WeatherCompletionProvider } from "./weatherCompletion";
import { LocateCompletionProvider } from "./locateCompletion";
import { MeCompletionProvider } from "./meCompletion";
import { MobeventCompletionProvider } from "./mobeventCompletion";
import { KillCompletionProvider } from "./KillCompletion";
import { MsgCompletionProvider } from "./msgCompletion";
import { GiveCompletionProvider } from "./giveCompletion";
import { ParticleCompletionProvider } from "./particleCompletion";
import { ReloadCompletionProvider } from "./reloadCompletion";
import { PlaysoundCompletionProvider } from "./playsoundCompletion";
import { SayCompletionProvider } from "./sayCompletion";
import { ReplaceItemCompletionProvider } from "./replaceitemCompletion";
import { ScoreboardCompletionProvider } from "./scoreboardCompletion";
import { SetblockCompletionProvider } from "./setblockCompletion";
import { SetmaxplayersCompletionProvider } from "./setmaxplayersCompletion";
import { SetWorldSpawnCompletionProvider } from "./setworldspawnCompletion";
import { SpawnpointCompletionProvider } from "./spawnpointCompletion";
import { StopsoundCompletionProvider } from "./stopsoundCompletion";
import { SpreadPlayersCompletionProvider } from "./spreadplayersCompletion";
import { TagCompletionProvider } from "./tagCompletion";
import { SummonCompletionProvider } from "./summonCompletion";
import { TellCompletionProvider } from "./tellCompletion";
import { TellrawCompletionProvider } from "./tellrawCompletion";
import { TeleportCompletionProvider } from "./teleportCompletion";
import { WCompletionProvider } from "./wCompletion";
import { ToggledownfallCompletionProvider } from "./toggledownfallCompletion";
import { TitlerawCompletionProvider } from "./titlerawCompletion";
import { TitleCompletionProvider } from "./titleCompletion";
import { TimeCompletionProvider } from "./timeCompletion";
import { TickingAreaCompletionProvider } from "./tickingareaCompletion";
import { TestforCompletionProvider } from "./testforCompletion";
import { TestforBlockCompletionProvider } from "./testforblockCompletion";
import { TestforBlocksCompletionProvider } from "./testforblocksCompletion";*/
import { SelectorCompletionProvider } from "../types/SelectorCompletion";

//Add commands to the diagnoser
export function activate(context: CompletionItemManager) {
   var BooleanCompleter = context.BooleanCompletionProvider;
   var SelectorCompleter = new SelectorCompletionProvider();


   console.log('\tThe command completors (karen) want to talk to the manager');
   //Boolean stuff
   context.set(BooleanCompleter, ["alwaysday", "daylock"]);

   //Selector
   context.set(SelectorCompleter, ["deop", "op"]);

   context.set(new ClearCompletionProvider(), ["clear"]);
   context.set(new CloneCompletionProvider(), ["clone"]);

   context.set(new DifficultyCompletionProvider(), ["difficulty"]);
   context.set(new EffectCompletionProvider(), ["effect"]);
   context.set(new EnchantCompletionProvider(), ["effect"]);
   context.set(new ExecuteCompletionProvider(), ["execute"]);
   context.set(new FillCompletionProvider(), ["fill"]);
   context.set(new FunctionCommandCompletionProvider(), ["function"]);
   /*context.set(new GamemodeCompletionProvider(), [ "gamemode" ]);
   context.set(new GameruleCompletionProvider(), [ "gamerule" ]);
   context.set(new GiveCompletionProvider(), [ "give" ]);
   context.set(new LocateCompletionProvider(), [ "locate" ]);
   context.set(new MeCompletionProvider(), [ "me" ]);
   context.set(new MobeventCompletionProvider(), [ "mobevent" ]);
   context.set(new KillCompletionProvider(), [ "kill" ]);
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
   context.set(new TestforCompletionProvider(), [ "testfor" ]);
   context.set(new TestforBlockCompletionProvider(), [ "testforblock" ]);    
   context.set(new TestforBlocksCompletionProvider(), [ "testforblock" ]);    
   context.set(new WeatherCompletionProvider(), [ "weather" ]);
   context.set(new XpCompletionProvider(), [ "xp" ]);*/
}
