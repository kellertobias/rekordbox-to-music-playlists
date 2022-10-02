// @ts-ignore cannot be declared as "import" is a keyword
ObjC.import("Foundation");

export const readFile = (path: string, encoding: number = 4) => {
  // 10
  !encoding && (encoding = $.NSUTF8StringEncoding);

  const fm = $.NSFileManager.defaultManager;
  const data = fm.contentsAtPath(path);
  const str = $.NSString.alloc.initWithDataEncoding(data, encoding);
  return ObjC.unwrap(str);
};
