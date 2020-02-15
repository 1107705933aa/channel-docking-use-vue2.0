/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询参数
export function queryParam(query) {
    return request({
        url: '/link/cspl/',
        method: 'get',
        params: query
    })
}

// 新增参数
export function addParam(obj) {
    return request({
        url: '/link/cspl',
        method: 'post',
        data: obj
    })
}

// 删除参数
export function delParam(id) {
    return request({
        url: '/link/cspl/' + id,
        method: 'delete'
    })
}

// 修改参数
export function putParam(obj) {
    return request({
        url: '/link/cspl',
        method: 'put',
        data: obj
    })
}
