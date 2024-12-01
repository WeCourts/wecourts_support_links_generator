import { foo } from '../support-form-proxy/packages/main/form_proxy/src/main';



describe('foo', () => {
  it('testing serverless function logic locally', async () => {
    expect(foo()).toBe('bar');
  });
});


describe('fetching the serverless function remotely', () => {
    it('should return true', async () => {
        const args = { name: 'strangerz' };
        const response = await fetch('https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-39aefd58-d7a1-41d1-9a52-64a4bbcf0ed1/main/form_proxy', {
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
    
        expect(data).toBe('Hello strangerz!');
    });
});
