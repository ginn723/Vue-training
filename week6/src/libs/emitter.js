import mitt from 'mitt';

// eslint-disable-next-line spaced-comment
const emitter = mitt(); //emitter只能執行一次
export default emitter; // 讓 mitt 匯出
// navbar 使用
