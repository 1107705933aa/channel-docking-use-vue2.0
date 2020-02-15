/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询参数
export function queryParamC(query) {
    return request({
        url: '/link/ccpl/',
        method: 'get',
        params: query
    })
}

// 新增参数
export function addParamC(obj) {
    return request({
        url: '/link/ccpl',
        method: 'post',
        data: obj
    })
}

// 删除参数
export function delParamC(id) {
    return request({
        url: '/link/ccpl/' + id,
        method: 'delete'
    })
}

// 修改参数
export function putParamC(obj) {
    return request({
        url: '/link/ccpl',
        method: 'put',
        data: obj
    })
}
