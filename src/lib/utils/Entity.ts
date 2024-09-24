export default abstract class Entity {
    public id!: number;

    static tableName(): string {
        return this.constructor.name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
    }

    abstract serialize(): string;
}
