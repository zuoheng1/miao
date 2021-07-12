var zuoheng1 = function () {
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

  return {
    chunk: chunk,
    compact: compact,
    forEach: forEach
  }
}()