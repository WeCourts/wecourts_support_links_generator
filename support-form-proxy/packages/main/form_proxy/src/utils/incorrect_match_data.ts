import { baseURL, fieldIds, formId } from "./constants";
import { generateSupportTicketLink } from "./support_link_generator";


export function generateIncorrectMatchDataTicketLink(args : {}): string {
    throw "todo generateIncorrectMatchDataTicketLink";
    let issueType: string = 'incorrect_match_data';
    let argsMap = { [fieldIds.reasonForContact]: issueType ,
            [fieldIds.fullName] : args['exampleField'],
    };

    return generateSupportTicketLink(baseURL, formId, argsMap);

}