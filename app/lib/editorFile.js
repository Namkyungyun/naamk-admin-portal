
  /**
   * {
   *  "shortcutUrl1" : blobUrl1 (editor preview),
   *  "shortcutUrl2" : blobUrl2 (editor preview),
   *  "shortcutUrl3" : blobUrl3 (editor preview),
   * }
   */
  let blobUrlObject = {};

  /**
   * [ {"shorcurUrl1" : s3-url1}, {"shorcurUrl2" : s3-url2}, ]
   */
  let reqFiles = [];


export default function editorFile() {
  const generateBlobUrl = (file) => {
    return URL.createObjectURL(file);
  }

  // uuid용
  const generateShortcutUrl = (length=11) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charsetLength = charset.length;

    let result = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
  
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charsetLength];
    }

    return result;
  }

  const setBlobUrlObject = (id, newVal) => {
     const object = {};
     object[id] = newVal;
    
     blobUrlObject = {...blobUrlObject, ...object};
     console.log("====1")
     console.log(blobUrlObject);
  };

  const setReqFiles = (id, newVal) => {
     const object = {};
     object[id] = newVal;
    
     reqFiles = [...reqFiles, object];
  };


  return {blobUrlObject, reqFiles, 
    generateBlobUrl, generateShortcutUrl, 
    setBlobUrlObject, setReqFiles
  };
}

