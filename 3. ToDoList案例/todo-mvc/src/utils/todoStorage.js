const LOCAL_KEY = "todos";

/**
 * 生成一个任务的唯一编号，时间戳 + 4位随机数（通过toString(16)转16进制）
 * @returns 
 */
export function generateId(){
  return Date.now() + Math.random().toString(16).substr(2, 4);
}

/**
 * 获取所有的任务
 * @returns 任务列表
 */
export function fetchTodos() {
  // VM3020:1 Uncaught SyntaxError: "undefined" is not valid JSON
  // const result = JSON.parse(localStorage.getItem(LOCAL_KEY));
  const result = localStorage.getItem(LOCAL_KEY);
  if (result) {
    return JSON.parse(result);
  }
  return [];
}


/**
 * 保存所有的任务
 * @returns 
 */
export function saveTodos(todos) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos));
}
