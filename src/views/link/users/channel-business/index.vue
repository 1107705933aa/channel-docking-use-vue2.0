<template>
  <div id="access-provider">
    <!-- 检索 -->
    <el-form class="el-row-space" :model="form" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="渠道商名称:">
            <el-input class="input-width" size="small" v-model="form.custName" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="hideData">
          <el-form-item class="clear-space" label="渠道商类型:">
            <el-input
              class="input-width"
              size="small"
              v-model="form.custType"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="渠道商状态:">
            <el-select v-model="form.value" placeholder="请选择" size="small">
              <el-option
                v-for="item in form.custStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space">
            <el-button
              class="padding-space"
              icon="el-icon-search"
              type="primary"
              @click="handleSearch()"
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

    <!-- 渠道商入驻 -->
    <el-row class="el-row-space" v-if="sys_channel_info_add">
      <el-col :span="24">
        <el-button
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          @click="dialogAddFormVisible = true"
          size="small"
        >渠道商入驻</el-button>
      </el-col>
    </el-row>
    <!-- 新增渠道商入驻弹出框 -->
    <el-dialog title="新增渠道商" :visible.sync="dialogAddFormVisible">
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
            <el-form-item label="渠道商名称:" prop="custName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.custName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="渠道商类型:" prop="custType">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.custType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 文件上传 -->
          <el-col :span="11">
            <el-form-item label="头像:" prop="custIcon">
              <el-upload
                :headers="headers"
                class="avatar-uploader"
                action="/admin/sys-file/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="addForm.custIcon" :src="addForm.custIcon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="客户简介:" prop="custInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="addForm.custInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="hideData">
          <el-col :span="11">
            <el-form-item label="渠道商负责人:" class="clear-space">
              <el-select v-model="addForm.personLiableIdValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.personLiableId"
                  :key="item.personLiableIdValue"
                  :label="item.label"
                  :value="item.personLiableIdValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="平台专管员:" class="clear-space">
              <el-select v-model="addForm.manageIdValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.manageId"
                  :key="item.manageIdValue"
                  :label="item.label"
                  :value="item.manageIdValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false" size="small">取 消</el-button>
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
      <el-table-column v-if="hideData" prop="custId" label="渠道商Id" width="180" align="center"></el-table-column>
      <el-table-column prop="custName" label="渠道商名称" width="180" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="custType" label="渠道商类型" align="center"></el-table-column>
      <el-table-column prop="custTypeDesc" label="渠道商类型" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="custStatus" label="渠道商状态" align="center"></el-table-column>
      <el-table-column prop="custStatusDesc" label="渠道商状态" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="personLiableId" label="渠道商负责人Id" align="center"></el-table-column>
      <el-table-column prop="personLiableDesc" label="渠道商负责人" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="manageId" label="平台专管员Id" align="center"></el-table-column>
      <el-table-column prop="manageDesc" label="平台专管员" align="center"></el-table-column>
      <el-table-column prop="createTime" label="入驻时间" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="version" label="版本号" align="center"></el-table-column>
      <el-table-column label="操作" width="245" align="center">
        <template slot-scope="scope">
          <el-button
            @click="handleJumpChannel(scope.row)"
            icon="el-icon-position"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >接口管理</el-button>
          <el-button
            @click="handleOpenQuery(scope.row)"
            icon="el-icon-view"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >查询</el-button>
          <el-button
            v-if="sys_channel_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="sys_channel_info_del"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >删除</el-button>
          <el-button
            v-if="sys_channel_info_audit"
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
              <span class="popover-content">该行为将使渠道商被禁用，是否继续？</span>
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
              v-if="sys_channel_info_disable"
              icon="el-icon-remove-outline"
              slot="reference"
              type="text"
              size="small"
              class="clear-space"
            >禁用</el-button>
          </el-popover>
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
    <!-- 编辑渠道商弹出框 -->
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
          <el-col :span="11" v-if="hideData">
            <el-form-item label="渠道商Id:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.custId"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="渠道商名称:" prop="custName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.custName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="渠道商类型:" prop="custType">
              <el-input class="input-width" size="mini" value="渠道商" placeholder="请输入内容" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item label="渠道商类型:" prop="custType">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.custType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 编辑文件上传 -->
          <el-col :span="11">
            <el-form-item label="头像:" prop="custIcon">
              <el-upload
                :headers="headers"
                class="avatar-uploader"
                action="/admin/sys-file/upload"
                :show-file-list="false"
                :on-success="handleEditAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :disabled="dialogQueryFormVisible"
              >
                <img v-if="editForm.custIcon" :src="editForm.custIcon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="客户简介:" prop="custInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="editForm.custInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="top-space" v-if="hideData">
          <el-col :span="11">
            <el-form-item label="渠道商负责人:" class="clear-space">
              <el-select
                v-model="editForm.personLiableIdValue"
                placeholder="请选择"
                size="mini"
                :disabled="dialogQueryFormVisible"
              >
                <el-option
                  v-for="item in editForm.personLiableId"
                  :key="item.personLiableIdValue"
                  :label="item.label"
                  :value="item.personLiableIdValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="平台专管员:" class="clear-space">
              <el-select v-model="editForm.manageIdValue" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in editForm.manageId"
                  :key="item.manageIdValue"
                  :label="item.label"
                  :value="item.manageIdValue"
                  :disabled="dialogQueryFormVisible"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item label="版本号:">
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
    <!-- 审核渠道商弹出框 -->
    <el-dialog title="审核渠道商信息" :visible.sync="dialogCheckFormVisible">
      <el-form
        :model="checkForm"
        ref="checkForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="110px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="渠道商Id:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.custId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="clear-space" label="渠道商名称:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.custName"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="渠道商类型:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.custType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 文件上传 -->
          <el-col :span="11">
            <el-form-item class="clear-space" label="头像:">
              <el-upload
                :headers="headers"
                class="avatar-uploader"
                action="/admin/sys-file/upload"
                :show-file-list="false"
                :on-success="handleEditAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                disabled
              >
                <img v-if="checkForm.custIcon" :src="checkForm.custIcon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="客户简介:">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="checkForm.custInfo"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="top-space">
          <el-col :span="11">
            <el-form-item label="接入商负责人:" class="clear-space" prop="personLiableId">
              <el-select v-model="checkForm.personLiableId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in checkForm.personLiableV"
                  :key="item.personLiableId"
                  :label="item.personLiableIdValue"
                  :value="item.personLiableId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="平台专管员:" class="clear-space" prop="manageId">
              <el-select v-model="checkForm.manageId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in checkForm.manageV"
                  :key="item.manageId"
                  :label="item.manageIdValue"
                  :value="item.manageId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="版本号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.version"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCheckFormVisible = false" size="small">取 消</el-button>
        <el-button @click="handleCheckNo('checkForm')" type="primary" size="small">不通过</el-button>
        <el-button @click="handlecheckYes('checkForm')" type="primary" size="small">通 过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from "../../../../router/router";
import store from "@/store";
import {
  addProvider,
  delProvider,
  putProvider,
  queryProvider,
  putProviderCheck,
  queryPersonInfo
} from "@/api/middle/user";
import { mapGetters } from "vuex";
export default {
  name: "AccessProvider",
  data() {
    return {
      value: "",
      // 检索内容input
      form: {
        custName: "",
        custType: 1,
        // 检索内容select
        custStatus: [
          {
            value: "0",
            label: "待审核"
          },
          {
            value: "1",
            label: "审核通过"
          },
          {
            value: "2",
            label: "审核未通过"
          },
          {
            value: "3",
            label: "禁用"
          }
        ],
        value: ""
      },
      // 表格内容
      tableData: [],
      isActive: false,
      // 表格加载
      tableLoading: false,
      // 隐藏字段
      hideData: false,

      // 隐藏按钮
      hideEdit: true,
      // 分页
      page: {
        total: undefined, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      // 制定规则
      rules: {
        custName: [
          { required: true, message: "请输入渠道商名称", trigger: "blur" }
        ],
        custIcon: [{ required: true, message: "请选择头像", trigger: "blur" }],
        custInfo: [
          { required: true, message: "请输入客户简介", trigger: "blur" }
        ],
        personLiableId: [
          { required: true, message: "请选择接入商负责人", trigger: "change" }
        ],
        manageId: [
          { required: true, message: "请选择平台专管员", trigger: "change" }
        ]
      },
      // 查询弹出框
      isQuery: true,
      dialogQueryFormVisible: false,
      // 新建渠道商弹出框
      dialogAddFormVisible: false,
      // 审核渠道商
      dialogCheckFormVisible: false,
      // 请求头
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      // 编辑渠道商弹出框
      dialogEditFormVisible: false,
      editTitle: "",
      // 新增渠道商插入数据
      addForm: {
        custName: "",
        custType: "渠道商",
        custIcon: "",
        custInfo: "",
        personLiableId: [
          {
            personLiableIdValue: "0",
            label: "负责人1"
          },
          {
            personLiableIdValue: "1",
            label: "负责人2"
          }
        ],
        personLiableIdValue: "",
        manageId: [
          {
            manageIdValue: "0",
            label: "专管员1"
          },
          {
            manageIdValue: "1",
            label: "专管员2"
          }
        ],
        manageIdValue: ""
      },
      // 编辑渠道商类型信息
      editForm: {
        custId: "",
        custName: "",
        custType: "",
        custIcon: "",
        custInfo: "",
        personLiableId: [
          {
            personLiableIdValue: "0",
            label: "负责人1"
          },
          {
            personLiableIdValue: "1",
            label: "负责人2"
          }
        ],
        personLiableIdValue: "",
        manageId: [
          {
            manageIdValue: "0",
            label: "专管员1"
          },
          {
            manageIdValue: "1",
            label: "专管员2"
          }
        ],
        manageIdValue: "",
        version: ""
      },
      // 审核渠道商信息
      checkForm: {
        custId: "",
        custName: "",
        custType: "",
        custIcon: "",
        custInfo: "",
        personLiableV: [
          {
            personLiableId: "",
            personLiableIdValue: ""
          }
        ],
        personLiableId: "",
        manageV: [],
        manageId: "",
        version: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.sys_channel_info_add = this.permissions["sys_channel_info_add"];
    this.sys_channel_info_edit = this.permissions["sys_channel_info_edit"];
    this.sys_channel_info_del = this.permissions["sys_channel_info_del"];
    this.sys_channel_info_audit = this.permissions["sys_channel_info_audit"];
    this.sys_channel_info_disable = this.permissions[
      "sys_channel_info_disable"
    ];
    if (this.sys_channel_info_add === undefined) {
      this.isActive = true;
    }
  },
  mounted() {
    // 查询渠道商
    this.getProvider();
  },
  methods: {
    // 检索
    handleSearch(formName) {
      this.tableLoading = true;
      let newForm = JSON.parse(JSON.stringify(this.form));
      delete this.page.total;
      if (newForm.custName === "") {
        delete newForm.custName;
      }
      if (newForm.value !== "") {
        let storeValue = newForm.value;
        newForm.custStatus = storeValue;
        delete newForm.value;
      } else {
        delete newForm.value;
        delete newForm.custStatus;
      }
      let par = { ...newForm, ...this.page };
      queryProvider(par)
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
      this.form.custName = "";
      this.form.value = "";
    },
    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getProvider();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getProvider();
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
    // 跳转到渠道商接口页面查询
    handleJumpChannel(row) {
      this.$router.push({
        path: "/link/business/channel-interface/index",
        query: { custId: row.custId }
      });
    },
    // 重置新增渠道商表单
    handleResetAddForm() {
      this.addForm = {
        custName: "",
        custType: "渠道商",
        custIcon: "",
        custInfo: ""
      };
    },
    // 新增渠道商
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addProvider({
            custName: this.addForm.custName,
            custType: 1,
            custIcon: this.addForm.custIcon,
            custInfo: this.addForm.custInfo
          })
            .then(res => {
              this.dialogAddFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getProvider();
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
          this.getProvider();
          return false;
        }
      });
    },
    // 删除渠道商
    handleRowDel(row) {
      if (row.custStatusDesc === "待审核") {
        this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.tableLoading = true;
            delProvider(row.custId).then(res => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.getProvider();
              this.tableLoading = false;
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
            this.tableLoading = false;
          });
      } else {
        if (
          row.custStatusDesc === "审核通过" ||
          row.custStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.custStatusDesc === "禁用") {
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
      this.editTitle = "查询渠道商信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.editForm = row;
    },
    // 编辑渠道商
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑渠道商信息";
      this.dialogQueryFormVisible = false;
      if (row.custStatusDesc === "待审核") {
        this.dialogEditFormVisible = true;
        this.editForm = row;
      } else {
        if (
          row.custStatusDesc === "审核通过" ||
          row.custStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.custStatusDesc === "禁用") {
          this.$message({
            showClose: true,
            message: "已禁用",
            type: "success"
          });
        }
      }
    },
    handleEdit(formName) {
      let putData = this.editForm;
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putProvider(putData)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getProvider();
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
          this.getProvider();
          return false;
        }
      });
    },
    // 查询表格数据
    getProvider() {
      this.tableLoading = true;
      queryProvider(
        Object.assign({
          current: this.page.currentPage,
          size: this.page.pageSize,
          custType: 1
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
      if (row.custStatusDesc !== "禁用") {
        this.dialogCheckFormVisible = true;
        this.checkForm.custId = row.custId;
        this.checkForm.custName = row.custName;
        this.checkForm.custIcon = row.custIcon;
        this.checkForm.custInfo = row.custInfo;
        this.checkForm.version = row.version;
        queryPersonInfo().then(res => {
          let array = res.data.data.records;
          for (let i = 0; i < array.length; i++) {
            array[i].manageId = array[i].userId;
            array[i].manageIdValue = array[i].username;
            array[i].personLiableId = array[i].userId;
            array[i].personLiableIdValue = array[i].username;
          }
          this.checkForm.manageV = array;
          this.checkForm.personLiableV = array;
        });
      } else {
        this.$message({
          showClose: true,
          message: "已禁用",
          type: "success"
        });
      }
    },
    // 审核通过
    handlecheckYes(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableLoading = true;
          putProviderCheck({
            custId: this.checkForm.custId,
            custStatus: 1,
            version: this.checkForm.version,
            personLiableId: this.checkForm.personLiableId,
            manageId: this.checkForm.manageId
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "审核成功",
                type: "success"
              });
              this.dialogCheckFormVisible = false;
              this.tableLoading = false;
              this.getProvider();
              this.checkForm.personLiableId = "";
              this.checkForm.manageId = "";
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "审核失败",
                type: "error"
              });
              this.tableLoading = false;
            });
        } else {
          this.getProvider();
          return false;
        }
      });
    },
    // 审核不通过
    handleCheckNo(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.tableLoading = true;
          putProviderCheck({
            custId: this.checkForm.custId,
            custStatus: 2,
            version: this.checkForm.version,
            personLiableId: this.checkForm.personLiableId,
            manageId: this.checkForm.manageId
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "审核成功",
                type: "success"
              });
              this.dialogCheckFormVisible = false;
              this.tableLoading = false;
              this.getProvider();
              this.checkForm.personLiableId = "";
              this.checkForm.manageId = "";
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: "审核失败",
                type: "error"
              });
              this.tableLoading = false;
            });
        } else {
          this.getProvider();
          return false;
        }
      });
    },
    // 禁用
    handleForbid(row) {
      this.tableLoading = true;
      putProviderCheck({
        custId: row.custId,
        custStatus: 3,
        version: row.version
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "禁用成功",
            type: "success"
          });
          row.prohibitVisible = false;
          this.getProvider();
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
    width: 195px;
  }
  .top-space {
    margin-top: 15px;
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