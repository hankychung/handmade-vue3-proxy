import { ReactiveEffect } from '../effect'

type Deps = Set<ReactiveEffect>

const depsWeakMap: WeakMap<any, Map<any, Deps>> = new WeakMap()

const createDeps = (effects?: ReactiveEffect[]) => {
  return new Set(effects)
}

export { depsWeakMap, createDeps }
