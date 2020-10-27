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
import { DataCollector } from '../DataCollector';
import { CollectorBase } from './CollectorBase';
import { DataReference } from './Reference';

export class Behaviorpack extends CollectorBase {

	public AnimationControllers: DataCollector<DataReference>;
	public Animations: DataCollector<DataReference>;
	public Blocks: DataCollector<DataReference>;
	public Entities: DataCollector<DataReference>;
	public Items : DataCollector<DataReference>;
	public LootTables : DataCollector<DataReference>;
	public Recipes : DataCollector<DataReference>;
	public SpawnRules : DataCollector<DataReference>;
	public Trading : DataCollector<DataReference>;

	constructor() {
		super();
		this.AnimationControllers = new DataCollector<DataReference>();
		this.Animations = new DataCollector<DataReference>();
		this.Blocks = new DataCollector<DataReference>();
		this.Entities = new DataCollector<DataReference>();
		this.Items = new DataCollector<DataReference>();
		this.LootTables = new DataCollector<DataReference>();
		this.Recipes = new DataCollector<DataReference>();
		this.SpawnRules = new DataCollector<DataReference>();
		this.Trading = new DataCollector<DataReference>();
	}
}