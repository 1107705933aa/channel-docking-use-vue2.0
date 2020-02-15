/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询渠道接口
export function queryChannel(query) {
    return request({
        url: '/link/ccii/page',
        method: 'get',
        params: query
    })
}

// 新增渠道接口
export function addChannel(obj) {
    return request({
        url: '/link/ccii',
        method: 'post',
        data: obj
    })
}

// 删除渠道接口
export function delChannel(id) {
    return request({
        url: '/link/ccii/' + id,
        method: 'delete'
    })
}

// 修改渠道接口
export function putChannel(obj) {
    return request({
        url: '/link/ccii',
        method: 'put',
        data: obj
    })
}

// 审核
export function putChannelCheck(obj) {
    return request({
        url: '/link/ccii/audit',
        method: 'put',
        data: obj
    })
}

// 保存执行策略
export function addStrategy(obj) {
    return request({
        url: '/link/cepi',
        method: 'post',
        data: obj
    })
}

// 根据id查询执行策略
export function queryStrategy(id) {
    return request({
        url: '/link/cepi/channel/' + id,
        method: 'get'
    })
}

// 删除执行策略
export function delStrategy(id) {
    return request({
        url: '/link/cepi/' + id,
        method: 'delete'
    })
}