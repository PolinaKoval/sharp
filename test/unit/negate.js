'use strict';

var assert = require('assert');

var sharp = require('../../index');
var fixtures = require('../fixtures');

describe('Negate', function() {
    it('negate (jpeg)', function(done) {
        sharp(fixtures.inputJpg)
            .resize(320, 240)
            .negate()
            .toBuffer(function(err, data, info) {
                assert.strictEqual('jpeg', info.format);
                assert.strictEqual(320, info.width);
                assert.strictEqual(240, info.height);
                fixtures.assertSimilar(fixtures.expected('negate.jpg'), data, done);
            });
    });

    it('negate (png)', function(done) {
        sharp(fixtures.inputPng)
            .resize(320, 240)
            .negate()
            .toBuffer(function(err, data, info) {
                assert.strictEqual('png', info.format);
                assert.strictEqual(320, info.width);
                assert.strictEqual(240, info.height);
                fixtures.assertSimilar(fixtures.expected('negate.png'), data, done);
            });
    });

    it('negate (png, trans)', function(done) {
        sharp(fixtures.inputPngWithTransparency)
            .resize(320, 240)
            .negate()
            .toBuffer(function(err, data, info) {
                assert.strictEqual('png', info.format);
                assert.strictEqual(320, info.width);
                assert.strictEqual(240, info.height);
                fixtures.assertSimilar(fixtures.expected('negate-trans.png'), data, done);
            });
    });

    it('negate (png, alpha)', function(done) {
        sharp(fixtures.inputPngWithGreyAlpha)
            .resize(320, 240)
            .negate()
            .toBuffer(function(err, data, info) {
                assert.strictEqual('png', info.format);
                assert.strictEqual(320, info.width);
                assert.strictEqual(240, info.height);
                fixtures.assertSimilar(fixtures.expected('negate-alpha.png'), data, done);
            });
    });

    if (sharp.format.webp.output.file) {
        it('negate (webp)', function(done) {
            sharp(fixtures.inputWebP)
                .resize(320, 240)
                .negate()
                .toBuffer(function(err, data, info) {
                    assert.strictEqual('webp', info.format);
                    assert.strictEqual(320, info.width);
                    assert.strictEqual(240, info.height);
                    fixtures.assertSimilar(fixtures.expected('negate.webp'), data, done);
                });
        });

        it('negate (webp, trans)', function(done) {
            sharp(fixtures.inputWebPWithTransparency)
                .resize(320, 240)
                .negate()
                .toBuffer(function(err, data, info) {
                    assert.strictEqual('webp', info.format);
                    assert.strictEqual(320, info.width);
                    assert.strictEqual(240, info.height);
                    fixtures.assertSimilar(fixtures.expected('negate-trans.webp'), data, done);
                });
        });
    }

    it('negate (true)', function(done) {
        sharp(fixtures.inputJpg)
            .resize(320, 240)
            .negate(true)
            .toBuffer(function(err, data, info) {
                assert.strictEqual('jpeg', info.format);
                assert.strictEqual(320, info.width);
                assert.strictEqual(240, info.height);
                fixtures.assertSimilar(fixtures.expected('negate.jpg'), data, done);
            });
    });

    it('negate (false)', function(done) {
        var output = fixtures.path('output.unmodified-by-negate.png');
        sharp(fixtures.inputJpgWithLowContrast)
            .negate(false)
            .toFile(output, function(err, info) {
                if (err) done(err);
                fixtures.assertMaxColourDistance(output, fixtures.inputJpgWithLowContrast, 0);
                done();
            });
    });
});
