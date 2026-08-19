// Guards the declared array type at runtime - an endpoint that answers with a
// null body or an error payload would otherwise break every caller that maps
// over the result.
export const asArray = <T>(data: T[]): T[] => (Array.isArray(data) ? data : []);
