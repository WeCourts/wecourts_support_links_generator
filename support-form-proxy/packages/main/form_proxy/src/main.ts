import { generateIncorrectMatchDataTicketLink } from "./utils/incorrect_match_data";
import { generateWrongPlayerNameTicketLink } from "./utils/wrong_player_name";

export function main(args: {}): {} {
    let issueType: string = args['issueType'] || 'general'

    let link: string;
    switch (issueType) 
    {
        case 'incorrect_match_data':
            link = generateIncorrectMatchDataTicketLink(args);
            break;
        case 'wrong_player_name':
            link = generateWrongPlayerNameTicketLink(args);
            break;
        default:
            throw "Invalid issue type";
    }
    
    return { body: link };
}
