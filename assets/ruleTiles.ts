var groundRuleTile:RuleTile
function setupAssets(){
        groundRuleTile = new RuleTile([
        new Rule(fullSprite,[
            [-1,-2,-1],
            [-2,-1, 0],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1,-2,-1],
            [ 0,-1,-2],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [-2,-1, 0],
            [-1,-2,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1,-2],
            [-1,-2,-1],
        ]),


        new Rule(fullSprite,[
            [-1,-2,-1],
            [ 0,-1, 0],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1,-2],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1, 0],
            [-1,-2,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [-2,-1, 0],
            [-1, 0,-1],
        ]),

        new Rule(fullSprite,[
            [-2, 0,-1],
            [ 0,-1, 0],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-2],
            [ 0,-1, 0],
            [-1, 0,-1],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1, 0],
            [-1, 0,-2],
        ]),
        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1, 0],
            [-2, 0,-1],
        ]),

        new Rule(fullSprite,[
            [-1, 0,-1],
            [ 0,-1, 0],
            [-1, 0,-1],
        ]),

    ],[

    ])
}
