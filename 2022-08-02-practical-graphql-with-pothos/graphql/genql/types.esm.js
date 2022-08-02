export default {
    "scalars": [
        1,
        2,
        6,
        8
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
            "tasks": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "Task": {
            "assignee": [
                7
            ],
            "completed": [
                6
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {},
        "User": {
            "id": [
                1
            ],
            "name": [
                2
            ],
            "taskCount": [
                8
            ],
            "__typename": [
                2
            ]
        },
        "Int": {}
    }
}