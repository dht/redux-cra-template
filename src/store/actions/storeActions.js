export const setAppState = value => ({ type: "SET_APPSTATE", value }); // prettier-ignore
export const patchAppState = value => ({ type: "PATCH_APPSTATE", value }); // prettier-ignore

export const setTodos = value => ({ type: "SET_TODOS", value }); // prettier-ignore
export const setTodo = (id, value) => ({ type: "SET_TODO", id, value }); // prettier-ignore
export const addTodo = (value) => ({ type: "ADD_TODO", value }); // prettier-ignore
export const patchTodo = (id, value, silent) => ({ type: "PATCH_TODO", id, value, silent }); // prettier-ignore
export const deleteTodo = id => ({ type: "DELETE_TODO", id }); // prettier-ignore

export const addModal = (which, params) => ({ type: "ADD_MODAL", value: {which, params} }); // prettier-ignore
export const popModal = () => ({ type: "POP_MODAL" }); // prettier-ignore

export const showToast = (text, type = "success") => patchAppState({ toast: { type, text } }); // prettier-ignore
export const clearToasts = () => patchAppState({ toast: { type: "CLEAR" } }); // prettier-ignore

export const blank = () => ({type: "BLANK"}); // prettier-ignore
