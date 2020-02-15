/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询节点
export function queryNode(id) {
    return request({
        url: '/link/cpni/' + id,
        method: 'get',
    })
}

// 新增节点
export function addNode(obj) {
    return request({
        url: '/link/cpni',
        method: 'post',
        data: obj
    })
}

// 删除节点
export function delNode(id) {
    return request({
        url: '/link/cpni/' + id,
        method: 'delete'
    })
}

