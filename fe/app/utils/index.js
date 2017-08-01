export function check(propertyName, context = window, timeout = 15000) {
  let useTime = 0;
  let interval = 500;
  return new Promise((res, rej) => {
  let intervalFlag = setInterval(() => {
      useTime += interval;
      if (useTime > timeout) {
        clearInterval(intervalFlag);
        rej('check time out');
      }
      propertyName = typeof propertyName == 'function' ? propertyName() : context[propertyName];
      if (propertyName) {
        clearInterval(intervalFlag);
        res(propertyName);
      }
    }, interval);
  });
}


export function f7Alert(msg, title = '消息提示', cb = ()=> null) {
  f7App.alert(msg, title, cb);
}

export async function f7Confirm(msg, title, cbOk = () => true, cbCancel = () => false) {
  return new Promise((res) => {
    f7App.confirm(msg, title, () => { cbOk(); res({ state: true }); }, () => { cbCancel(); res({state: false}); });
  })
}
