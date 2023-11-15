import { createDeps, depsWeakMap } from '../deps'

class ReactiveEffect {
  constructor(private fn: () => any) {
    ReactiveEffect.activeEffect = this
  }

  run() {
    this.fn()
  }

  static activeEffect: null | ReactiveEffect = null

  static track(target: any, key: string | symbol) {
    if (!ReactiveEffect.activeEffect) return

    if (!depsWeakMap.has(target)) {
      depsWeakMap.set(target, new Map())
    }

    const depsDict = depsWeakMap.get(target)!

    if (!depsDict.has(key)) {
      depsDict.set(key, createDeps())
    }

    console.log('trigger', key)

    depsDict.get(key)?.add(ReactiveEffect.activeEffect)
  }

  static trigger(target: any, key: string | symbol) {
    const depsDict = depsWeakMap.get(target)

    if (!depsDict) return

    const deps = depsDict.get(key)

    if (!deps) return

    deps.forEach((effect) => effect.run())
  }
}

const effect = (fn: () => any) => {
  new ReactiveEffect(fn).run()

  ReactiveEffect.activeEffect = null
}

export { effect, ReactiveEffect }
