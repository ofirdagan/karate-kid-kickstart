export const addEvent: Function = (id: string, eventName: string, func: EventListener) => document.getElementById(id)!.addEventListener(eventName, func)
export const getValue: Function = (id: string):string => (document.getElementById(id) as HTMLInputElement).value
export const getInnerText: Function = (id: string): string => document.getElementById(id)!.innerText
export const setValue: Function = (id: string, value: string) => (document.getElementById(id) as HTMLInputElement).value = value
export const setInnerText: Function = (id: string, text: string) => document.getElementById(id)!.innerText = text