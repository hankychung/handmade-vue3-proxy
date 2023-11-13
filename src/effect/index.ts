class ReactiveEffect {
  constructor(private fn: () => any) {}

  run() {
    this.fn()
  }

  static activeEffect: null | (() => any) = null
}

const effect = (fn: () => any) => {
  const effectIns = new ReactiveEffect(fn)

  ReactiveEffect.activeEffect = fn

  effectIns.run()
}

export { effect }
