/*
 *
 *  Copyright (c) 2018-2025, Pactera JinXin Software All rights reserved.
 *
 */

import request from '@/router/axios'

// 根据业务接口id查询流程节点列表
export function queryServiceIdCompare(id) {
	return request({
		url: '/link/cppcl/nodes/' + id,
		method: 'get',
	})
}

// 据节点id查询参数对照列表
export function queryNodeIdCompare(query) {
	return request({
		url: '/link/cppcl/list',
		method: 'get',
		params: query
	})
}

// 根据渠道id查询节点参数列表
export function queryChannelIdCompare(id) {
	return request({
		url: '/link/cppcl/channel/' + id,
		method: 'get',
	})
}

// 根据节点id查询节点参数列表
export function queryNodeIdParamCompare(id) {
	return request({
		url: '/link/cppcl/option/' + id,
		method: 'get',
	})
}

// 根据业务接口id查询终止节点出参参数列表
export function queryNodeParamFoptionCompare(id) {
	return request({
		url: '/link/cppcl/foption/' + id,
		method: 'get',
	})
}

// 根据节点id获取上游全部节点
export function queryNodeIdSourceCompare(id) {
	return request({
		url: '/link/cppcl/us/' + id,
		method: 'get',
	})
}

// 根据参数类型查询业务接口参数标识列表
export function queryParamIdCompare(query) {
	return request({
		url: '/link/cppcl/spi',
		method: 'get',
		params: query
	})
}

// 根据业务接口id查询终止节点参数对照列表
export function queryEndNodeCompare(id) {
	return request({
		url: '/link/cppcl/flist/' + id,
		method: 'get',
	})
}

// 新增参数对照
export function addCompare(obj) {
	return request({
		url: '/link/cppcl',
		method: 'post',
		data: obj
	})
}

// 删除参数对照
export function delCompare(id) {
	return request({
		url: '/link/cppcl/' + id,
		method: 'delete'
	})
}

// 修改参数对照
export function putCompare(obj) {
	return request({
		url: '/link/cppcl',
		method: 'put',
		data: obj
	})
}
