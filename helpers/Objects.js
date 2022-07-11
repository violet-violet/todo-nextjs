import { IsString } from "./ValueTests"

export const isObject = (obj) => typeof obj === "object" && obj !== null

export const hasOwnProperty = (obj, name) =>
    isObject(obj) && Object.prototype.hasOwnProperty.call(obj, name)

export const each = (obj, fn) => {
    for (let index in obj) {
        if (hasOwnProperty(obj, index)) fn(index, obj[index])
    }
}

export const filter = (obj, fn) => {
    let newObj = {}

    for (let index in obj) {
        if (hasOwnProperty(obj, index)) {
            if (fn(index, obj[index])) {
                newObj[index] = obj[index]
            }
        }
    }

    return newObj
}

export const mapToArray = (obj, fn) => {
    let _array = []

    for (let index in obj) {
        if (hasOwnProperty(obj, index)) {
            _array.push(fn(index, obj[index]))
        }
    }

    return _array
}

export const mapToObject = (obj, fn) => {
    let _obj = {}

    for (let index in obj) {
        if (hasOwnProperty(obj, index)) {
            const { key, value } = fn(index, obj[index])

            _obj[key] = value
        }
    }

    return _obj
}

export const deepFind = (obj, path) => {
    if (!obj || !isObject(obj) || !path || !IsString(path)) {
        return undefined
    }

    var paths = path.split("."),
        current = obj,
        i

    for (i = 0; i < paths.length; ++i) {
        if (current[paths[i]] == undefined) {
            return undefined
        } else {
            current = current[paths[i]]
        }
    }
    return current
}

export const getValue = (obj, path, def) => {
    const value = deepFind(obj, path)

    if (value === undefined) {
        return def
    }

    return value
}

export const getValueOptions = (obj, path, def) => {
    const value = getValue(obj, path, {})

    return {
        ...def,
        ...value,
    }
}

export const passProps = (obj, props = {}) => {
    Object.keys(props).forEach((name) => {
        obj[name] = props[name]
    })

    return obj
}
