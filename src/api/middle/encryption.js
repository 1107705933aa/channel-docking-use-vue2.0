/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询加密协议
export function queryEncryption(query) {
    return request({
        url: '/link/cenpi/page',
        method: 'get',
        params: query
    })
}

// 新增加密协议
export function addEncryption(obj) {
    return request({
        url: '/link/cenpi',
        method: 'post',
        data: obj
    })
}

// 删除加密协议
export function delEncryption(id) {
    return request({
        url: '/link/cenpi/' + id,
        method: 'delete'
    })
}

// 修改加密协议
export function putEncryption(obj) {
    return request({
        url: '/link/cenpi',
        method: 'put',
        data: obj
    })
}

