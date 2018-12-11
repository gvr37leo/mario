var groundRuleTile:RuleTile
function setupAssets(){
        groundRuleTile = new RuleTile(1,[
        new Rule(bottomcornersprite,[
            [-1,-2,-1],
            [-2,-1, 1],
            [-1, 1,-1],
        ]),
        new Rule(bottomcornersprite,[
            [-1,-2,-1],
            [ 1,-1,-2],
            [-1, 1,-1],
        ]),
        new Rule(topcornersprite,[
            [-1, 1,-1],
            [-2,-1, 1],
            [-1,-2,-1],
        ]),
        new Rule(topcornersprite,[
            [-1, 1,-1],
            [ 1,-1,-2],
            [-1,-2,-1],
        ]),


        new Rule(topsprite,[
            [-1,-2,-1],
            [ 1,-1, 1],
            [-1, 1,-1],
        ]),
        new Rule(sidesprite,[
            [-1, 1,-1],
            [ 1,-1,-2],
            [-1, 1,-1],
        ]),
        new Rule(topsprite,[
            [-1, 1,-1],
            [ 1,-1, 1],
            [-1,-2,-1],
        ]),
        new Rule(sidesprite,[
            [-1, 1,-1],
            [-2,-1, 1],
            [-1, 1,-1],
        ]),

        new Rule(insidesprite,[
            [-2, 1,-1],
            [ 1,-1, 1],
            [-1, 1,-1],
        ]),
        new Rule(insidesprite,[
            [-1, 1,-2],
            [ 1,-1, 1],
            [-1, 1,-1],
        ]),
        new Rule(insidesprite,[
            [-1, 1,-1],
            [ 1,-1, 1],
            [-1, 1,-2],
        ]),
        new Rule(insidesprite,[
            [-1, 1,-1],
            [ 1,-1, 1],
            [-2, 1,-1],
        ]),

        new Rule(insidesprite,[
            [-1, 1,-1],
            [ 1,-1, 1],
            [-1, 1,-1],
        ]),

    ],[

    ])
}
