// arr1 [1,3,4]  
// arr2 [2,5,7]
// => [1,2,3,4,5,7]

let arr1 = [1, 3, 4]
let arr2 = [2, 5, 7]

function sort(arr1, arr2) {
  let index1 = 0
  let index2 = 0
  let result = []
  while (index1 < arr1.length || index2 < arr2.length) {
    if (index1 >= arr1.length) {
      result.push(arr2[index2])
      index2++
    } else if (index2 >= arr2.length) {
      result.push(arr1[index1])
      index1++
    } else if (arr1[index1] < arr2[index2]) {
      result.push(arr1[index1])
      index1++
    } else {
      result.push(arr2[index2])
      index2++
    }
  }
  return result
}

console.log(sort(arr1, arr2))