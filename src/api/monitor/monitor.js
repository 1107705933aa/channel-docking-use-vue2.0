/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

export function fetchInfo() {
  return request({
    url: '/monitor/redis/info',
    method: 'get'
  })
}

export function fetchExec(query) {
  return request({
    url: '/monitor/redis/exec',
    method: 'get',
    params: query
  })
}
