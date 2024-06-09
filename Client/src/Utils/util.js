export function encodeEmail(email) {
    return email.replace(/\./g, ',')
}
export function decodeEmail(email) {
    return email.replace(/\,/g, '.')
}