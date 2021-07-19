/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */

/*
 * @Descripttion:
 * @version:
 * @Author: windowdotonload
 */
import './index.css';
// import '@babel/polyfill'
// import 'core-js'

const fun_qweqwe_A = () => {
    console.log('123');
};

console.log(module.hot)

// 注册serviceworker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            console.log('注册成功了')
        }).then(() => {
            console.log('注册失败了')
        })
    })
}