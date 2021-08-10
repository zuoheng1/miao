var zuoheng1 = function() {
    //辅助函数
    function iteratee(predicate) {
        if (getType(predicate) === 'function') {
            return predicate
        }
        if (getType(predicate) === 'string') {
            return property(predicate)
        }
        if (getType(predicate) === 'array') {
            return matchesProperty(...predicate)
        }
        if (getType(predicate) === 'object') {
            return matches(predicate)
        }
    }
    //  iteratee ？

    // 传 string 是直接返回 path 上的值 <= > _.property

    // 传 array 是把 path 上的值做比较 <= > _.matchesProperty

    // 传 object 是去 match 匹配看看你给的 key 和 value 都有没有， 可以比你给的多， 但是不能少 <= > _.matches

    // 传function 你懂的 

    function property(path) {
        return function(obj) {
            return get(obj, path)
        }
    }

    function get(object, path) {
        if (isArray(path) || isPath(path)) {
            if (isString(path)) {
                path = toPath(path)
            }
            for (let i = path[0]; i < path.length; i++) {
                if (object[i] == undefined) {
                    return undefined
                }
                object = object[i]
            }
            return object
        } else {
            return object[path]
        }
    }

    function isPath(value) {
        return includes(value, '.') || includes(value, '[') || includes(value, ']')
    }

    function toPath(value) {
        let reg = /\w+/g
        value = value.match(reg)
        return value
    }

    function isMatch(object, source) {
        if (isObject(source)) {
            for (const key in source) {
                if (isObject(object[key])) {
                    if (!isEqual(object[key], source[key])) {
                        return false;
                    };
                } else if (object[key] != source[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function matches(source) {
        return function(obj) {
            return isMatch(obj, source);
        }
    }

    function matchesProperty(path, srcValue) {
        return function(obj) {
            return get(obj, path) === srcValue;
        }
    }

    function DeepComparsion(obj1, obj2) {
        let res1 = [],
            res2 = []
        for (let k in obj1) {
            res1.push(k)
        }
        for (let k in obj2) {
            res2.push(k)
        }
        if (res1.length != res2.length) {
            return false
        }
        for (k in obj1) {
            if (typeof obj1[k] !== 'object' && typeof obj1[k] != 'object') {
                if (obj1[k] != obj2[k]) {
                    return false
                } else {
                    if (!DeepComparsion(obj1[k], obj2[k])) {
                        return false
                    }
                }
            }
        }
        return true
    }

    function filter(collection, callback) {
        callback = iteratee(callback)
        let res = []
        for (let item of collection) {
            res.push(callback(collection[item], item, collection))
        }
        return res
    }


    function getType(obj) {
        if (typeof obj === 'object') {
            return Object.prototype.toString.call(obj).match(/\b[A-Z][a-z]+\b/)[0].toLowerCase()
        }
        return typeof obj
    }

    function getType1(obj) {
        return Object.prototype.toString.call(obj)
    }



    function size(value) {
        if (getType1(value) === '[object,Object]') {
            let count = 0
            for (let item of value) {
                count++
            }
            return count
        }
        return value.length
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

    function map(collection, f) {
        let it = iterator(f)
        let res = []
        if (getType(collection) == 'object') {
            for (let key in collection) {
                res.push(it(collection[key], key, collection))
            }
        } else {
            collection.forEach((item, idx, arr) => res.push(it(item, idx, arr)))
        }
        return res
    }

    function indexOf(array, value, fromIndex = 0) {
        for (var i = fromIndex; i < array.length; i++) {
            if (array[i] === value) {
                return i
            }
        }
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
    //删除后n个元素
    function dropRight(arr, n = 1) {
        let res = []
        for (let i = 0; i < arr.length - n; i++) {
            res.push(arr[i])
        }
        arr = [...res]
        return arr
    }
    //删除
    function some(col, f) {
        var it = iterator(f)
        for (let key in col) {
            if (it(col[key])) return true;
        }
        return false;
    }

    function isNull(val) {
        if (val === null) {
            return true
        }
        return false
    }

    function toArray(value) {
        let res = [],
            type = typeof value
        if (type === 'object') {
            for (let k in value) {
                res.push(value[k])
            }
        } else if (type === 'string') {
            for (let i = 0; i < value.length; i++) {
                res.push(value[i])
            }
        }
        return res
    }

    function flattenDeep(array) {
        let res = []
        for (let i = 0; i < array.length - 1; i++) {
            if (isArray(array[i])) {
                res.push(...flattenDeep(array[i]))
            } else {
                res.push(array[i])
            }
        }
        return res
    }
    //判断类
    function isArguments(value) {
        if (Array.isArray(value)) {
            return false
        }
        return typeof value === 'object' && 'length' in value
    }

    function isArray(value) {
        return value.__proto__ === Array.prototype
    }

    function isArrayBuffer(value) {
        return value.__proto__ === ArrayBuffer.prototype
    }

    function isArrayLike(value) {
        if (typeof value === 'function') {
            return false
        }
        return value['length'] >= 0 && value['length'] < Number.MAX_SAFE_INTEGER
    }

    function isArrayLikeObject(value) {
        return typeof value === 'object' && isArrayLike(value)
    }

    function isBoolean(value) {
        return getType1(value) === '[object Boolean]'
    }

    function isDate(value) {
        return getType1(value) === '[object Date]'
    }

    function isElement() {
        let reg = /^\[object HTML\w+\]$]/
        return reg.test(Object.prototype.toString.call(value))
    }

    function isEmpty(value) {
        if (isArray(value)) {
            return value.length === 0
        }
        if (typeof value === 'object') {
            let res = []
            for (let k of value) {
                res.push(k)
            }
            if (res.length > 0) {
                return false
            }
        }
        return true
    }

    function isEqual(value1, value2) {
        if (value1 === value2) {
            return true
        } else if (Array.isArray(value1) && Array.isArray(value2)) {
            for (let item1 in value1) {
                let flag = true
                for (let item2 in value2) {
                    if (item1 === item2 || (typeof item1 === 'object' && DeepComparsion(item1, item2))) {
                        flag = false
                    }
                }
            }
            if (flag) {
                return false
            }
        } else if (!Array.isArray(value1) && !Array.isArray(value2) && typeof value1 == 'object') {
            return DeepComparsion(value1, value2)
        } else {
            return Number.isNaN(value1) && Number.isNaN(value2)
        }
    }

    function isError(value) {
        return typeof value === 'object' && value.constructor == Error
    }

    function isFinite(value) {
        return typeof value === 'object' && value != Infinity && value != -Infinity
    }

    function isFunction(value) {
        return typeof value === 'function'
    }

    function isInteger() {
        return isFinite(value) && Math.floor(value) === value
    }

    function isLength(value) {
        return isInteger(value) && value >= 0
    }

    function isMap(value) {
        return getType1(value) === '[object Map]'
    }

    function isMatch(object, source) {
        if (isObject(source)) {
            for (const key in source) {
                if (isObject(object[key])) {
                    if (!isEqual(object[key], source[key])) {
                        return false;
                    };
                } else if (object[key] != source[key]) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }


    function isMatchWith() {

    }

    function isNaN(value) {
        if (typeof value === 'object') {
            value = value.valueOf()
        }
        return value !== value
    }

    function isNil(value) {
        return value == undefined
    }

    function isNull(value) {
        return getType1(value) === '[object Null]'
    }

    function isNumber(value) {
        return getType1(value) === '[object Number]'
    }

    function isObject(value) {
        return (value != null && typeof value === 'object') || typeof value === 'function'
    }

    function isObjectLike(value) {
        return value !== null && typeof value === 'object'
    }

    function isPlainObject(value) {
        let proto = Object.getPrototypeOf(value)
        return proto === Object.prototype || proto == null
    }

    function isRegExp(value) {
        return getType1(value) === '[object RegExp]'
    }

    function isSafeInteger(value) {
        return isNumber(value) && Math.abs(value) < Number.MAX_SAFE_INTEGER && Math.abs(value) > Number.MIN_VALUE
    }

    function isSet(value) {
        return getType1(value) == '[object Set]'
    }

    function isString(value) {
        return getType(value) == 'string'
    }

    function isSymbol(value) {
        return getType(value) == 'symbol'
    }

    function isTypedArray(value) {
        return getType1(value) == '[object Uint8Array]'
    }

    function isUndefined(value) {
        return getType(value) == 'undefined'
    }

    function isWeakMap(value) {
        return getType1 == '[object WeakMap]'
    }

    function isWeakSet(value) {
        return getType1(value) == '[object WeakSet]'
    }
    //lodash开始

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

    function compact(ary) {
        let res = [];
        for (let i = 0; i < ary.length; i++) {
            if (ary[i]) {
                res.push(ary[i])
            }
        }
        return res;
    }

    function concat(array, ...args) {
        let res = [...array]
        for (let i = 0; i < args.length; i++) {
            if (Array.isArray(args[i])) {
                res.push(...args[i])
            } else {
                res.push(args[i])
            }
        }
        return res
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

    function differenceBy(array, args) {
        let res = [],
            predicate = args[args.length - 1]
        args = flattenDeep(args)
        if (typeof predicate === 'function') {
            predicate = args.pop()
            for (let i = 0; i < args.length - 1; i++) {
                args[i] = predicate(arg[i])
            }
        }
    }

    function differenceWith(array, ...args) {
        let group = [].concat(...args),
            comparator = args.pop()
        return filter(array, function(value) {
            for (let i = 0; i < group.length; i++) {
                if (comparator(value, group[i])) {
                    return false
                }
            }
            return true
        })
    }

    function zip(...arr1) { //给数组脱马甲
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

    function parseJson(json) {
        var i = 0,
            str = json
        return parseValue()



        function parseValue() {
            if (str[i] === '{') {
                return parseObject()
            } else if (str[i] === '[') {
                return parseArray()
            } else if (str[i] === 'n') {
                return parseNull()
            } else if (str[i] === '"') {
                return parseString()
            } else if (str[i] === 't') {
                return parseTrue()
            } else if (str[i] === 'f') {
                return parseFalse()
            } else {
                return parseNumber()
            }
        }

        //先实现解析字符串
        function parseString() {
            var result = ''
            i++ //跳过当前引号
            while (str[i] != '"') {
                result += str[i++]
            }
            i++
            return result
        }
        //直接往后读出4个字符，若不是null，直接报错
        function parseNull() {
            var content = str.substr(i, 4)
            if (content === 'null') {
                i += 4
                return null
            } else {
                throw new Error('Unexpected char at' + i)
            }
        }
        //同上，往后读5个字符
        function parseFalse() {
            var content = str.substr(i, 5)
            if (content === 'false') {
                i += 5
                return false
            } else {
                throw new Error('Unexpected char at' + i)
            }
        }
        //同上
        function parseTrue() {
            var content = str.substr(i, 4)
            if (content === 'true') {
                i += 4
                return true
            } else {
                throw new Error('Unexpected char at' + i)
            }
        }
        //注意类数组情况
        function parseArray() {
            i++
            var result = []
            while (str[i] !== ']') {
                result.push(parseValue())
                if (str[i] === ',') {
                    i++ //跳过逗号
                }
                //解析的最后一个值没遇到逗号，解析完成
            }
            i++
            return result
        }
        //
        function parseObject() {
            i++ //跳过{
            var result = {}
            while (str[i] !== '}') {
                var key = parseString()
                i++ //跳过
                var value = parseValue()
                result[key] = value //构造键值对
                if (str[i] === ',') {
                    i++
                }
            }
            i++
            return result
        }
        //f
        function parseNumber() {
            var result = ''
            while (isNumberChar(str[i])) {
                result += str[i]
                i++
            }
            return Number(result)
        }
        //辅助函数判断val是否为JSON中的数值符号
        function isNumberChar(val) {
            var chars = {
                '-': true,
                '+': true,
                'E': true,
                'e': true,
                '.': true
            }
            if (chars[val]) {
                return true
            }
            if (val >= '0' && val <= '9') {
                return true
            }
            return false
        }
    }

    return {
        chunk: chunk,
        compact: compact,
        concat: concat,
        difference: difference,
        differenceWith: differenceWith,
        differenceBy: differenceBy,

        zip: zip,
        uniq: uniq,
        map: map,

        indexOf: indexOf,
        reverse: reverse,

        filter: filter,
        drop: drop,
        toArray: toArray,




        isArguments: isArguments,
        isArray: isArray,
        isArrayBuffer: isArrayBuffer,
        isArrayLike: isArrayLike,
        isArrayLikeObject: isArrayLikeObject,
        isBoolean: isBoolean,
        isElement: isElement,
        isDate: isDate,
        isEmpty: isEmpty,
        isError: isError,
        isFinite: isFinite,
        isFunction: isFunction,
        isInteger: isInteger,
        isLength: isLength,
        isMap: isMap,
        isNaN: isNaN,
        isNil: isNil,
        isNull: isNull,
        isNumber: isNumber,
        isObject: isObject,
        isObjectLike: isObjectLike,
        isPlainObject: isPlainObject,
        isSafeInteger: isSafeInteger,
        isSet: isSet,
        isString: isString,
        isSymbol: isSymbol,
        isTypedArray: isTypedArray,
        isUndefined: isUndefined,
        isWeakMap: isWeakMap,
        isWeakSet: isWeakSet,
        toPath: toPath,
        property: property,
        isMatch: isMatch,
        matches: matches,
        size: size,
        isEqual: isEqual,
        iteratee: iteratee,
        matchesProperty: matchesProperty,
        indexOf: indexOf,
        get: get,
        isPath: isPath,
        map: map,
        filter: filter,
        parseJson: parseJson,
    }
}()