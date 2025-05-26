export function cleanObject(obj: any): any {
  if (Array.isArray(obj)) {
    return obj
      .map((item) => cleanObject(item))
      .filter((item) => item !== null && item !== undefined);
  } else if (obj !== null && typeof obj === 'object') {
    const cleanedObj = {};
    for (const key in obj) {
      const cleanedValue = cleanObject(obj[key]);
      if (
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        cleanedValue !== ''
      ) {
        cleanedObj[key] = cleanedValue;
      }
    }
    return Object.keys(cleanedObj).length > 0 ? cleanedObj : undefined;
  }
  return obj;
}
