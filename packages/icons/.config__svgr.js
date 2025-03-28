module.exports = {
    "icon": true,
    "ext": "tsx",
    "ref": true,
    "prettier": false,
    "titleProp": true,
    "filenameCase": "kebab",
    "svgoConfig": {
        "plugins": [
            {
                "removeAttrs": {
                    "attrs": "path:fill"
                },

            },
            {"sortAttrs": true},
            {"removeXMLNS": true}
        ]
    }
}



