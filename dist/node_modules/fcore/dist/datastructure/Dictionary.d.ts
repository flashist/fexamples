export declare class Dictionary<KeyType, ItemType> {
    protected map: any;
    constructor();
    getItem(key: KeyType): ItemType;
    addItem(key: KeyType, item: ItemType): void;
}
