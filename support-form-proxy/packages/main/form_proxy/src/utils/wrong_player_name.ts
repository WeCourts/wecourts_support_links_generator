import { baseURL, fieldIds, formId } from "./constants";
import { generateSupportTicketLink } from "./support_link_generator";

export function generateWrongPlayerNameTicketLink(args: {}): string {
    let issueType: string = 'wrong_player_name';
    let argsMap = { [fieldIds.reasonForContact]: issueType ,
            [fieldIds.profileLink] : args['profileLink'],
            [fieldIds.fullName] : args['fullName'],
    };

    return generateSupportTicketLink(baseURL, formId, argsMap);

}