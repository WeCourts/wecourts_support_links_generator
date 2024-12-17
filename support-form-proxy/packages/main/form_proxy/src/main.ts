const baseUrl = "https://support.wecourts.com/hc/en-us/requests/new";

export function main(args: {}): {} {

    console.log(args);

    let result = generateLink(args);
    
    return { body: result };

}


function generateSupportTicketLink(baseURL: string, formId: string, fields: Record<string, string>): string {
    const params = new URLSearchParams({
        "ticket_form_id": formId,
        ...Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [`tf_${key}`, value])
        ),
    });

    return `${baseURL}?${params.toString()}`;
}

class Form {
    id : string;
    serializedName : string;
    fields : FormField[];
    
    constructor(id: string, serializedName : string, fields: FormField[]) {
        this.id = id;
        this.serializedName = serializedName;
        this.fields = fields;
    }
    
    extractValues(args : {}): Record<string, string> {
        let result = {};
        for (let field of this.fields) {
            if (field.extractValue(args) !== undefined)
            {
                result[field.id] = field.extractValue(args);
            }
        }
        return result;
    }
}
class FormField {
 id : string;
 zendeskName : string;
 protected mobileClientName : string;

 constructor(id: string, mobileClientName: string, zendeskName: string) {
        this.id = id;
        this.mobileClientName = mobileClientName;
        this.zendeskName = zendeskName;
    }

    extractValue(args : {}): string {
        return args[this.mobileClientName];
    }
}

 class DropDownFormField extends FormField {
 options : Record<string, string>;

 constructor (id: string, mobileClientName: string, zendeskName: string, options: Record<string, string>) {
        super(id, mobileClientName, zendeskName);
        this.options = options;
    }

    extractValue(args : {}): string {
        let value = args[this.mobileClientName];
        return this.options[value];
    }
}

class WpprLinkFormField extends FormField {
    constructor() {
        super("22355158811293", "wppr-id" ,"wppr-link");}
    
    extractValue(args : {}): string {
        let value = args[this.mobileClientName];
        return "https://wecourts.com/wppr/" + value;
    }
}

const platformField = new DropDownFormField("23468234820637", "platform", "platform", {
    "ios": "ios",
    "android": "android",
    "web": "web",
}); 

const wpprLinkField = new WpprLinkFormField();

const whatsAppNumberField = new FormField("22429069854621", "whatsapp-number", "whats-app-number");

const appVersionField = new FormField("23468244354845", "version", "app-version");
const wpprLinkAlreadyClaimed = new FormField("22486940093597", "wpprIdOfConflictedAccount", "wppr-link-already-claimed");

const updateProfileInformationForm = new Form("23374053996061", "update-profile-information", [wpprLinkField, whatsAppNumberField,]);
const someoneClaimedMyAccountForm = new Form("23374031596189", "someone-claimed-my-account", [whatsAppNumberField, wpprLinkAlreadyClaimed,]);
const technicalIssueForm = new Form("23468162626461", "technical-issue" ,[wpprLinkField, whatsAppNumberField, platformField, appVersionField,]);

const forms = [technicalIssueForm, someoneClaimedMyAccountForm, updateProfileInformationForm,];

const formMap = Object.fromEntries(forms.map(form => [form.serializedName, form]));

export function generateLink(args: {}): string {
    
    let result = baseUrl;
    
    let isSomethingElse = args["form-name"] === "something-else";
    let exist = formMap[args["form-name"]];
    
    if (exist && !isSomethingElse) {

        let form = exist;
        let fields = form.extractValues(args);
        result = generateSupportTicketLink(baseUrl, form.id, fields);
    }

    return result ;
}