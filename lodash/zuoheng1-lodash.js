var zuoheng1 = function () {

  //辅助函数
  function remove(array, f) {
    var flag = true
    for (var i = 0; i < array.length; i++) {

    }
  }
  function initial(array) {
    array.length = array.length - 1
    return array
  }
  //
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
  function filter(array, f) {
    var res = []
    if (typeof (f) === 'function') {
      for (var i = 0; i < array.length; i++) {
        if (f(array[i])) {
          res.push(array[i])
        }
      }
    } else if (typeof (f) === 'object') {
      for (var i = 0; i < array.length; i++) {
        var flag = 1
        for (let j in f) {
          if (!array[i][j] || array[i][j] != f[j]) {
            flag = 0
            break
          }
        }
        if (flag) {
          res.push(array[i])
        }
      }
    } else {
      for (var i = 0; i < array.length; i++) {
        if (array[i][f]) {
          res.push(array[i])
        }
      }
    }
    return res
  }
  function compact(array) {
    return array.filter(i => !!i == true)
  }

  function forEach(arr, f) {
    for (var i = 0; i < arr.length; i++) {
      f(arr[i], i, arr)
    }
    return arr
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
  function indexOf(array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] === value) {
        return i
      }
    }
  }
  function difference(array, ...value) {
    var obj = {},
      res = {}
    for (var i = 0; i < value.length; i++) {
      for (var j = 0; j < value[i].length; j++) {
        obj[value[i][j]] = i
      }
    }
    for (let i = 0; i < array.length; i++) {
      if (obj[i][j] == undefined) {
        res.push(array[i])
      }
    }
    return res
  }
  function reverse(array) {
    var left = 0,
      right = array.length - 1,
      temp
    while (left < right) {
      temp = array[left]
      array[left] = array[right]
      array[right] = temp
      left++
      right--
    }
    return array
  }
  function drop(arr, n = 1) {
    let len = arr.length
    if (len < n) {
      return []
    }
    for (let i = 0; i < n; i++) {
      arr.shift(arr[i])
    }
    return arr
  }


  return {
    chunk: chunk,
    compact: compact,
    forEach: forEach,
    zip: zip,
    uniq: uniq,
    map: map,
    reduce: reduce,
    indexOf: indexOf,
    reverse: reverse,
    initial: initial,
    filter: filter,
    difference: difference,
    drop: drop,
  }
}()