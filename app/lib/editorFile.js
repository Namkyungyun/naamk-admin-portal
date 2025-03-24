
  /**
   * {
   *  "shortcutUrl1" : blobUrl1 (editor preview),
   *  "shortcutUrl2" : blobUrl2 (editor preview),
   *  "shortcutUrl3" : blobUrl3 (editor preview),
   * }
   */
  let blobUrlObject = {};
  let reqFiles = {};


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
  };

  const setReqFiles = (id, newVal) => {
     const object = {};
     object[id] = newVal;
    
     reqFiles = {...reqFiles, ...object};
  };

  const cleanUpRequestFile = (html) => {
    for (let key of Object.keys(blobUrlObject)) {
      let contain = html.includes(key);
      if (!contain) {
        deleteFileInfo(key);
      }
    }
  };

  const deleteFileInfo = (key) => {
    delete reqFiles[key];
    delete blobUrlObject[key];
  }
  
  /// Editor 내의 src 변경하기
  const updateMediaSrc = (editor, updateSrcCallback) => {
    const content = editor.getJSON();

    const updated = {
      ...content,
      content: content.content.map((node) => {
        // 블록 레벨 노드 내부까지 내려가기 (예: paragraph 안의 image)
        if (node.content) {
          return {
            ...node,
            content: node.content.map((child) => {

              if (checkResourceType(child)) {
                const newSrc = updateSrcCallback(child.attrs.src, child);
                return(newSrc == null) ? fetchInvalidResource(child) : fetchValidResource(node, newSrc);
              }

              return child;
            }),
          };
        }

        // 직접 노드 자체가 image/video인 경우
        if (checkResourceType(node)) {
          const newSrc = updateSrcCallback(node.attrs.src, node);
          return(newSrc == null) ? fetchInvalidResource(node) : fetchValidResource(node, newSrc);
        }
        return node;
      }),
    };

    return updated;
    
  }

  const checkResourceType = (node) => {
    return ((node.type === "image" || node.type === "video") &&
    node.attrs?.src && node.attrs?.id);
  }

  const fetchInvalidResource = (node) => {
    return {
      type: "image",
      attrs: {
        ...node.attrs,
        src: "/default-placeholder.png",
        alt: "기본 이미지",
      },
    }; 
  };

  const fetchValidResource = (node, src) => {
    deleteFileInfo(node.attrs.id);

    return {
      ...node,
      attrs: {
        ...node.attrs,
        id: null,
        src: src,
      },
    };
  }
  


  return {blobUrlObject, reqFiles, 
    generateBlobUrl, generateShortcutUrl, 
    setBlobUrlObject, setReqFiles, updateMediaSrc, cleanUpRequestFile
  };
}

