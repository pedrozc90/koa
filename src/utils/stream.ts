import { Transform, TransformCallback, TransformOptions } from "stream";

export class Counter extends Transform {

    public length: number = 0;

    constructor(opts?: TransformOptions) {
        super(opts);
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        // here you can perform any transformations on the data
        // for simplicity, let's just count the number of bytes in the chunk
        this.length += chunk.length;
        // pass the transformed data to the next stream
        this.push(chunk);
        // call the callback to indicate that the transformation is complete
        callback();
    }

}
