import React, { useState, useCallback } from "react"

const useEventListener = (
    eventName,
    handler,
    element = window,
    options = {}
) => {
    // Create a ref that stores handler
    const savedHandler = React.useRef(null)

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    React.useEffect(() => {
        savedHandler.current = handler
    }, [handler])

    React.useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            console.log(element, savedHandler)

            const isSupported = element && element.addEventListener
            console.log("isSupported", isSupported)

            if (!isSupported) return

            // Create event listener that calls handler function stored in ref
            const eventListener = (event) => savedHandler.current(event)

            // Add event listener
            element.addEventListener(eventName, eventListener, options)

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener)
            }
        },
        [eventName, element] // Re-run if eventName or element changes
    )
}

const usePrevious = (value, defValue) => {
    const ref = React.useRef(defValue)

    React.useEffect(() => {
        ref.current = value
    })

    return ref.current
}

const useTimeout = (cb, delay) => {
    const callbackRef = React.useRef(cb)

    // Remember the latest callback.
    React.useEffect(() => {
        callbackRef.current = cb
    }, [cb])

    // Set up the interval.
    React.useEffect(() => {
        const tick = () => {
            callbackRef.current()
        }

        if (delay !== null) {
            const id = setTimeout(tick, delay)

            return () => clearTimeout(id)
        }
    }, [delay])
}

const useStateRef = (def = null) => {
    const [value, _setValue] = React.useState(def)

    const refValue = React.useRef(def)

    const setValue = React.useCallback(
        (_v) => {
            const isFunc = _v && {}.toString.call(_v) === "[object Function]"

            if (isFunc) {
                _v = _v(refValue.current)

                refValue.current = _v

                _setValue(_v)
            } else {
                refValue.current = _v

                _setValue(_v)
            }
        },
        [_setValue]
    )

    return [value, setValue, refValue]
}

const useCallbackRef = (cb, depends = []) => {
    const callback = React.useCallback(cb, depends)

    const refCallback = React.useRef(callback)

    React.useEffect(() => {
        refCallback.current = callback
    }, [callback])

    return [callback, refCallback]
}

const useBoolean = (def_value) => {
    const [value, setValue] = useState(def_value)

    const setTrue = useCallback(() => {
        setValue(true)
    }, [setValue])

    const setFalse = useCallback(() => {
        setValue(false)
    }, [setValue])

    const toggle = useCallback(() => {
        setValue((_v) => !_v)
    }, [setValue])

    return {
        value,
        setValue,
        setTrue,
        setFalse,
        toggle,
    }
}

const useRefBy = (by) => {
    const refBy = React.useRef(by)

    React.useEffect(() => {
        refBy.current = by
    }, [by])

    return refBy
}

const useRefsBy = (byList) => {
    return Object.keys(byList).reduce((_refs, key) => {
        return {
            ..._refs,
            [key]: useRefBy(byList[key]),
        }
    }, {})
}

const r = (ref) => ref.current
const sr = (ref, value) => {
    ref.current = value
}

const noop = () => {}

const getLocalStorageValue = (name, def_value = null, json = false) => {
    const value = window.localStorage.getItem(name)

    if (value === undefined || value === null) {
        return def_value
    }

    return json ? JSON.parse(value) : value
}

const useLocalStorage = (name, def = null, json = false) => {
    const [value, _setValue] = React.useState(
        getLocalStorageValue(name, def, json)
    )

    const setValue = React.useCallback(
        (_value) => {
            console.log("[useLocalStorage][setValue]", _value, { json })

            window.localStorage.setItem(
                name,
                json ? JSON.stringify(_value) : _value
            )

            _setValue(_value)
        },
        [name, _setValue]
    )

    console.log("[useLocalStorage]", value)

    return [value, setValue]
}

export {
    r,
    sr,
    noop,
    useLocalStorage,
    useTimeout,
    useEventListener,
    usePrevious,
    useStateRef,
    useCallbackRef,
    useRefBy,
    useRefsBy,
    useBoolean,
}
