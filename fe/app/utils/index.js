export function check(propertyName, context = window, timeout = 15000) {
  let useTime = 0;
  let interval = 500;
  return new Promise((res, rej) => {
  let intervalFlag = setInterval(() => {
      if (useTime > timeout) {
        clearInterval(intervalFlag);
        rej('check time out');
      } else {
        propertyName = typeof propertyName == 'function' ? propertyName() : context[propertyName];
        if (propertyName) {
          clearInterval(intervalFlag);
          res(propertyName);
        }
        useTime += interval;
      }
    }, interval);
  });
}

export function f7Alert(msg, title = '消息提示', btnClickedCallback = ()=> null) {
  f7App.alert(msg, title, btnClickedCallback);
}

export async function f7Confirm(msg, title, cbOk = () => true, cbCancel = () => false) {
  return new Promise((res) => {
    f7App.confirm(msg, title, () => { cbOk(); res({ state: true }); }, () => { cbCancel(); res({state: false}); });
  });
}
