export default {
    "scalars": [
        1,
        2,
        5
    ],
    "types": {
        "Article": {
            "id": [
                1
            ],
            "title": [
                2
            ],
            "url": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "ID": {},
        "String": {},
        "Mutation": {
            "createArticle": [
                0,
                {
                    "title": [
                        2,
                        "String!"
                    ],
                    "url": [
                        2,
                        "String!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "articles": [
                0
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {}
    }
}