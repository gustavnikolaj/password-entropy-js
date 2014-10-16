function uniqueCharsInString(str) {
    var chars = {};
    var counter = 0;
    str.split('').forEach(function (c) {
        if (!(c in chars)) {
            chars[c] = true;
            counter += 1;
        }
    });
    return counter;
}

function convertEntropyToScore(entropy) {
    if (entropy < 500) {
        return 1;
    }
    if (entropy < 1000) {
        return 2;
    }
    if (entropy < 1500) {
        return 3;
    }
    if (entropy < 2000) {
        return 4;
    }
    if (entropy < 2500) {
        return 5;
    }
    if (entropy < 3000) {
        return 6;
    }
    if (entropy < 3500) {
        return 7;
    }
    if (entropy < 4000) {
        return 8;
    }
    if (entropy < 4500) {
        return 9;
    }

    return 10;
}


module.exports = function (password) {
    var uniqueCharacters = uniqueCharsInString(password);

    var multiplier = 0;

    if (/[a-z]/.test(password)) { multiplier += 26; }
    if (/[A-Z]/.test(password)) { multiplier += 26; }
    if (/[0-9]/.test(password)) { multiplier += 10; }
    if (/[^a-zA-Z0-9]/.test(password)) { multiplier += 50; }

    var entropy = convertEntropyToScore((password.length + uniqueCharacters) * multiplier);
    return entropy;
};
