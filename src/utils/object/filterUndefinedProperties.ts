export const filterUndefinedProperties = (obj: object) => Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined));
