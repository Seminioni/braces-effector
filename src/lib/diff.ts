export default function <T> (arr1: T[], arr2: T[]) {
  const newArr: T[] = [];

  arr1.forEach((val) => {
    if (arr2.indexOf(val) < 0) newArr.push(val);
  });

  arr2.forEach((val) => {
    if (arr1.indexOf(val) < 0) newArr.push(val);
  });

  return newArr;
}
