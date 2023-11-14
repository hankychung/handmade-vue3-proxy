import { depsWeakMap } from '../deps'

class ReactiveEffect {
  constructor(private fn: () => any) {
    ReactiveEffect.activeEffect = fn
  }

  run() {
    this.fn()
  }

  static activeEffect: null | (() => any) = null

  static track(target: any, key: string | symbol) {
    if (!ReactiveEffect.activeEffect) return

    if (!depsWeakMap.has(target)) {
      depsWeakMap.set(target, new Map())
    }

    const depsDict = depsWeakMap.get(target)!

    if (!depsDict.has(key)) {
      depsDict.set(key, [])
    }

    console.log('trigger', key)

    depsDict.get(key)?.push(ReactiveEffect.activeEffect)
  }

  static trigger(target: any, key: string | symbol) {
    const depsDict = depsWeakMap.get(target)

    if (!depsDict) return

    const deps = depsDict.get(key)

    if (!deps || !deps.length) return

    deps.forEach((fn) => fn())
  }
}

const effect = (fn: () => any) => {
  new ReactiveEffect(fn).run()

  ReactiveEffect.activeEffect = null
}

export { effect, ReactiveEffect }
