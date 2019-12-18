module.exports = function(bundler) {
    bundler.addAssetType('html', require.resolve('./lib/HTMLAssetWithLazySrc.js'));
};