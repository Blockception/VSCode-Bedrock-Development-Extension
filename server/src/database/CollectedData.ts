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
import { FakeEntity } from "../minecraft/types/FakeEntity/FakeEntity";
import { McFunction } from "../minecraft/types/Functions/Function";
import { Block, Entity, Effect, Objective, Sound, Tickingarea } from "../minecraft/types/include";
import { Item } from "../minecraft/types/Item/Item";
import { Tag } from "../minecraft/types/Tag/Tag";
import { DataCollector } from "./DataCollector";

export class CollectedData {
  /**
   * A storage of all collected blocks
   */
  public Blocks: DataCollector<Block> = new DataCollector<Block>();

  /**
   * A storage of all collected entities
   */
  public Entities: DataCollector<Entity> = new DataCollector<Entity>();

  /**
   * A storage of all collected entities
   */
  public Functions: DataCollector<McFunction> = new DataCollector<McFunction>();

  /**
   * A storage of all collected entities
   */
  public Effects: DataCollector<Effect> = new DataCollector<Effect>();

  /**
   * A storage of all collected entities
   */
  public FakeEntities: DataCollector<FakeEntity> = new DataCollector<FakeEntity>();

  /**
   * A storage of all collected entities
   */
  public Items: DataCollector<Item> = new DataCollector<Item>();

  /**
   * A storage of all collected entities
   */
  public Objectives: DataCollector<Objective> = new DataCollector<Objective>();

  /**
   * A storage of all collected entities
   */
  public Sounds: DataCollector<Sound> = new DataCollector<Sound>();

  /**
   * A storage of all collected entities
   */
  public Tag: DataCollector<Tag> = new DataCollector<Tag>();

  /**
   * A storage of all collected entities
   */
  public TickingAreas: DataCollector<Tickingarea> = new DataCollector<Tickingarea>();

  public Clear(): void {
    this.Blocks.Clear();
    this.Entities.Clear();
    this.Functions.Clear();
    this.Effects.Clear();
    this.FakeEntities.Clear();
    this.Items.Clear();
    this.Objectives.Clear();
    this.Sounds.Clear();
    this.Tag.Clear();
    this.TickingAreas.Clear();
  }

  public DeleteFile(uri: string): void {
    this.Blocks.DeleteFile(uri);
    this.Entities.DeleteFile(uri);
    this.Functions.DeleteFile(uri);
    this.Effects.DeleteFile(uri);
    this.FakeEntities.DeleteFile(uri);
    this.Items.DeleteFile(uri);
    this.Objectives.DeleteFile(uri);
    this.Sounds.DeleteFile(uri);
    this.Tag.DeleteFile(uri);
    this.TickingAreas.DeleteFile(uri);
  }

  public DeleteFolder(uri: string): void {
    this.Blocks.DeleteFolder(uri);
    this.Entities.DeleteFolder(uri);
    this.Functions.DeleteFolder(uri);
    this.Effects.DeleteFolder(uri);
    this.FakeEntities.DeleteFolder(uri);
    this.Items.DeleteFolder(uri);
    this.Objectives.DeleteFolder(uri);
    this.Sounds.DeleteFolder(uri);
    this.Tag.DeleteFolder(uri);
    this.TickingAreas.DeleteFolder(uri);
  }
}
