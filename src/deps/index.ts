const depsWeakMap: WeakMap<any, Map<any, (() => void)[]>> = new WeakMap()

export { depsWeakMap }
