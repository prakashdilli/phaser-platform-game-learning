export default {
    addCollider(otheGameObject,callback) {
        this.scene.physics.add.collider(this,otheGameObject,callback,null,this)
    }
}