/*global describe,it*/
var expect = require('unexpected');
var passwordEntropy = require('../lib/password-entropy');

describe('password-entropy', function () {
    it('should be a function', function () {
        expect(passwordEntropy, 'to be a function');
    });
    expect.addAssertion('string', 'to have entropy', function (expect, subject, value) {
        this.errorMode = 'nested';
        expect(passwordEntropy(subject), 'to be', value);
    });
    expect.addAssertion('string', 'to have entropy greater than', function (expect, subject, value) {
        this.errorMode = 'nested';
        expect(passwordEntropy(subject), 'to be greater than', value);
    });
    expect.addAssertion('string', 'to have entropy less than', function (expect, subject, value) {
        this.errorMode = 'nested';
        expect(passwordEntropy(subject), 'to be less than', value);
    });

    describe('simple passwords', function () {
        [
            '',
            '1',
            '123456',
            'password',
            'Password'
        ].forEach(function (password) {
            it(password, function () {
                expect(password, 'to have entropy less than', 3.5);
            });
        });
    });

    describe('medium passwords', function () {
        [
            'ChaG4que',
            'ChaG4qu4que',
            'ChaGfque!',
            'aaaaaaaaaaaaaaaaa'
        ].forEach(function (password) {
            it(password, function () {
                expect(password, 'to have entropy greater than', 3.5);
                expect(password, 'to have entropy less than', 7.5);
            });
        });
    });

    describe('strong passwords', function () {
        [
            'aaaaaaaaaaaaaaaaaa',
            'ChaG4que!ø',
            'det her er et godt password',
            '1111111111111111111111111111111111111111',
            'xoad4zei8eahahl8Chaelehahvee0oD4Oopheiji9congeeBuNoo8pheevei5fah'
        ].forEach(function (password) {
            it(password, function () {
                expect(password, 'to have entropy greater than', 7.5);
            });
        });
    });
});
