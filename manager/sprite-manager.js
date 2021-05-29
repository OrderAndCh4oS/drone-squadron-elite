export default class SpriteManager {
    _sprites = {}

    constructor(sprites) {
        for(const sprite of sprites) {
            this.addSprite(sprite)
        }
    }

    getSprite(name) {
        return this._sprites[name];
    }

    addSprite({name, filePath, ...rest}) {
        if(name in this._sprites) return;
        const sprite = new Image();
        sprite.src = filePath;
        this._sprites[name] = {sprite, ...rest};
    }
}
