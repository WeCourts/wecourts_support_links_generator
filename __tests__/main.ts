import { generateLink, main } from '../support-form-proxy/packages/main/form_proxy/src/main';

describe('generateLink', () => {
    it('should generate a link for the "technical-issue" form', () => {
        const args = {
            "form-name": "technical-issue",
            "wppr-id": "12345",
            "whatsapp-number": "9876543210",
            "platform": "ios",
            "version": "1.0.0"
        };
        const expectedLink = "https://support.wecourts.com/hc/en-us/requests/new?ticket_form_id=23468162626461&tf_22355158811293=https%3A%2F%2Fwecourts.com%2Fwppr%2F12345&tf_22429069854621=9876543210&tf_23468234820637=ios&tf_23468244354845=1.0.0";
        expect(generateLink(args)).toBe(expectedLink);
    });

    it('should generate a link for the "someone-claimed-my-account" form', () => {
        const args = {
            "form-name": "someone-claimed-my-account",
            "whatsapp-number": "9876543210",
            "wpprIdOfConflictedAccount": "54321"
        };
        const expectedLink = "https://support.wecourts.com/hc/en-us/requests/new?ticket_form_id=23374031596189&tf_22429069854621=9876543210&tf_22486940093597=54321";
        expect(generateLink(args)).toBe(expectedLink);
    });

    it('should generate a link for the "update-profile-information" form', () => {
        const args = {
            "form-name": "update-profile-information",
            "wppr-id": "12345",
            "whatsapp-number": "9876543210"
        };
        const expectedLink = "https://support.wecourts.com/hc/en-us/requests/new?ticket_form_id=23374053996061&tf_22355158811293=https%3A%2F%2Fwecourts.com%2Fwppr%2F12345&tf_22429069854621=9876543210";
        expect(generateLink(args)).toBe(expectedLink);
    });

    it('should return the base URL if the form name is "something-else"', () => {
        const args = {
            "form-name": "something-else"
        };
        const expectedLink = "https://support.wecourts.com/hc/en-us/requests/new";
        expect(generateLink(args)).toBe(expectedLink);
    });

    it('should return the base URL if the form name does not exist', () => {
        const args = {
            "form-name": "non-existent-form"
        };
        const expectedLink = "https://support.wecourts.com/hc/en-us/requests/new";
        expect(generateLink(args)).toBe(expectedLink);
    });
});

describe ('main function', () => {
    it('should return link for technical issue', () => {
        const args = {
            'form-name': 'technical-issue',
            'whatsapp-number': '9876543210',
            'wppr-id': '12345',
        };
        const expectedLink = 'https://support.wecourts.com/hc/en-us/requests/new?ticket_form_id=23468162626461&tf_22355158811293=https%3A%2F%2Fwecourts.com%2Fwppr%2F12345&tf_22429069854621=9876543210';
        const expectedResponse = { "body": expectedLink };
        expect(main(args)).toEqual(expectedResponse);
     
    });
});


// describe('fetching the serverless function remotely', () => {
//     it('should return true', async () => {
//         const args = {
//             issueType: 'wrong_player_name',
//             profileLink: 'profileLinkValue',
//             fullName: 'fullNameValue',
//         };
//         const remoteFunctionUrl = 'https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-39aefd58-d7a1-41d1-9a52-64a4bbcf0ed1/main/form_proxy';

//         const response = await fetch(remoteFunctionUrl, {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(args),
//                     })
//                     const contentType = response.headers.get('content-type');
//                     let data;
//                     if (contentType && contentType.includes('application/json')) {
//                         data = await response.json();
//                     } else {
//                         data = await response.text();
//                     }
                    
//                     expect(data).toBe('');
//                 });
// });
