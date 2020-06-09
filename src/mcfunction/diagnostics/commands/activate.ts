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

import { DiagnosticsManager } from "../DiagnosticsManager";

//Import commands
import { AlwaysDayDiagnosticProvider } from "./AlwaysdayDiagnostics";
import { ClearDiagnosticProvider } from "./ClearDiagnostics";
import { CloneDiagnosticProvider } from "./CloneDiagnostics";
import { ConnectDiagnosticProvider } from "./ConnectDiagnostics";
import { DaylockDiagnosticProvider } from "./DaylockDiagnostics";
import { DeopDiagnosticProvider } from "./DeopDiagnostics";
import { DifficultyDiagnosticProvider } from "./DifficultyDiagnostics";
import { EffectDiagnosticProvider } from "./EffectDiagnostics";
import { EnchantDiagnosticProvider } from "./EnchantDiagnostics";
import { ExecuteDiagnosticProvider } from "./ExecuteDiagnostic";
import { FillDiagnosticProvider } from "./FillDiagnostics";
import { FunctionCommandDiagnosticProvider } from "./FunctionDiagnostic";
import { GamemodeDiagnosticProvider } from "./GamemodeDiagnostics";
import { GameruleDiagnosticProvider } from "./GameruleDiagnostics";
import { XpDiagnosticProvider } from "./XpDiagnostics";
import { WeatherDiagnosticProvider } from "./weatherDiagnostics";
import { LocateDiagnosticProvider } from "./locateDiagnostics";
import { MeDiagnosticProvider } from "./meDiagnostics";
import { MobeventDiagnosticProvider } from "./mobeventDiagnostics";
import { KillDiagnosticProvider } from "./KillDiagnostics";
import { MsgDiagnosticProvider } from "./msgDiagnostics";
import { GiveDiagnosticProvider } from "./giveDiagnostics";
import { ParticleDiagnosticProvider } from "./particleDiagnostics";
import { ReloadDiagnosticProvider } from "./reloadDiagnostics";
import { PlaysoundDiagnosticProvider } from "./playsoundDiagnostics";
import { SayDiagnosticProvider } from "./sayDiagnostics";
import { ReplaceItemDiagnosticProvider } from "./replaceitemDiagnostics";
import { ScoreboardDiagnosticProvider } from "./scoreboardDiagnostics";
import { SetblockDiagnosticProvider } from "./setblockDiagnostics";
import { SetmaxplayersDiagnosticProvider } from "./setmaxplayersDiagnostics";
import { SetWorldSpawnDiagnosticProvider } from "./setworldspawnDiagnostics";
import { SpawnpointDiagnosticProvider } from "./spawnpointDiagnostics";
import { StopsoundDiagnosticProvider } from "./stopsoundDiagnostics";
import { SpreadPlayersDiagnosticProvider } from "./spreadplayersDiagnostics";
import { TagDiagnosticProvider } from "./tagDiagnostics";
import { SummonDiagnosticProvider } from "./summonDiagnostics";
import { TellDiagnosticProvider } from "./tellDiagnostics";
import { TellrawDiagnosticProvider } from "./tellrawDiagnostics";
import { TeleportDiagnosticProvider } from "./teleportDiagnostics";
import { WDiagnosticProvider } from "./wDiagnostics";
import { ToggledownfallDiagnosticProvider } from "./toggledownfallDiagnostics";
import { TitlerawDiagnosticProvider } from "./titlerawDiagnostics";
import { TitleDiagnosticProvider } from "./titleDiagnostics";
import { TimeDiagnosticProvider } from "./timeDiagnostics";
import { TickingAreaDiagnosticProvider } from "./tickingareaDiagnostics";
import { TestforDiagnosticProvider } from "./testforDiagnostics";
import { TestforBlockDiagnosticProvider } from "./testforblockDiagnostics";
import { TestforBlocksDiagnosticProvider } from "./testforblocksDiagnostics";

//Add commands to the diagnoser
export function activate(context: DiagnosticsManager) {
    console.log('\tThe command diagnosers (karen) want to talk to the manager');
    context.set(new AlwaysDayDiagnosticProvider(), ["alwaysday"]);
    context.set(new ClearDiagnosticProvider(), [ "clear" ]);
    context.set(new CloneDiagnosticProvider(), ["clone"]);
    context.set(new ConnectDiagnosticProvider(), ["connect"]);
    context.set(new DaylockDiagnosticProvider(), [ "daylock" ]);
    context.set(new DeopDiagnosticProvider(), [ "deop" ]);
    context.set(new DifficultyDiagnosticProvider(), ["difficulty"]);
    context.set(new EffectDiagnosticProvider(), ["effect"]);
    context.set(new EnchantDiagnosticProvider(), ["effect"]);
    context.set(new ExecuteDiagnosticProvider(), ["execute"]);
    context.set(new FillDiagnosticProvider(), ["fill"]);
    context.set(new FunctionCommandDiagnosticProvider(), [ "function" ]);
    context.set(new GamemodeDiagnosticProvider(), [ "gamemode" ]);
    context.set(new GameruleDiagnosticProvider(), [ "gamerule" ]);
    context.set(new GiveDiagnosticProvider(), [ "give" ]);
    context.set(new LocateDiagnosticProvider(), [ "locate" ]);
    context.set(new MeDiagnosticProvider(), [ "me" ]);
    context.set(new MobeventDiagnosticProvider(), [ "mobevent" ]);
    context.set(new KillDiagnosticProvider(), [ "kill" ]);
    context.set(new MsgDiagnosticProvider(), [ "msg" ]);
    context.set(new ParticleDiagnosticProvider(), [ "particle" ]);
    context.set(new PlaysoundDiagnosticProvider(), [ "playsound" ]);
    context.set(new ReloadDiagnosticProvider(), [ "reload" ]);
    context.set(new ReplaceItemDiagnosticProvider(), [ "replaceitem" ]);
    context.set(new SayDiagnosticProvider(), [ "say" ]);
    context.set(new ScoreboardDiagnosticProvider(), [ "scoreboard" ]);
    context.set(new SetblockDiagnosticProvider(), [ "setblock" ]);
    context.set(new SetmaxplayersDiagnosticProvider(), [ "setmaxplayers" ]);
    context.set(new SetWorldSpawnDiagnosticProvider(), [ "setworldspawn" ]);
    context.set(new SpawnpointDiagnosticProvider(), [ "spawnpoint" ]);
    context.set(new StopsoundDiagnosticProvider(), [ "stopsound" ]);
    context.set(new SpreadPlayersDiagnosticProvider(), [ "spreadplayers" ]);
    context.set(new SummonDiagnosticProvider(), [ "summon" ]);
    context.set(new TagDiagnosticProvider(), [ "tag" ]);
    context.set(new TellDiagnosticProvider(), [ "tell" ]);
    context.set(new TellrawDiagnosticProvider(), [ "tellraw" ]);
    context.set(new TeleportDiagnosticProvider(), [ "teleport", "tp" ]);
    context.set(new WDiagnosticProvider(), [ "w" ]);
    context.set(new ToggledownfallDiagnosticProvider(), [ "toggledownfall" ]);
    context.set(new TitleDiagnosticProvider(), [ "title" ]);
    context.set(new TitlerawDiagnosticProvider(), [ "titleraw" ]);
    context.set(new TimeDiagnosticProvider(), [ "time" ]);
    context.set(new TickingAreaDiagnosticProvider(), [ "tickingarea" ]);
    context.set(new TestforDiagnosticProvider(), [ "testfor" ]);
    context.set(new TestforBlockDiagnosticProvider(), [ "testforblock" ]);    
    context.set(new TestforBlocksDiagnosticProvider(), [ "testforblocks" ]);    
    context.set(new WeatherDiagnosticProvider(), [ "weather" ]);
    context.set(new XpDiagnosticProvider(), [ "xp" ]);
}
