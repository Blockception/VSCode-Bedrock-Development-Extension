import { DataCollector } from '../DataCollector';
import { CollectorBase } from './CollectorBase';
import { DataReference } from './Reference';

export class Resourcepack extends CollectorBase {

	public AnimationControllers: DataCollector<DataReference>;
	public Animations: DataCollector<DataReference>;
	public Entities: DataCollector<DataReference>;
	public Items: DataCollector<DataReference>;
	public Models: DataCollector<DataReference>;
	public Particles: DataCollector<DataReference>;
	public RenderControllers: DataCollector<DataReference>;

	constructor() {
		super();
		this.AnimationControllers = new DataCollector<DataReference>();
		this.Animations = new DataCollector<DataReference>();
		this.Entities = new DataCollector<DataReference>();
		this.Items = new DataCollector<DataReference>();
		this.Models = new DataCollector<DataReference>();
		this.Particles = new DataCollector<DataReference>();
		this.RenderControllers = new DataCollector<DataReference>();
	}
}