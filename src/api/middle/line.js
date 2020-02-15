/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 查询连线
export function queryLine(id) {
    return request({
        url: '/link/cpll/' + id,
        method: 'get',
    })
}

// 新增编辑连线
export function addEditLine(obj) {
    return request({
        url: '/link/cpll',
        method: 'post',
        data: obj
    })
}

// 删除连线(根据业务接口编号)
export function delLineInterfaceId(id) {
    return request({
        url: '/link/cpll/' + id,
        method: 'delete'
    })
}

// 删除连线(根据连线编号)
export function delLineId(id) {
    return request({
        url: '/link/cpll/line/' + id,
        method: 'delete'
    })
}
