<template>
  <div id="access-provider">
    <!-- 检索 -->
    <el-form class="el-row-space" :model="form" label-width="100px" label-position="left">
      <el-row>
        <el-col :span="7" v-if="isQuan">
          <el-form-item class="clear-space" label="接入商名称:">
            <el-input
              class="input-width"
              size="small"
              v-model="form.custName"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <div v-if="isQuan">
          <el-col :span="7" v-if="hideData">
            <el-form-item class="clear-space" label="接入商类型:">
              <el-input
                class="input-width"
                size="small"
                v-model="form.custType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </div>
        <el-col :span="7" v-if="isQuan">
          <el-form-item class="clear-space" label="终端名称:">
            <el-input
              class="input-width"
              size="small"
              v-model="form.terminalName"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" v-if="isQuan">
          <el-form-item class="clear-space" label="终端类型:">
            <el-select
              class="input-width"
              v-model="form.terminalType"
              placeholder="请选择"
              size="small"
              disabled
            >
              <el-option
                v-for="item in form.value"
                :key="item.terminalType"
                :label="item.label"
                :value="item.terminalType"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="业务接口编号:">
            <el-input
              class="input-width"
              size="small"
              v-model="form.serviceInterfaceId"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="业务接口名称:">
            <el-input
              class="input-width"
              size="small"
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

    <!-- 业务权限入驻 -->
    <div v-if="isQuan">
      <el-row class="el-row-space" v-if="cis_terminal_authority_list_add">
        <el-col :span="24">
          <el-button
            class="padding-space"
            icon="el-icon-plus"
            type="primary"
            @click="dialogFormVisible = true;"
            size="small"
          >权限申请</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 新增业务权限入驻弹出框 -->
    <el-dialog title="新增业务权限" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="110px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="授权类型:" prop="terminalAuthorityType">
              <el-select
                v-model="addForm.terminalAuthorityType"
                disabled
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.value"
                  :key="item.terminalAuthorityType"
                  :label="item.label"
                  :value="item.terminalAuthorityType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="申请原因:" prop="applicationReason">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.applicationReason"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="接入商名称:" prop="custId">
              <el-select v-model="addForm.custId" disabled placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.custIdValue"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="终端名称:" prop="terminalId">
              <el-select v-model="addForm.terminalId" disabled placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.terminalIdValue"
                  :key="item.terminalId"
                  :label="item.terminalName"
                  :value="item.terminalId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务接口名称:" class="clear-space" prop="serviceInterfaceId">
              <el-select v-model="addForm.serviceInterfaceId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.idValue"
                  :key="item.serviceInterfaceId"
                  :label="item.serviceInterfaceName"
                  :value="item.serviceInterfaceId"
                ></el-option>
              </el-select>
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
      <el-table-column
        v-if="hideData"
        prop="terminalAuthorityId"
        label="授权编号"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="hideData"
        prop="terminalAuthorityId"
        label="授权编号"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column v-if="hideData" prop="custId" label="客户编号" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="serviceInterfaceId" label="业务接口编号" align="center"></el-table-column>
      <el-table-column prop="custName" label="客户名称" align="center"></el-table-column>
      <el-table-column prop="terminalName" label="终端名称" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceName" label="业务接口名称" align="center"></el-table-column>
      <el-table-column prop="serviceInterfaceInfo" label="业务接口说明" align="center"></el-table-column>
      <el-table-column prop="applicationReason" label="申请原因说明" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="auditStatus" label="审核状态" align="center"></el-table-column>
      <el-table-column prop="auditStatusDesc" label="审核状态" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="terminalAuthorityStatus" label="授权状态" align="center"></el-table-column>
      <el-table-column prop="terminalAuthorityStatusDesc" label="授权状态" align="center"></el-table-column>
      <el-table-column label="操作" width="215" align="center" v-if="isQuan">
        <template slot-scope="scope">
          <el-button
            @click="handleOpenQuery(scope.row)"
            icon="el-icon-view"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >查询</el-button>
          <el-button
            v-if="cis_terminal_authority_list_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_terminal_authority_list_del"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >删除</el-button>
          <el-button
            v-if="cis_terminal_authority_list_audit"
            @click="handleOpenCheck(scope.row)"
            icon="el-icon-document-checked"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >审核</el-button>
          <!-- 启用操作 -->
          <el-popover placement="top" width="190" v-model="scope.row.prohibitVisible">
            <p>
              <i class="el-icon-warning"></i> &nbsp;
              <span class="popover-content">该行为将使业务权限被启用，是否继续？</span>
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
                @click="handleEnable(scope.row)"
              >启用</el-button>
            </div>
            <el-button
              v-if="cis_terminal_authority_list_enable"
              icon="el-icon-video-play"
              slot="reference"
              type="text"
              size="small"
              class="clear-space"
              style="padding-right:7px;"
            >启用</el-button>
          </el-popover>
          <!-- 禁用操作 -->
          <el-popover placement="top" width="190" v-model="scope.row.prohibitVisiblee">
            <p>
              <i class="el-icon-warning"></i> &nbsp;
              <span class="popover-content">该行为将使业务权限被禁用，是否继续？</span>
            </p>
            <div style="text-align: right; margin: 0">
              <el-button
                type="text"
                class="cancel-style"
                size="mini"
                @click="scope.row.prohibitVisiblee = false"
              >取消</el-button>
              <el-button
                type="primary"
                class="button-style"
                size="mini"
                @click="handleForbid(scope.row)"
              >禁用</el-button>
            </div>
            <el-button
              v-if="cis_terminal_authority_list_disable"
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
    <!-- 编辑业务权限弹出框 -->
    <el-dialog :title="editTitle" :visible.sync="dialogEditFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="110px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="授权类型:" prop="terminalAuthorityType">
              <el-select
                class="input-width"
                v-model="editForm.terminalAuthorityType"
                disabled
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.value"
                  :key="item.terminalAuthorityType"
                  :label="item.label"
                  :value="item.terminalAuthorityType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="申请原因:" prop="applicationReason">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.applicationReason"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="接入商编号:" prop="custId">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.custId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="终端编号:" prop="terminalId">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.terminalId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务接口名称:" class="clear-space" prop="serviceInterfaceId">
              <el-select
                v-model="editForm.serviceInterfaceId"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
                class="input-width"
              >
                <el-option
                  v-for="item in editForm.idValue"
                  :key="item.serviceInterfaceId"
                  :label="item.serviceInterfaceName"
                  :value="item.serviceInterfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="终端授权编号:" class="clear-space">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.terminalAuthorityId"
                placeholder="请输入内容"
                disabled
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
    <!-- 审核业务权限弹出框 -->
    <el-dialog title="审核业务权限信息" :visible.sync="dialogCheckFormVisible">
      <el-form
        :model="checkForm"
        ref="checkForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="授权类型:" prop="terminalAuthorityType">
              <el-select
                v-model="checkForm.terminalAuthorityType"
                disabled
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in checkForm.value"
                  :key="item.terminalAuthorityType"
                  :label="item.label"
                  :value="item.terminalAuthorityType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="申请原因:">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="checkForm.applicationReason"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="接入商编号:" prop="custId">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.custId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="终端编号:" prop="terminalId">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.terminalId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="业务接口名称:" class="clear-space">
              <el-select
                v-model="checkForm.serviceInterfaceId"
                disabled
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in checkForm.idValue"
                  :key="item.serviceInterfaceId"
                  :label="item.serviceInterfaceName"
                  :value="item.serviceInterfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="终端授权编号:" class="clear-space">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.terminalAuthorityId"
                placeholder="请输入内容"
                disabled
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
import router from "../../../../../router/router";
import store from "@/store";
import {
  addPermission,
  delPermission,
  putPermission,
  queryPermission,
  putPermissionCheck,
  putPermissionForbid
} from "@/api/middle/permissions";
import { queryTerminal } from "@/api/middle/terminal";
import { queryService } from "@/api/middle/service";
import { mapGetters } from "vuex";
export default {
  name: "Permissions",
  data() {
    return {
      isQuan: true,
      // 检索内容input
      form: {
        custName: "",
        custType: 0,
        terminalName: "",
        // 检索内容select
        value: [
          {
            terminalType: "0",
            label: "自营"
          },
          {
            terminalType: "1",
            label: "第三方"
          }
        ],
        terminalType: "",
        serviceInterfaceId: "",
        serviceInterfaceName: "",
        custId: "",
        terminalId: ""
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
        applicationReason: [
          { required: true, message: "请输入申请原因", trigger: "blur" }
        ],
        serviceInterfaceId: [
          { required: true, message: "请选择业务接口编号", trigger: "change" }
        ]
      },
      // 查询弹出框
      dialogQueryFormVisible: false,
      isQuery: true,
      editTitle: "",
      // 新增业务权限弹出框
      dialogFormVisible: false,
      // 审核业务权限
      dialogCheckFormVisible: false,
      // 请求头
      headers: {
        Authorization: "Bearer " + store.getters.access_token
      },
      // 编辑业务权限弹出框
      dialogEditFormVisible: false,
      // 新增业务权限插入数据
      addForm: {
        custId: "",
        custIdValue: [],
        terminalId: "",
        terminalIdValue: [],
        applicationReason: "",
        value: [
          {
            terminalAuthorityType: "2",
            label: "自主"
          }
        ],
        terminalAuthorityType: "自主",
        idValue: [
          {
            serviceInterfaceId: "",
            serviceInterfaceName: ""
          }
        ],
        serviceInterfaceId: ""
      },
      // 编辑业务权限信息
      editForm: {
        custId: "",
        terminalId: "",
        applicationReason: "",
        value: [
          {
            terminalAuthorityType: "2",
            label: "自主"
          }
        ],
        terminalAuthorityType: "自主",
        idValue: [
          {
            serviceInterfaceId: "",
            serviceInterfaceName: ""
          }
        ],
        serviceInterfaceId: "",
        terminalAuthorityId: "",
        terminalAuthorityStatus: "",
        version: ""
      },
      // 审核业务权限信息
      checkForm: {
        custId: "",
        terminalId: "",
        applicationReason: "",
        value: [
          {
            terminalAuthorityType: "2",
            label: "自主"
          }
        ],
        terminalAuthorityType: "自主",
        idValue: [
          {
            serviceInterfaceId: "",
            serviceInterfaceName: ""
          }
        ],
        serviceInterfaceId: "",
        serviceInterId:"",
        terminalAuthorityId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_terminal_authority_list_add = this.permissions[
      "cis_terminal_authority_list_add"
    ];
    this.cis_terminal_authority_list_edit = this.permissions[
      "cis_terminal_authority_list_edit"
    ];
    this.cis_terminal_authority_list_del = this.permissions[
      "cis_terminal_authority_list_del"
    ];
    this.cis_terminal_authority_list_disable = this.permissions[
      "cis_terminal_authority_list_disable"
    ];
    this.cis_terminal_authority_list_audit = this.permissions[
      "cis_terminal_authority_list_audit"
    ];
    this.cis_terminal_authority_list_enable = this.permissions[
      "cis_terminal_authority_list_enable"
    ];

    if (this.cis_terminal_authority_list_add === undefined) {
      this.isActive = true;
    }
  },
  mounted() {
    // 查询业务权限
    this.getPermission();
    this.getId();
  },
  methods: {
    // 检索
    handleSearch(formName) {
      this.tableLoading = true;
      let newForm = JSON.parse(JSON.stringify(this.form));
      delete this.page.total;
      delete newForm.value;
      delete newForm.custName;
      delete newForm.terminalName;
      if (newForm.serviceInterfaceId === "") {
        delete newForm.serviceInterfaceId;
      }
      if (newForm.serviceInterfaceName === "") {
        delete newForm.serviceInterfaceName;
      }
      if (newForm.terminalType !== "") {
        delete newForm.value;
      } else {
        delete newForm.value;
        delete newForm.terminalType;
      }
      let par = { ...newForm, ...this.page };
      queryPermission(par)
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
      this.form.serviceInterfaceName = "";
    },

    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getPermission();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getPermission();
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
    // 重置新增业务权限表单
    handleResetAddForm() {
      this.addForm = {
        applicationReason: ""
      };
    },
    // 获取业务接口编号
    getId() {
      this.tableLoading = true;
      queryService(
        Object.assign({
          current: this.page.currentPage,
          size: 9000000000
        })
      )
        .then(res => {
          let array = res.data.data.records;
          this.addForm.idValue = array;
          this.editForm.idValue = array;
          this.checkForm.idValue = array;
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
    // 新增业务权限
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addPermission({
            terminalAuthorityType: 2,
            applicationReason: this.addForm.applicationReason,
            custId: this.addForm.custId,
            terminalId: this.addForm.terminalId,
            serviceInterfaceId: this.addForm.serviceInterfaceId
          })
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.getPermission();
              this.handleResetAddForm();
              this.getId();
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
          this.getPermission();
          return false;
        }
      });
    },
    // 删除业务权限
    handleRowDel(row) {
      if (row.auditStatusDesc === "待审核") {
        let terminalAuthorityId = row.terminalAuthorityId;
        this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.tableLoading = true;
            delPermission(terminalAuthorityId).then(res => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.getPermission();
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
          row.auditStatusDesc === "审核通过" ||
          row.auditStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.auditStatusDesc === "禁用") {
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
      this.editTitle = "查询业务权限信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.editForm = row;
    },
    // 编辑业务权限
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑业务权限信息";
      this.dialogQueryFormVisible = false;
      if (row.auditStatusDesc === "待审核") {
        this.dialogEditFormVisible = true;
        this.editForm.applicationReason = row.applicationReason;
        this.editForm.custId = row.custId;
        this.editForm.terminalId = row.terminalId;
        this.editForm.terminalAuthorityId = row.terminalAuthorityId;
        this.editForm.terminalAuthorityStatus = row.terminalAuthorityStatus;
        this.editForm.version = row.version;
      } else {
        if (
          row.auditStatusDesc === "审核通过" ||
          row.auditStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.auditStatusDesc === "禁用") {
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
          putPermission({
            terminalAuthorityType: 3,
            applicationReason: this.editForm.applicationReason,
            custId: this.editForm.custId,
            terminalId: this.editForm.terminalId,
            serviceInterfaceId: this.editForm.serviceInterfaceId,
            terminalAuthorityStatus: this.editForm.terminalAuthorityStatus,
            version: this.editForm.version,
            terminalAuthorityId: this.editForm.terminalAuthorityId
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getPermission();
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
          this.getPermission();
          return false;
        }
      });
    },
    // 查询表格数据
    getPermission() {
      if (this.$route.query.custId === undefined) {
        this.tableLoading = true;
        queryPermission(
          Object.assign({
            current: this.page.currentPage,
            size: this.page.pageSize
          })
        )
          .then(res => {
            this.tableData = res.data.data.records;
            this.page.total = res.data.data.total;
            this.tableLoading = false;
            this.isQuan = false;
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "error"
            });
            this.tableLoading = false;
          });
      } else {
        this.tableLoading = true;
        queryTerminal({ custId: this.$route.query.custId }).then(res => {
          this.form.custName = res.data.data.records[0].custName;
          this.form.terminalName = res.data.data.records[0].terminalName;
          this.form.terminalType = res.data.data.records[0].terminalType;
          this.addForm.custId = res.data.data.records[0].custId;
          this.addForm.custIdValue = res.data.data.records;
          this.addForm.terminalId = res.data.data.records[0].terminalId;
          this.addForm.terminalIdValue = res.data.data.records;
          this.form.terminalId = res.data.data.records[0].terminalId;
          this.form.custId = res.data.data.records[0].custId;
          queryPermission(
            Object.assign({
              current: this.page.currentPage,
              size: this.page.pageSize,
              custType: 0,
              custId: res.data.data.records[0].custId,
              terminalId: res.data.data.records[0].terminalId,
              terminalType: res.data.data.records[0].terminalType
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
        });
      }
    },

    // 审核
    handleOpenCheck(row) {
      if (row.auditStatusDesc !== "禁用") {
        this.dialogCheckFormVisible = true;
        this.checkForm.applicationReason = row.applicationReason;
        this.checkForm.custId = row.custId;
        this.checkForm.serviceInterfaceId = row.serviceInterfaceName;
        this.checkForm.serviceInterId = row.serviceInterfaceId;
        this.checkForm.terminalId = row.terminalId;
        this.checkForm.terminalAuthorityId = row.terminalAuthorityId;
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
          putPermissionCheck({
            terminalAuthorityId: this.checkForm.terminalAuthorityId,
            auditStatus: 1,
            serviceInterfaceId: this.checkForm.serviceInterId
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "审核成功",
                type: "success"
              });
              this.dialogCheckFormVisible = false;
              this.tableLoading = false;
              this.getPermission();
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
          this.getPermission();
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
          putPermissionCheck({
            terminalAuthorityId: this.checkForm.terminalAuthorityId,
            serviceInterfaceId: this.checkForm.serviceInterId,
            auditStatus: 2
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "审核成功",
                type: "success"
              });
              this.dialogCheckFormVisible = false;
              this.tableLoading = false;
              this.getPermission();
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
          this.getPermission();
          return false;
        }
      });
    },
    // 禁用
    handleForbid(row) {
      this.tableLoading = true;
      putPermissionForbid({
        terminalAuthorityId: row.terminalAuthorityId,
        serviceInterfaceId: row.serviceInterfaceId,
        terminalAuthorityStatus: 1
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "禁用成功",
            type: "success"
          });
          row.prohibitVisiblee = false;
          this.getPermission();
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
    // 启用
    handleEnable(row) {
      this.tableLoading = true;
      putPermissionForbid({
        terminalAuthorityId: row.terminalAuthorityId,
        serviceInterfaceId: row.serviceInterfaceId,
        terminalAuthorityStatus: 0
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "启用成功",
            type: "success"
          });
          row.prohibitVisible = false;
          this.getPermission();
          this.tableLoading = false;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "启用失败",
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