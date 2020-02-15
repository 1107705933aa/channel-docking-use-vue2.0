/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询业务接口
export function queryService(query) {
    return request({
        url: '/link/csii/page',
        method: 'get',
        params: query
    })
}

// 新增业务接口
export function addService(obj) {
    return request({
        url: '/link/csii',
        method: 'post',
        data: obj
    })
}

// 删除业务接口
export function delService(id) {
    return request({
        url: '/link/csii/' + id,
        method: 'delete'
    })
}

// 修改业务接口
export function putService(obj) {
    return request({
        url: '/link/csii',
        method: 'put',
        data: obj
    })
}

// 审核
export function putServiceCheck(obj) {
    return request({
        url: '/link/csii/audit',
        method: 'put',
        data: obj
    })
}

