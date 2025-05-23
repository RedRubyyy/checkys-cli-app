export default async function (timeout) {
    return new Promise (function (resolved , rejected) {
        setTimeout(function () {resolved()}, timeout)
    })
}