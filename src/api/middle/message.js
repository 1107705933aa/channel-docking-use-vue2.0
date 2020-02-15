/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询接口报文
export function queryMessage(query) {
    return request({
        url: '/link/cimi/page',
        method: 'get',
        params: query
    })
}

// 新增接口报文
export function addMessage(obj) {
    return request({
        url: '/link/cimi',
        method: 'post',
        data: obj
    })
}

// 删除接口报文
export function delMessage(id) {
    return request({
        url: '/link/cimi/' + id,
        method: 'delete'
    })
}

// 修改接口报文
export function putMessage(obj) {
    return request({
        url: '/link/cimi',
        method: 'put',
        data: obj
    })
}

