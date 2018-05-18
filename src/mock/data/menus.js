export const Menus = [{
    "id": 1,
    "parentId": 0,
    "menuName": "数据分析",
    "menuIcon": "el-icon-news",
    "menuUrl": "/",
    "orderId": 1,
    "subMenu": [{
        "id": 2,
        "parentId": 1,
        "menuName": "数据统计",
        "menuUrl": "index",
        "orderId": 2
    }]
}, {
    "id": 7,
    "parentId": 0,
    "menuName": "系统设置",
    "menuIcon": "el-icon-setting",
    "menuUrl": "/",
    "orderId": 2,
    "subMenu": [{
        "id": 8,
        "parentId": 7,
        "menuName": "用户管理",
        "menuUrl": "user",
        "orderId": 3
    },
    {
        "id": 9,
        "parentId": 7,
        "menuName": "Page Not Found",
        "menuUrl": "404",
        "orderId": 4
    },
    {
        "id": 10,
        "parentId": 7,
        "menuName": "Forbidden",
        "menuUrl": "403",
        "orderId": 4
    }]
}]
