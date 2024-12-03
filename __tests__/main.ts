import { main } from '../support-form-proxy/packages/main/form_proxy/src/main';

describe('main function', () => {

    test('should return link for wrong_player_name issue type', () => {
        const args = {
            issueType: 'wrong_player_name',
            profileLink: 'profileLinkValue',
            fullName: 'fullNameValue',
        };
        const result = main(args);
        expect(result['body']).toContain('https://mysite.zendesk.com/hc/en-us/requests/new');
        expect(result['body']).toContain('tf_22355158811293=profileLinkValue');
        expect(result['body']).toContain('tf_22354923742493=fullNameValue');
    });
});


describe('fetching the serverless function remotely', () => {
    it('should return true', async () => {
        const args = {
            issueType: 'wrong_player_name',
            profileLink: 'profileLinkValue',
            fullName: 'fullNameValue',
        };
        const remoteFunctionUrl = 'https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-39aefd58-d7a1-41d1-9a52-64a4bbcf0ed1/main/form_proxy';

        const response = await fetch(remoteFunctionUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(args),
                    })
                    const contentType = response.headers.get('content-type');
                    let data;
                    if (contentType && contentType.includes('application/json')) {
                        data = await response.json();
                    } else {
                        data = await response.text();
                    }
                    
                    expect(data).toBe('');
                });
});
