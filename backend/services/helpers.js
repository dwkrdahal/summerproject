const generateRandomString = (len) => {
    const str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let last_index = str.length;

    let random = "";

    for(let i = 0; i < len; i++){
        let rand_posn = Math.floor(Math.random() * last_index);
        random += str[rand_posn];
    }
    return random;
}

module.exports = {generateRandomString};