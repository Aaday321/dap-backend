type EventCallback = (event: string, data: unknown) => void

class PresentationEvents {
  #listeners = new Map<string, Set<EventCallback>>()

  subscribe(code: string, callback: EventCallback) {
    if (!this.#listeners.has(code)) {
      this.#listeners.set(code, new Set())
    }
    this.#listeners.get(code)!.add(callback)
  }

  unsubscribe(code: string, callback: EventCallback) {
    this.#listeners.get(code)?.delete(callback)
  }

  emit(code: string, event: string, data: unknown) {
    for (const callback of this.#listeners.get(code) ?? []) {
      callback(event, data)
    }
  }
}

const presentationEvents = new PresentationEvents()
export default presentationEvents
