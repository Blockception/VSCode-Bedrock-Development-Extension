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
import { FakeEntity } from '../minecraft/types/FakeEntity/FakeEntity';
import { McFunction } from '../minecraft/types/Functions/Function';
import { Block, Entity, Effect, Objective, Sound, Tickingarea } from '../minecraft/types/include';
import { Item } from '../minecraft/types/Item/Item';
import { Tag } from '../minecraft/types/Tag/Tag';
import { IdentifiableDataCollection } from './DataCollector';

export class CollectedData {
   /**
    * A storage of all collected blocks
    */
   public Blocks: IdentifiableDataCollection<Block> = new IdentifiableDataCollection<Block>();

   /**
    * A storage of all collected entities
    */
   public Entities: IdentifiableDataCollection<Entity> = new IdentifiableDataCollection<Entity>();

   /**
    * A storage of all collected entities
    */
   public Functions: IdentifiableDataCollection<McFunction> = new IdentifiableDataCollection<McFunction>();

   /**
    * A storage of all collected entities
    */
   public Effects: IdentifiableDataCollection<Effect> = new IdentifiableDataCollection<Effect>();

   /**
    * A storage of all collected entities
    */
   public FakeEntities: IdentifiableDataCollection<FakeEntity> = new IdentifiableDataCollection<FakeEntity>();

   /**
    * A storage of all collected entities
    */
   public Items: IdentifiableDataCollection<Item> = new IdentifiableDataCollection<Item>();

   /**
    * A storage of all collected entities
    */
   public Objectives: IdentifiableDataCollection<Objective> = new IdentifiableDataCollection<Objective>();

   /**
    * A storage of all collected entities
    */
   public Sounds: IdentifiableDataCollection<Sound> = new IdentifiableDataCollection<Sound>();

   /**
    * A storage of all collected entities
    */
   public Tag: IdentifiableDataCollection<Tag> = new IdentifiableDataCollection<Tag>();

   /**
    * A storage of all collected entities
    */
   public TickingAreas: IdentifiableDataCollection<Tickingarea> = new IdentifiableDataCollection<Tickingarea>();
}