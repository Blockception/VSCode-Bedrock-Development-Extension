import { FakeEntity } from '../../minecraft/types/FakeEntity/FakeEntity';
import { McFunction } from '../../minecraft/types/Functions/Function';
import { Block, Entity, Effect, Objective, Sound, Tickingarea } from '../../minecraft/types/include';
import { Item } from '../../minecraft/types/Item/Item';
import { Tag } from '../../minecraft/types/Tag/Tag';
import { DataCollector } from '../DataCollector';
import { CollectorBase } from './CollectorBase';

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