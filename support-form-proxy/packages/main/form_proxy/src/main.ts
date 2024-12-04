export function main(args: {}): {} {

    console.log(args);

    let formId;
    
    
    if (args["form-name"] === "something-else") {
        return { body: baseUrl };
    }
    formId = formIds[args["form-name"]] ?? formIds["something-else"];
    let url = `${baseUrl}?ticket_form_id=${formId}`;
    return { body: url };

}

const baseUrl = "https://support.wecourts.com/hc/en-us/requests/new";
 const formIds = {
    "community-reporting-channel": "23374000465821", // not used
    "duplicate-profiles-in-wppr": "23374026229533",
    "tournament-results-not-on-wecourts-yet": "23444411211165", // not used
    "wrong-match-data": "23374037391133",
    "report-rating-issue": "23374008389533",
    "update-profile-information": "23374053996061",
    "someone-claimed-my-account": "23374031596189",
    "become-wppr-partner": "23374076480157", // not used
    "add-tournament-to-wecourts": "23374072567581", // not used
    "submit-tournament-results": "23374073574685", // not used
    "technical-issue": "23468162626461",
    "something-else": "23374085333277",
}
