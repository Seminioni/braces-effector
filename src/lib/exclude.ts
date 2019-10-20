export default function exclude<T>(key: keyof T, obj: T) {
  const { [key]: deletedKey, ...rest } = obj;
  return rest;
}
