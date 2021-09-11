// @ts-ignore
ObjC.import('Foundation')

export const readFile = (path: string, encoding: number = 4) => { // 10
    // @ts-ignore
    !encoding && (encoding = $.NSUTF8StringEncoding)

    // @ts-ignore
    const fm = $.NSFileManager.defaultManager
    const data = fm.contentsAtPath(path)
    // @ts-ignore
    const str = $.NSString.alloc.initWithDataEncoding(data, encoding)
    // @ts-ignore
    return ObjC.unwrap(str)
}