(function (factory, root) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.passwordEntropy = factory();
    }
}(function () {
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
        var limits = [
            200,
            500,
            2000,
            4000,
            5000,
            6000,
            7000,
            8000,
            9000
        ];

        for (var i = 0; i < limits.length; i += 1) {
            if (entropy < limits[i + 1]) {
                return i + 1;
            }
        }

        return 10;
    }


    return function (password) {
        var uniqueCharacters = uniqueCharsInString(password);

        var multiplier = 0;

        if (/[a-z]/.test(password)) { multiplier += 26; }
        if (/[A-Z]/.test(password)) { multiplier += 26; }
        if (/[0-9]/.test(password)) { multiplier += 10; }
        if (/[^a-zA-Z0-9]/.test(password)) { multiplier += 30; }
        var entropy = (password.length * password.length + uniqueCharacters) * multiplier;
        var score = convertEntropyToScore(entropy);
        return score;
    };
}, this));
