const HTMLAsset = require('parcel-bundler/src/assets/HTMLAsset');

class HTMLAssetWithLazySrc extends HTMLAsset {
    collectDependencies() {
        super.collectDependencies();
        this.ast.walk(node => {
            if (node.attrs) {
                for (let attr in node.attrs) {
                    if (attr === 'data-bg' || attr === 'data-background-image') {
                        node.attrs[attr] = "url('" + super.collectSrcSetDependencies(node.attrs[attr].replace("url('", "").replace("')", "")) + "')";
                        this.isAstDirty = true;
                        continue;
                    }
                    if (attr === 'data-src' || attr === 'data-srcset') {
                        node.attrs[attr] = super.collectSrcSetDependencies(node.attrs[attr]);
                        this.isAstDirty = true;
                        continue;
                    }
                }
            }

            return node;
        });
    }
}

module.exports = HTMLAssetWithLazySrc;