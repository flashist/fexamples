export class ArrayTools {
    protected static REMOVE_COUNT_ALL:number = -1;


    public static removeItem(list:any[], item:any, removeCount:number = ArrayTools.REMOVE_COUNT_ALL):void {
        if (removeCount == ArrayTools.REMOVE_COUNT_ALL) {
            removeCount = Number.MAX_VALUE;
        }

        var totalRemovedCount:number = 0;
        var itemIndex:number = list.indexOf(item);
        while (itemIndex != -1 && totalRemovedCount < removeCount) {
            list.splice(itemIndex, 1);

            itemIndex = list.indexOf(item, itemIndex);
            totalRemovedCount++;
        }
    }

    public static removeItems(list:any[], removeItems:any[]):void {
        var item:any;
        for (var itemIndex:number = 0; itemIndex < removeItems.length; itemIndex++) {
            item = removeItems[itemIndex];
            ArrayTools.removeItem(list, item);
        }
    }


    public static checkIfEqual(list1:any[], list2:any[]):boolean {
        var isEqual:boolean = true;

        // If there are the only 1 correct array
        if ((!list1 && list2) || (list1 && !list2)) {
            isEqual = false;

        } else if (list1 && list2) {
            if (list1.length != list2.length) {
                isEqual = false;

            } else {
                var itemsCount:number = list1.length;
                for (var itemIndex:number = 0; itemIndex < itemsCount; itemIndex++) {
                    if (list1[itemIndex] != list2[itemIndex]) {
                        isEqual = false;
                        break;
                    }
                }
            }
        }

        return isEqual
    }

    public static changeItemIndex(item:any, list:any[], newIndex:number):void {
        if (newIndex >= list.length) {
            return;
        }

        var oldIndex:number = list.indexOf(item);
        if (oldIndex == -1) {
            return;
        }
        if (oldIndex == newIndex) {
            return;
        }

        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    }
}
