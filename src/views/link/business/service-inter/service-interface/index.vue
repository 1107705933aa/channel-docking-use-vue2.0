<template>
  <div id="access-provider">
    <!-- 检索 -->
    <el-form class="el-row-space" ref="form" :model="form" label-width="90px" label-position="left">
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="接口编号:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.serviceInterfaceId"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="接口类型:">
            <el-select v-model="form.value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.serviceInterfaceType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="接口状态:">
            <el-select v-model="form.statusValue" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.serviceInterfaceStatus"
                :key="item.statusValue"
                :label="item.label"
                :value="item.statusValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="接口名称:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.serviceInterfaceName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space">
            <el-button
              class="padding-space"
              icon="el-icon-search"
              type="primary"
              @click="handleSearch"
              size="mini"
            >检索</el-button>
            <el-button
              class="padding-space"
              icon="el-icon-delete"
              size="mini"
              @click="handleReset"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- 业务接口入驻 -->
    <el-row class="el-row-space" v-if="cis_service_interface_info_add">
      <el-col :span="24">
        <el-button
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          @click="dialogFormVisible = true"
          size="mini"
        >业务接口入驻</el-button>
      </el-col>
    </el-row>
    <!-- 新增业务接口弹出框 -->
    <el-dialog title="新增业务接口" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="接口类型:" prop="value">
              <el-select v-model="addForm.value" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.serviceInterfaceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口名称:" prop="serviceInterfaceName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.serviceInterfaceName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口描述:" prop="serviceInterfaceInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.serviceInterfaceInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="接口标识:" prop="serviceInterfaceIdentifier">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.serviceInterfaceIdentifier"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleAdd('addForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格内容 -->
    <el-table
      :data="tableData"
      border
      style="width: 97%"
      size="mini"
      :class="{'table-top':isActive}"
      :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
      v-loading="tableLoading"
    >
      <el-table-column prop="serviceInterfaceId" label="接口编号" width="180" align="center"></el-table-column>
      <el-table-column
        v-if="hideData"
        prop="serviceInterfaceType"
        label="接口类型"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column prop="serviceInterfaceTypeDesc" label="接口类型" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="serviceInterfaceStatus" label="接口状态" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceStatusDesc" label="接口状态" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceName" label="接口名称" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceInfo" label="接口概述" align="center"></el-table-column>
      <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="createUser" label="发布人" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceIdentifier" label="接口标识" align="center"></el-table-column>
      <el-table-column label="操作" width="230" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handlegetParam(scope.row)"
            icon="el-icon-tickets"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >参数明细</el-button>
          <el-button
            @click="jumpParamCompare(scope.row)"
            icon="el-icon-picture-outline-round"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >参数对照</el-button>
          <el-button
            @click="handleOpenQuery(scope.row)"
            icon="el-icon-view"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >查询</el-button>
          <el-button
            v-if="cis_service_interface_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_service_interface_info_del"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >删除</el-button>
          <el-button
            v-if="cis_service_interface_info_audit"
            @click="handleOpenCheck(scope.row)"
            icon="el-icon-document-checked"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >审核</el-button>
          <!-- 禁用操作 -->
          <el-popover placement="top" width="190" v-model="scope.row.prohibitVisible">
            <p>
              <i class="el-icon-warning"></i> &nbsp;
              <span class="popover-content">该行为将使业务接口被禁用，是否继续？</span>
            </p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="text"
                class="cancel-style"
                size="mini"
                @click="scope.row.prohibitVisible = false"
              >取消</el-button>
              <el-button
                type="primary"
                class="button-style"
                size="mini"
                @click="handleForbid(scope.row)"
              >禁用</el-button>
            </div>
            <el-button
              v-if="cis_service_interface_info_disable"
              icon="el-icon-remove-outline"
              slot="reference"
              type="text"
              size="small"
              class="clear-space"
              style="padding-right:7px;"
            >禁用</el-button>
          </el-popover>
          <el-button
            @click="handleJumpNode(scope.row)"
            icon="el-icon-position"
            type="text"
            size="small"
            class="clear-space"
          >接口逻辑管理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block page">
      <el-pagination
        background
        :page-size="page.pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        :small="true"
      ></el-pagination>
    </div>
    <!-- 编辑业务接口弹出框 -->
    <el-dialog :title="editTitle" :visible.sync="dialogEditFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.serviceInterfaceId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="接口类型:" prop="typeValue">
              <el-select
                v-model="editForm.typeValue"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.serviceInterfaceType"
                  :key="item.typeValue"
                  :label="item.label"
                  :value="item.typeValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口状态:">
              <el-select v-model="editForm.statusValue" disabled placeholder="请选择" size="mini">
                <el-option
                  v-for="item in editForm.serviceInterfaceStatus"
                  :key="item.statusValue"
                  :label="item.label"
                  :value="item.statusValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="接口名称:" prop="serviceInterfaceName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.serviceInterfaceName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口描述:" prop="serviceInterfaceInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.serviceInterfaceInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11" :push="2">
            <el-form-item class="clear-space" label="版本号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.version"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false" size="small">取 消</el-button>
        <el-button v-if="isQuery" type="primary" @click="handleEdit('editForm')" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 审核业务接口弹出框 -->
    <el-dialog title="审核业务接口信息" :visible.sync="dialogCheckFormVisible">
      <el-form :model="checkForm">
        <el-form ref="form" label-width="100px" label-position="left">
          <el-row>
            <el-col :span="11">
              <el-form-item class="clear-space" label="接口编号:">
                <el-input
                  class="input-width"
                  size="mini"
                  v-model="checkForm.serviceInterfaceId"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="2">
              <el-form-item class="clear-space" label="接口类型:" prop="value">
                <el-select v-model="checkForm.typeValue" placeholder="请选择" size="mini" disabled>
                  <el-option
                    v-for="item in checkForm.serviceInterfaceType"
                    :key="item.typeValue"
                    :label="item.label"
                    :value="item.typeValue"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item class="clear-space" label="接口状态:">
                <el-select v-model="checkForm.statusValue" disabled placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in checkForm.serviceInterfaceStatus"
                    :key="item.statusValue"
                    :label="item.label"
                    :value="item.statusValue"
                    disabled
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" :push="2">
              <el-form-item class="clear-space" label="接口名称:" prop="serviceInterfaceName">
                <el-input
                  class="input-width"
                  size="mini"
                  v-model="checkForm.serviceInterfaceName"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item class="clear-space" label="接口描述:" prop="serviceInterfaceInfo">
                <el-input
                  class="input-width"
                  size="mini"
                  v-model="checkForm.serviceInterfaceInfo"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col v-if="hideData" :span="11" :push="2">
              <el-form-item class="clear-space" label="版本号:">
                <el-input
                  class="input-width"
                  size="mini"
                  v-model="checkForm.version"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckFormVisible = false" size="small">取 消</el-button>
        <el-button @click="handleCheckNo" type="primary" size="small">不通过</el-button>
        <el-button @click="handlecheckYes" type="primary" size="small">通 过</el-button>
      </div>
    </el-dialog>
    <!-- 参数明细 -->
    <el-dialog title="参数明细" :visible.sync="dialogParamFormVisible">
      <el-form>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item label="业务接口id:">
              <el-input
                size="mini"
                v-model="paramForm.serviceInterfaceId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="参数类型:">
              <el-select
                @change="handlegetParam"
                v-model="paramForm.serviceParameterType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in paramForm.typeValue"
                  :key="item.serviceParameterType"
                  :label="item.label"
                  :value="item.serviceParameterType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" class="top-space">
            <span v-if="cis_service_parameter_list_add">
              <el-button
                v-if="isAdd"
                @click="handleAddParam"
                icon="el-icon-plus"
                type="primary"
                size="mini"
              >新增</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20" v-if="isContent">
            <el-form-item class="clear-space" label="参数内容:">
              <el-input
                class="text-width"
                type="textarea"
                :rows="10"
                size="mini"
                v-model="paramForm.paramemterStrut"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 参数表格 -->
      <el-row v-if="isParamTable">
        <el-col :span="24">
          <el-table
            :data="tableParamData"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
            default-expand-all
            size="mini"
            :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column prop="serviceParameterIdentifier" label="参数标识:" align="center"></el-table-column>
            <el-table-column prop="parameterDataTypeDesc" label="参数类型:" align="center"></el-table-column>
            <el-table-column prop="serviceParameterName" label="参数名称:" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="190" align="center">
              <template slot-scope="scope">
                <el-button
                  @click="handleOpenParamQuery(scope.row)"
                  icon="el-icon-view"
                  type="text"
                  size="small"
                  class="clear-space"
                >查询</el-button>
                <el-button
                  v-if="cis_service_parameter_list_edit"
                  @click="handleOpenEditParam(scope.row)"
                  icon="el-icon-edit"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  v-if="cis_service_parameter_list_del"
                  @click="handleRowDelParam(scope.row)"
                  icon="el-icon-delete"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogParamFormVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑参数明细弹出框 -->
    <el-dialog :title="editParamTitle" :visible.sync="dialogEditParamFormVisible">
      <el-form
        :model="editParamForm"
        ref="editParamForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="参数名:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.serviceParameterName"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="参数说明:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.serviceParameterInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="参数正则类型:">
              <el-select
                v-model="editParamForm.parameterRegularType"
                :disabled="dialogQueryParamFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editParamForm.typeValue"
                  :key="item.parameterRegularType"
                  :label="item.label"
                  :value="item.parameterRegularType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="自定义正则:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.customRegular"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="最小长度:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.minLength"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="最大长度:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.maxLength"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="是否允许为空:">
              <el-select
                v-model="editParamForm.isEmpty"
                :disabled="dialogQueryParamFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editParamForm.isEmptyValue"
                  :key="item.isEmpty"
                  :label="item.label"
                  :value="item.isEmpty"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="默认值:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.defaultValue"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="排序:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.sequence"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="参数标识:" prop="serviceParameterIdentifier">
              <el-input
                class="input-width"
                size="mini"
                v-model="editParamForm.serviceParameterIdentifier"
                placeholder="请输入内容"
                :disabled="dialogQueryParamFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditParamFormVisible = false" size="small">取 消</el-button>
        <el-button
          v-if="isParamQuery"
          type="primary"
          @click="putParamServe('editParamForm')"
          size="small"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from "../../../../../router/router";
import store from "@/store";
import {
  addService,
  delService,
  putService,
  queryService,
  putServiceCheck
} from "@/api/middle/service";
import { addParam, delParam, putParam, queryParam } from "@/api/middle/param";
import { mapGetters } from "vuex";
export default {
  name: "ServiceInterface",
  data() {
    return {
      value: "",
      // 检索内容input
      form: {
        serviceInterfaceId: "",
        // 检索内容select
        serviceInterfaceType: [
          {
            value: "0",
            label: "系统接口"
          },
          {
            value: "1",
            label: "公共接口"
          },
          {
            value: "2",
            label: "业务接口"
          },
          {
            value: "3",
            label: "鉴权（登录）接口"
          }
        ],
        value: "",
        serviceInterfaceStatus: [
          {
            statusValue: "0",
            label: "待审核"
          },
          {
            statusValue: "1",
            label: "审核通过"
          },
          {
            statusValue: "2",
            label: "审核未通过"
          },
          {
            statusValue: "3",
            label: "禁用"
          }
        ],
        statusValue: "",
        serviceInterfaceName: ""
      },
      // 表格内容
      tableData: [],
      isActive: false,
      // 表格加载
      tableLoading: false,
      // 隐藏字段
      hideData: false,
      // 分页
      page: {
        total: undefined, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      // 制定规则
      rules: {
        typeValue: [
          { required: true, message: "请选择接口类型", trigger: "blur" }
        ],
        serviceInterfaceName: [
          { required: true, message: "请输入接口名称", trigger: "blur" }
        ],
        serviceInterfaceInfo: [
          { required: true, message: "请选择接口描述", trigger: "blur" }
        ],
        serviceInterfaceIdentifier: [
          { required: true, message: "请输入接口标识", trigger: "blur" }
        ],
        serviceParameterIdentifier: [
          { required: true, message: "请输入参数标识", trigger: "blur" }
        ]
      },
      // 查询弹出框
      dialogQueryFormVisible: false,
      dialogQueryParamFormVisible: false,
      isQuery: true,
      isParamQuery: true,
      editTitle: "",
      editParamTitle: "",
      // 新建业务接口弹出框
      dialogFormVisible: false,
      // 审核业务接口
      dialogCheckFormVisible: false,
      // 编辑业务接口弹出框
      dialogEditFormVisible: false,
      // 参数明细弹出框
      dialogParamFormVisible: false,
      // 编辑参数明细弹出框
      dialogEditParamFormVisible: false,
      // 请求头
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      // 新增业务接口插入数据
      addForm: {
        serviceInterfaceType: [
          {
            value: "0",
            label: "系统接口"
          },
          {
            value: "1",
            label: "公共接口"
          },
          {
            value: "2",
            label: "业务接口"
          },
          {
            value: "3",
            label: "鉴权（登录）接口"
          }
        ],
        value: "",
        serviceInterfaceName: "",
        serviceInterfaceInfo: "",
        serviceInterfaceIdentifier: ""
      },
      // 编辑业务接口类型信息
      editForm: {
        serviceInterfaceId: "",
        serviceInterfaceType: [
          {
            typeValue: "0",
            label: "系统接口"
          },
          {
            typeValue: "1",
            label: "公共接口"
          },
          {
            typeValue: "2",
            label: "业务接口"
          },
          {
            typeValue: "3",
            label: "鉴权（登录）接口"
          }
        ],
        typeValue: "",
        serviceInterfaceStatus: [
          {
            statusValue: "0",
            label: "待审核"
          },
          {
            statusValue: "1",
            label: "审核通过"
          },
          {
            statusValue: "2",
            label: "审核未通过"
          },
          {
            statusValue: "3",
            label: "禁用"
          }
        ],
        statusValue: "",
        serviceInterfaceName: "",
        serviceInterfaceInfo: "",
        version: ""
      },
      // 审核业务接口信息
      checkForm: {
        serviceInterfaceId: "",
        serviceInterfaceType: [
          {
            typeValue: "0",
            label: "系统接口"
          },
          {
            typeValue: "1",
            label: "公共接口"
          },
          {
            typeValue: "2",
            label: "业务接口"
          },
          {
            typeValue: "3",
            label: "鉴权（登录）接口"
          }
        ],
        typeValue: "",
        serviceInterfaceStatus: [
          {
            statusValue: "0",
            label: "待审核"
          },
          {
            statusValue: "1",
            label: "审核通过"
          },
          {
            statusValue: "2",
            label: "审核未通过"
          },
          {
            statusValue: "3",
            label: "禁用"
          }
        ],
        statusValue: "",
        serviceInterfaceName: "",
        serviceInterfaceInfo: "",
        version: ""
      },
      // 参数明细
      isParamTable: true,
      isContent: true,
      isQuery: true,
      isAdd: true,
      // 新增参数数据
      paramForm: {
        serviceInterfaceId: "",
        typeValue: [
          {
            serviceParameterType: "0",
            label: "入参"
          },
          {
            serviceParameterType: "1",
            label: "出参"
          }
        ],
        serviceParameterType: "入参",
        paramemterStrut: ""
      },
      // 参数表格数据
      tableParamData: [],
      // 编辑参数明细信息
      editParamForm: {
        serviceParameterName: "",
        serviceParameterInfo: "",
        typeValue: [
          {
            parameterRegularType: "",
            label: ""
          }
        ],
        parameterRegularType: "",
        customRegular: "",
        minLength: "",
        maxLength: "",
        isEmptyValue: [
          {
            isEmpty: "0",
            label: "允许"
          },
          {
            isEmpty: "1",
            label: "禁止"
          }
        ],
        isEmpty: "",
        sequence: "",
        serviceParameterIdentifier: "",
        defaultValue: ""
      },
      // 刷新参数明细的参数
      refreshParam: {
        serviceInterfaceId: "",
        serviceParameterType: ""
      },
      // 暂存参数查询的id
      serviceInterfaceId: ""
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_service_interface_info_add = this.permissions[
      "cis_service_interface_info_add"
    ];
    this.cis_service_interface_info_edit = this.permissions[
      "cis_service_interface_info_edit"
    ];
    this.cis_service_interface_info_del = this.permissions[
      "cis_service_interface_info_del"
    ];
    this.cis_service_interface_info_audit = this.permissions[
      "cis_service_interface_info_audit"
    ];
    this.cis_service_interface_info_disable = this.permissions[
      "cis_service_interface_info_disable"
    ];
    // 参数管理
    this.cis_service_parameter_list_add = this.permissions[
      "cis_service_parameter_list_add"
    ];
    this.cis_service_parameter_list_edit = this.permissions[
      "cis_service_parameter_list_edit"
    ];
    this.cis_service_parameter_list_del = this.permissions[
      "cis_service_parameter_list_del"
    ];
    if (this.cis_service_interface_info_add === undefined) {
      this.isActive = true;
    }
  },
  mounted() {
    // 查询业务接口
    this.getService();
  },
  methods: {
    // 检索
    handleSearch() {
      this.tableLoading = true;
      let newForm = JSON.parse(JSON.stringify(this.form));
      delete this.page.total;
      if (newForm.serviceInterfaceId === "") {
        delete newForm.serviceInterfaceId;
      }
      if (newForm.value !== "") {
        let storeValue = newForm.value;
        newForm.serviceInterfaceType = storeValue;
        delete newForm.value;
      } else {
        delete newForm.value;
        delete newForm.serviceInterfaceType;
      }
      if (newForm.statusValue !== "") {
        let storeValueTwo = newForm.statusValue;
        newForm.serviceInterfaceStatus = storeValueTwo;
        delete newForm.statusValue;
      } else {
        delete newForm.statusValue;
        delete newForm.serviceInterfaceStatus;
      }
      if (newForm.serviceInterfaceName === "") {
        delete newForm.serviceInterfaceName;
      }
      let par = { ...newForm, ...this.page };
      queryService(Object.assign(par))
        .then(res => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "检索失败",
            type: "error"
          });
        });
    },
    // 检索重置
    handleReset() {
      this.form.serviceInterfaceId = "";
      this.form.value = "";
      this.form.statusValue = "";
      this.form.serviceInterfaceName = "";
    },
    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getService();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getService();
    },
    // 新增文件上传
    handleAvatarSuccess(res, file) {
      this.addForm.custIcon = res.data.url;
    },
    // 编辑文件上传
    handleEditAvatarSuccess(res, file) {
      this.editForm.custIcon = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 重置新增业务接口表单
    handleResetAddForm() {
      this.addForm = {
        value: "",
        serviceInterfaceName: "",
        serviceInterfaceInfo: "",
        serviceInterfaceIdentifier: ""
      };
    },
    // 新增业务接口
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addService({
            serviceInterfaceType: this.addForm.value,
            serviceInterfaceName: this.addForm.serviceInterfaceName,
            serviceInterfaceInfo: this.addForm.serviceInterfaceInfo,
            serviceInterfaceIdentifier: this.addForm.serviceInterfaceIdentifier
          })
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getService();
              this.handleResetAddForm();
              this.tableLoading = false;
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "添加失败",
                type: "error"
              });
              this.tableLoading = false;
            });
        } else {
          this.getService();
          return false;
        }
      });
    },
    // 删除业务接口
    handleRowDel(row) {
      if (row.serviceInterfaceStatusDesc === "待审核") {
        this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delService(row.serviceInterfaceId).then(res => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.getEditParam();
              this.getService();
              this.tableLoading = false;
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        if (
          row.serviceInterfaceStatusDesc === "审核通过" ||
          row.serviceInterfaceStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.serviceInterfaceStatusDesc === "禁用") {
          this.$message({
            showClose: true,
            message: "已禁用",
            type: "success"
          });
        }
      }
    },
    // 查询
    handleOpenQuery(row) {
      this.isQuery = false;
      this.editTitle = "查询业务接口信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.editForm = row;
    },
    // 编辑业务接口
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑业务接口信息";
      this.dialogQueryFormVisible = false;
      if (row.serviceInterfaceStatusDesc === "待审核") {
        this.dialogEditFormVisible = true;
        this.editForm.serviceInterfaceId = row.serviceInterfaceId;
        this.editForm.typeValue = row.serviceInterfaceType;
        this.editForm.statusValue = row.serviceInterfaceStatus;
        this.editForm.serviceInterfaceName = row.serviceInterfaceName;
        this.editForm.serviceInterfaceInfo = row.serviceInterfaceInfo;
        this.editForm.version = row.version;
      } else {
        if (
          row.serviceInterfaceStatusDesc === "审核通过" ||
          row.serviceInterfaceStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.serviceInterfaceStatusDesc === "禁用") {
          this.$message({
            showClose: true,
            message: "已禁用",
            type: "success"
          });
        }
      }
    },
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putService({
            serviceInterfaceId: this.editForm.serviceInterfaceId,
            serviceInterfaceType: this.editForm.typeValue,
            serviceInterfaceName: this.editForm.serviceInterfaceName,
            serviceInterfaceInfo: this.editForm.serviceInterfaceInfo,
            version: this.editForm.version
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getService();
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "修改失败",
                type: "error"
              });
              this.tableLoading = false;
            });
        } else {
          this.getService();
          return false;
        }
      });
    },
    // 查询表格数据
    getService() {
      this.tableLoading = true;
      queryService(
        Object.assign({
          current: this.page.currentPage,
          size: this.page.pageSize
        })
      )
        .then(res => {
          this.tableData = res.data.data.records;
          this.page.total = res.data.data.total;
          this.tableLoading = false;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "查询失败",
            type: "error"
          });
          this.tableLoading = false;
        });
    },
    // 审核
    handleOpenCheck(row) {
      if (row.serviceInterfaceStatusDesc !== "禁用") {
        this.dialogCheckFormVisible = true;
        this.checkForm.serviceInterfaceId = row.serviceInterfaceId;
        this.checkForm.typeValue = row.serviceInterfaceType;
        this.checkForm.statusValue = row.serviceInterfaceStatus;
        this.checkForm.serviceInterfaceName = row.serviceInterfaceName;
        this.checkForm.serviceInterfaceInfo = row.serviceInterfaceInfo;
      } else {
        this.$message({
          showClose: true,
          message: "已禁用",
          type: "success"
        });
      }
    },
    // 审核通过
    handlecheckYes() {
      this.tableLoading = true;
      putServiceCheck({
        serviceInterfaceId: this.checkForm.serviceInterfaceId,
        serviceInterfaceStatus: 1
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "审核成功",
            type: "success"
          });
          this.dialogCheckFormVisible = false;
          this.tableLoading = false;
          this.getService();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "审核失败",
            type: "error"
          });
          this.tableLoading = false;
        });
    },
    // 审核不通过
    handleCheckNo() {
      this.tableLoading = true;
      putServiceCheck({
        serviceInterfaceId: this.checkForm.serviceInterfaceId,
        serviceInterfaceStatus: 2
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "审核不通过成功",
            type: "success"
          });
          this.dialogCheckFormVisible = false;
          this.tableLoading = false;
          this.getService();
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "审核不通过失败",
            type: "error"
          });
          this.tableLoading = false;
        });
    },
    // 禁用
    handleForbid(row) {
      this.tableLoading = true;
      putServiceCheck({
        serviceInterfaceId: this.checkForm.serviceInterfaceId,
        serviceInterfaceStatus: 3
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "禁用成功",
            type: "success"
          });
          row.prohibitVisible = false;
          this.getService();
          this.tableLoading = false;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "禁用失败",
            type: "error"
          });
          this.tableLoading = false;
        });
    },
    // 参数明细
    // 查询参数
    handlegetParam(row) {
      this.dialogParamFormVisible = true;
      this.paramForm.serviceInterfaceId = row.serviceInterfaceId;

      if (this.paramForm.serviceParameterType === "入参") {
        this.paramForm.serviceParameterType = "0";
      }
      if (row.serviceInterfaceId !== undefined) {
        this.serviceInterfaceId = row.serviceInterfaceId;
      }
      queryParam(
        Object.assign({
          serviceInterfaceId: this.serviceInterfaceId,
          serviceParameterType: this.paramForm.serviceParameterType
        })
      )
        .then(res => {
          // 判断切换展示
          if (res.data.data.length === 0) {
            this.isContent = true;
            this.isAdd = true;
            this.isParamTable = false;
          } else {
            this.isContent = false;
            this.isAdd = false;
            this.isParamTable = true;
          }
          this.tableParamData = res.data.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "查询失败",
            type: "error"
          });
        });
    },
    // 新增参数
    handleAddParam() {
      // 刷新的参数
      this.refreshParam.serviceInterfaceId = this.serviceInterfaceId;
      this.refreshParam.serviceParameterType = this.paramForm.serviceParameterType;
      addParam({
        serviceInterfaceId: this.serviceInterfaceId,
        serviceParameterType: this.paramForm.serviceParameterType,
        paramemterStrut: this.paramForm.paramemterStrut
      })
        .then(res => {
          this.dialogFormVisible = false;
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          this.getEditParam();
          this.paramForm.serviceParameterType = "0";
          this.paramForm.paramemterStrut = "";
        })
        .catch(err => {
          if (this.paramForm.serviceParameterType === "0") {
            this.paramForm.serviceParameterType = "0";
          } else if (this.paramForm.serviceParameterType === "1") {
            this.paramForm.serviceParameterType = "1";
          }
          this.paramForm.paramemterStrut = "";
          this.isContent = true;
          this.isAdd = true;
          this.isParamTable = false;
        });
    },
    // 删除参数
    handleRowDelParam(row) {
      let serviceParameterId = row.id;
      // 刷新的参数
      this.refreshParam.serviceInterfaceId = row.serviceInterfaceId;
      this.refreshParam.serviceParameterType = row.serviceParameterType;
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delParam(serviceParameterId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            queryParam(
              Object.assign({
                serviceInterfaceId: this.refreshParam.serviceInterfaceId,
                serviceParameterType: this.refreshParam.serviceParameterType
              })
            )
              .then(res => {
                // 判断切换展示
                if (res.data.data.length === 0) {
                  this.isContent = true;
                  this.isAdd = true;
                  this.isParamTable = false;
                  this.paramForm.paramemterStrut = "";
                } else {
                  this.isContent = false;
                  this.isAdd = false;
                  this.isParamTable = true;
                  this.tableParamData = res.data.data;
                }
              })
              .catch(err => {
                this.$message({
                  showClose: true,
                  message: "查询失败",
                  type: "error"
                });
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 查询
    handleOpenParamQuery(row) {
      this.isParamQuery = false;
      this.editParamTitle = "查询参数明细信息";
      this.dialogQueryParamFormVisible = true;
      this.dialogEditParamFormVisible = true;
      this.editForm = row;
    },
    // 编辑参数明细
    handleOpenEditParam(row) {
      this.isParamQuery = true;
      this.editParamTitle = "编辑参数明细信息";
      this.dialogQueryParamFormVisible = false;
      this.dialogEditParamFormVisible = true;
      // 传递的参数
      this.editParamForm.serviceParameterName = row.serviceParameterName;
      this.editParamForm.serviceParameterInfo = row.serviceParameterInfo;
      this.editParamForm.parameterRegularType = row.parameterRegularType;
      this.editParamForm.customRegular = row.customRegular;
      this.editParamForm.minLength = row.minLength;
      this.editParamForm.maxLength = row.maxLength;
      this.editParamForm.isEmpty = row.isEmpty;
      this.editParamForm.sequence = row.sequence;
      this.editParamForm.defaultValue = row.defaultValue;
      this.editParamForm.serviceParameterIdentifier =
        row.serviceParameterIdentifier;
      this.editParamForm.serviceInterfaceId = row.serviceInterfaceId;
      this.editParamForm.version = row.version;
      this.editParamForm.serviceParameterId = row.id;
      // 刷新的参数
      this.refreshParam.serviceInterfaceId = row.serviceInterfaceId;
      this.refreshParam.serviceParameterType = row.serviceParameterType;
    },
    putParamServe(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          putParam(this.editParamForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditParamFormVisible = false;
              this.getEditParam();
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "修改失败",
                type: "error"
              });
            });
        } else {
          this.getEditParam();
          return false;
        }
      });
    },
    // 刷新编辑的参数
    getEditParam() {
      queryParam(
        Object.assign({
          serviceInterfaceId: this.refreshParam.serviceInterfaceId,
          serviceParameterType: this.refreshParam.serviceParameterType
        })
      )
        .then(res => {
          // 判断切换展示
          this.isContent = false;
          this.isAdd = false;
          this.isParamTable = true;
          this.tableParamData = res.data.data;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "查询失败",
            type: "error"
          });
        });
    },
    // 跳转到节点管理
    handleJumpNode(row) {
      this.$router.push({
      path: "/interfaceLogic/index",
        query: {
          id: row.serviceInterfaceId
        }
      });
    },
    // 跳转到参数对照页面
    jumpParamCompare(row) {
      this.$router.push({
        path: "/paramCompare/index",
        query: {
          id: row.serviceInterfaceId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#access-provider {
  width: 98.3%;
  padding-left: 20px;
  margin-left: 10px;
  margin-bottom: 30px;
  background-color: #fff;
  .el-row-space {
    padding-top: 20px;
    margin-bottom: 20px;
  }
  .clear-space {
    margin: 0;
    padding: 0;
  }
  .padding-space {
    padding: 10px 15px;
  }
  .input-width {
    width: 192px;
  }
  .text-width {
    width: 420px;
  }
  .top-space {
    margin-top: 5px;
  }
  .left-space {
    margin-left: 10px;
  }
  .avatar-uploader {
    width: 178px;
    height: 178px;
    border: 1px solid #d9d9d9;
    border-style: dashed;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .table-top {
    margin-top: 45px;
  }
}
// popover弹出框样式调整
.el-icon-warning:before {
  color: #ffbf31;
}
.popover-content {
  font-size: 12px;
}
.cancel-style {
  padding: 5px 10px;
  color: #d9d9d9;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
}
.cancel-style:hover {
  color: #239bf3;
  border: 1px solid #239bf3;
}
.button-style {
  padding: 5px 10px;
  border-radius: 6px;
}
.page {
  margin-left: 48%;
  margin-top: 30px;
}
</style>