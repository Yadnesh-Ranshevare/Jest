// jest.polyfills.js
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'stream/web';
import { MessageChannel, MessagePort, BroadcastChannel } from 'worker_threads';

// Polyfill TextEncoder/TextDecoder
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// Polyfill Web Streams
if (!global.ReadableStream) global.ReadableStream = ReadableStream;
if (!global.TransformStream) global.TransformStream = TransformStream;
if (!global.WritableStream) global.WritableStream = WritableStream;

// Polyfill Worker APIs
if (!global.MessageChannel) global.MessageChannel = MessageChannel;
if (!global.MessagePort) global.MessagePort = MessagePort;
if (!global.BroadcastChannel) global.BroadcastChannel = BroadcastChannel;
