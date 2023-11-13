const targetMap = new WeakMap()

const proxyHandler: ProxyHandler<any> = {
  get(target, key, receiver) {
    // 如果target对象中指定了getter，receiver则为getter调用时的this值。
    // 当被代理的对象存在getter时发挥作用
    return Reflect.get(target, key, receiver)
  },

  set(target, key, value, receiver) {
    return Reflect.set(target, key, value, receiver)
  }
}

const reactive = (target: any) => {
  if (targetMap.has(target)) {
    return targetMap.get(target)
  }

  const proxyTarget = new Proxy(target, proxyHandler)

  targetMap.set(target, proxyTarget)

  return proxyTarget
}

export { reactive }
