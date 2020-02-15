/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询终端
export function queryTerminal(query) {
    return request({
        url: '/link/terminal/page',
        method: 'get',
        params: query
    })
}

// 新增终端
export function addTerminal(obj) {
    return request({
        url: '/link/terminal',
        method: 'post',
        data: obj
    })
}

// 删除终端
export function delTerminal(id) {
    return request({
        url: '/link/terminal/' + id,
        method: 'delete'
    })
}

// 修改终端
export function putTerminal(obj) {
    return request({
        url: '/link/terminal',
        method: 'put',
        data: obj
    })
}

// 审核
export function putTerminalCheck(obj) {
    return request({
        url: '/link/terminal/audit',
        method: 'put',
        data: obj
    })
}
