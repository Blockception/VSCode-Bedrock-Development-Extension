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
import { Block } from "../../types/general/Block/Block";
import { Effect } from "../../types/general/Effect/Effect";
import { Entity } from "../../types/general/Entity/Entity";
import { FakeEntity } from "../../types/general/FakeEntity/include";
import { McFunction } from "../../types/general/Functions/include";
import { Item } from "../../types/general/Item/Item";
import { Objective } from "../../types/general/Objectives/include";
import { Sound } from "../../types/general/Sound/Sound";
import { Tag } from "../../types/general/Tag/Tag";
import { Tickingarea } from "../../types/general/Tickingarea/include";
import { DataCollector } from "../DataCollector";
import { CollectorBase } from "./CollectorBase";

export class GeneralData extends CollectorBase {
  /**A storage of all collected blocks*/
  public Blocks: DataCollector<Block> = new DataCollector<Block>();

  /** A storage of all collected entities*/
  public Entities: DataCollector<Entity> = new DataCollector<Entity>();

  /** A storage of all collected entities*/
  public Functions: DataCollector<McFunction> = new DataCollector<McFunction>();

  /** A storage of all collected entities*/
  public Effects: DataCollector<Effect> = new DataCollector<Effect>();

  /** A storage of all collected entities*/
  public FakeEntities: DataCollector<FakeEntity> = new DataCollector<FakeEntity>();

  /** A storage of all collected entities*/
  public Items: DataCollector<Item> = new DataCollector<Item>();

  /** A storage of all collected entities*/
  public Objectives: DataCollector<Objective> = new DataCollector<Objective>();

  /** A storage of all collected entities*/
  public Sounds: DataCollector<Sound> = new DataCollector<Sound>();

  /** A storage of all collected entities*/
  public Tag: DataCollector<Tag> = new DataCollector<Tag>();

  /** A storage of all collected entities*/
  public TickingAreas: DataCollector<Tickingarea> = new DataCollector<Tickingarea>();
}
