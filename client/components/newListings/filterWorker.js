const workercode = () => {
  self.onmessage = (e) => { // without self, onmessage is not defined
    const searchWithinArray = (arr, target) => {
      const cleanTarget = target
        ? target
          .trim()
          .toLowerCase()
        : '';
      if (!cleanTarget) 
        return arr;
      return arr.filter(item => item.name.toLowerCase().includes(cleanTarget));
    }
    var workerResult = searchWithinArray(e.data.array, e.data.target);
    self.postMessage({result: workerResult}); // here it's working without self
  }
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], {type: "application/javascript"});
const worker_script = URL.createObjectURL(blob);

export default worker_script;
