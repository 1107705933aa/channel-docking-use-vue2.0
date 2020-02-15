/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询业务权限
export function queryPermission(query) {
    return request({
        url: '/link/ctal/page',
        method: 'get',
        params: query
    })
}

// 新增业务权限
export function addPermission(obj) {
    return request({
        url: '/link/ctal',
        method: 'post',
        data: obj
    })
}

// 删除业务权限
export function delPermission(id) {
    return request({
        url: '/link/ctal/' + id,
        method: 'delete'
    })
}

// 修改业务权限
export function putPermission(obj) {
    return request({
        url: '/link/ctal',
        method: 'put',
        data: obj
    })
}

// 审核业务权限
export function putPermissionCheck(obj) {
    return request({
        url: '/link/ctal/audit',
        method: 'put',
        data: obj
    })
}

// 启、禁用
export function putPermissionForbid(obj) {
    return request({
        url: '/link/ctal/enable',
        method: 'put',
        data: obj
    })
}