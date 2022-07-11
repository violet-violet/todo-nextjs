export let forEach = (list, fn) => {
    for (let index = 0; index < list.length; index++)
        fn(list[index], index, list)
}

export let reduce = (list, fn, current = 0) => {
    for (let index = 0; index < list.length; index++) {
        current = fn(current, list[index], index, list)
    }

    return current
}

export const isArray = (obj) =>
    Object.prototype.toString.call(obj) === "[object Array]" && obj !== null

export const uniqueElements = (...arrays) => {
    const unique_list = []

    arrays.forEach((values) => {
        values.forEach((value) => {
            if (unique_list.indexOf(value) === -1) {
                unique_list.push(value)
            }
        })
    })

    return unique_list
}

export const commonElements = (...arrays) => {
    const unique_list = uniqueElements(...arrays)

    const commons = unique_list.filter(
        (unique) => !arrays.some((values) => values.indexOf(unique) === -1)
    )

    return commons.length ? commons : false
}
