/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询接口协议
export function queryAgree(query) {
    return request({
        url: '/link/cipi/page',
        method: 'get',
        params: query
    })
}

// 新增接口协议
export function addAgree(obj) {
    return request({
        url: '/link/cipi',
        method: 'post',
        data: obj
    })
}

// 删除接口协议
export function delAgree(id) {
    return request({
        url: '/link/cipi/' + id,
        method: 'delete'
    })
}

// 修改接口协议
export function putAgree(obj) {
    return request({
        url: '/link/cipi',
        method: 'put',
        data: obj
    })
}

