export function generateSupportTicketLink(baseURL: string, formId: string, fields: Record<string, string>): string {
    const params = new URLSearchParams({
        "ticket_form-id": formId,
        ...Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [`tf_${key}`, value])
        ),
    });

    return `${baseURL}?${params.toString()}`;
}
