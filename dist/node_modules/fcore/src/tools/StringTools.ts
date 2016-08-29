
import {ObjectTools} from "./ObjectTools";

export class StringTools {

    public static substituteList(sourceText:string, ...args):string {
        return StringTools.substitute(sourceText, args);
    }

    public static substitute(sourceText:string, substituteParams:any = null):string {
        var resultStr:string = sourceText;

        if (ObjectTools.isSimpleType(substituteParams)) {
            substituteParams = [substituteParams];
        }

        if (substituteParams) {
            var tempArgStr:string;
            var foundPattern:string;
            var paramName:string;
            for (paramName in substituteParams) {
                tempArgStr = <string>substituteParams[paramName];

                foundPattern = "{" + paramName + "}";
                resultStr = StringTools.replaceText(resultStr, foundPattern, tempArgStr);
            }
        }

        return resultStr;
    }

    public static replaceText(sourceString:string, searchString:string, replaceString:string):string {
        // Split the string (if the search string has been found)
        var replacedString:string = sourceString.split(searchString).join(replaceString);

        return replacedString;
    }
}
