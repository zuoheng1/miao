var zuoheng1 = function () {
  function iterator(it) {
    if (typeof it === "string") {
      return val => val[it];
    }
    if (typeof it === "function") {
      return it;
    }
    if (Array.isArray(it)) {
      return obj => obj[it[0]] === it[1]
    }
    if (typeof it === "object") {
      return function (obj) {
        for (let key in it) {
          if (obj[key] !== it[key])
            return false;
        }
        return true;
      }
    }
  }
  function chunk(array, size) {
    var len = array.length,
      res = []
    if (len <= size) {
      return array
    }
    for (let i = 0; i < Math.ceil(len / size); i++) {
      res[i] = array.slice(size * i, size * (i + 1))
    }
    return res
  }

  function compact(array) {
    return array.filter(i => !!i == true)
  }

  function forEach(array, action) {
    for (var i = 0; i < array.length; i++) {
      action(array[i])
    }
  }

  function zip(...arr1) {//给数组脱马甲
    var result = [],
      arr = [].concat(...arr1),
      a = [],
      b = []
    for (var i = 0; i < arr.length; i++) {
      i % 2 == 0 ? a.push(arr[i]) : b.push(arr[i])
    }
    result.push(a)
    result.push(b)
    return result
  }

  function uniq(array) {
    var arr = []
    for (var k of array) {
      if (!arr.includes(k)) {
        arr.push(k)
      }
    }
    return arr
  }
  function map(arr, f) {
    var result = [],
      it = iterator(f)
    for (var k of arr) {
      result.push(it(k))
    }
    return result
  }
  function reduce(array, initial, f) {
    var result = initial
    for (var i = 0; i < array.length; i++) {
      result = f(result, array)
    }
    return result
  }
  return {
    chunk: chunk,
    compact: compact,
    forEach: forEach,
    zip: zip,
    uniq: uniq,
    map: map,
    reduce: reduce,
  }
}()