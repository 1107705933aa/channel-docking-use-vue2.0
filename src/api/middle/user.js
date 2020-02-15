/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询接入商、渠道商
export function queryProvider(query) {
    return request({
        url: '/link/custinfo/page',
        method: 'get',
        params: query
    })
}

// 新增接入商、渠道商
export function addProvider(obj) {
    return request({
        url: '/link/custinfo',
        method: 'post',
        data: obj
    })
}

// 删除接入商、渠道商
export function delProvider(id) {
    return request({
        url: '/link/custinfo/' + id,
        method: 'delete'
    })
}

// 修改接入商、渠道商
export function putProvider(obj) {
    return request({
        url: '/link/custinfo',
        method: 'put',
        data: obj
    })
}

// 审核接入商、渠道商
export function putProviderCheck(obj) {
    return request({
        url: '/link/custinfo/audit',
        method: 'put',
        data: obj
    })
}

// 查询管理员、负责人信息
export function queryPersonInfo(query) {
    return request({
        url: '/admin/user/page',
        method: 'get',
        params: query
    })
}