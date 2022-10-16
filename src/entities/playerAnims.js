export default anims => {
    anims.create({
        key:'idle',
        frames:anims.generateFrameNumbers('player',{start:0,end:7}),
        frameRate:8
    })

    anims.create({
        key:'run',
        frames:anims.generateFrameNumbers('player',{start:11,end:16}),
        frameRate:8
    })
}