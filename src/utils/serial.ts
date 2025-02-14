import Long from 'long';
import {strings} from "./strings";
import {objects} from "./objects";

export function StringToBytes(str: string): Uint8Array {
    strings.requireNonNil(str as any);
    const buffer = new ArrayBuffer(str.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < str.length; i++) {
        view[i] = str.charCodeAt(i);
    }
    return view;
}

export function BytesToString(bytes: Uint8Array): string {
    objects.requireNonNil(bytes);
    let string = '';
    for (let i = 0; i < bytes.length; i++) {
        string += String.fromCharCode(bytes[i]);
    }
    return string;
}

export function Int32ToBytes(num: number): Uint8Array {
    objects.requireNonNilNumber(num);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, num, true);
    return new Uint8Array(buffer);
}

export function BytesToInt32(bytes: Uint8Array): number {
    objects.requireNonNil(bytes);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
        view.setInt8(i, bytes[i]);
    }
    return view.getInt32(0, true);
}

export function Int64ToBytes(num: number): Uint8Array {
    objects.requireNonNilNumber(num);
    const longNum = Long.fromNumber(num, true);
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setInt32(0, longNum.low, true);
    view.setInt32(4, longNum.high, true);
    return new Uint8Array(buffer);
}

export function BytesToInt64(bytes: Uint8Array): number {
    objects.requireNonNil(bytes);
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
        view.setInt8(i, bytes[i]);
    }
    return view.getInt32(0, true);
}

export function BooleanToBytes(bool: boolean): Uint8Array {
    objects.requireNonNil(bool);
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    view.setUint8(0, bool ? 1 : 0);
    return new Uint8Array(buffer);
}

export function BytesToBoolean(bytes: Uint8Array): boolean {
    objects.requireNonNil(bytes);
    const buffer = new ArrayBuffer(1);
    const view = new DataView(buffer);
    for (let i = 0; i < bytes.length; i++) {
        view.setUint8(i, bytes[i]);
    }
    return view.getUint8(0) === 1;
}