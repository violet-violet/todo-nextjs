export const IsSet = (value) =>
    value !== false && value !== "" && value !== undefined && value !== null
        ? true
        : false
export const IsNumber = (value) =>
    value + "" == "" || (!isNaN(parseFloat(value)) && isFinite(value))
export const IsEmail = (value) => value + "" == "" || value.indexOf("@") > -1
export const IsFunction = (value) =>
    IsSet(value) &&
    ["[object Function]", "[object AsyncFunction]"].includes(
        {}.toString.call(value)
    )
export const IsArray = (value) =>
    IsSet(value) && {}.toString.call(value) === "[object Array]"
export const IsObject = (value) =>
    IsSet(value) && {}.toString.call(value) === "[object Object]"
export const IsTrue = (value) => value === true
export const IsFalse = (value) => value === false
export const IsRegexp = (regexp) => (value) => regexp.test(`${value}`)
export const IsNotRegexp = (regexp) => (value) => !regexp.test(`${value}`)
export const IsString = (value) => typeof value === "string"
export const IsStringMaxLenght = (length) => (value) =>
    IsString(value) && value.length <= length
export const IsStringMinLenght = (length) => (value) =>
    IsString(value) && value.length >= length
export const IsStringMinMaxLenght = (min_length, max_length) => (value) =>
    IsString(value) && value.length >= min_length && value.length <= max_length
export const IsNotEmptyArray = (value) => IsArray(value) && value.length > 0
export const IsNotEmptyObject = (value) =>
    IsObject(value) && Object.keys(value).length > 0
export const IsNotEmpty = (value) =>
    IsSet(value) &&
    (!IsArray(value) || IsNotEmptyArray(value)) &&
    (!IsObject(value) || IsNotEmptyObject(value))
export const IsPhone = (value) => {
    const phoneFilterExp = /[^\+\d]/gim
    const phoneValidateExp = /^\+\d{7,}/gim

    value = value.replace(phoneFilterExp, "")

    if (value[0] == "8") {
        value = `+7${value.substring(1)}`
    } else if (value[0] == "7") {
        value = `+7${value.substring(1)}`
    }

    return phoneValidateExp.test(value)
}

export const EmailOrPhone = (value) => {
    if (IsEmail(value)) {
        return true
    } else if (IsPhone(value)) {
        return true
    }

    return false
}

export const IsYear = (value) => {
    if (IsNumber(value) && `${value}`.length === 4) {
        return true
    }

    return false
}

export const ArrayValue = (tests) => (value) => {
    return tests.every((test) => value.every((val) => test(val)))
}

export const ObjectValue = (keyName, tests) => (value) => {
    if (!IsObject(value)) {
        console.error(
            "[Tests][ObjectValue][Error: value is not an object]",
            value
        )

        return false
    }

    const val = value[keyName]

    return tests.every((test) => test(val))
}

export const Or = (tests) => (value) => {
    return tests.some((test) => test(value))
}

export const HasOwnProperty = (obj, val) =>
    Object.prototype.hasOwnProperty.call(obj, val)
