function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return (obj.map((item) => deepClone(item)) as unknown) as T;
    }

    const cloneObj: { [key: string]: never } = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloneObj[key] = deepClone((obj as { [key: string]: never })[key]);
        }
    }

    return cloneObj as T;
}

export {deepClone}