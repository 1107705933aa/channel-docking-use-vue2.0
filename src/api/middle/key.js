/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询秘钥
export function querykey(query) {
    return request({
        url: '/link/cski/page',
        method: 'get',
        params: query
    })
}

// 新增秘钥
export function addkey(obj) {
    return request({
        url: '/link/cski',
        method: 'post',
        data: obj
    })
}

// 删除秘钥
export function delkey(id) {
    return request({
        url: '/link/cski/' + id,
        method: 'delete'
    })
}

// 修改秘钥
export function putkey(obj) {
    return request({
        url: '/link/cski',
        method: 'put',
        data: obj
    })
}

