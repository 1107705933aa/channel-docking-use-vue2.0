/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/job/sys-job-log/page',
    method: 'get',
    params: query
  })
}

