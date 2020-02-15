<template>
  <div id="terminal">
    <!-- 检索 -->
    <el-form class="el-row-space" ref="form" :model="form" label-width="90px" label-position="left">
      <el-row>
        <el-col v-if="hideData" :span="7">
          <el-form-item class="clear-space" label="接入商Id:">
            <el-input class="input-width" size="mini" v-model="form.custId" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="终端名称:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.terminalName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item class="clear-space" label="终端类型:">
            <el-select v-model="form.typeValue" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.terminalType"
                :key="item.typeValue"
                :label="item.label"
                :value="item.typeValue"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="终端状态:">
            <el-select v-model="form.value" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.terminalStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-if="hideData" :span="7">
          <el-form-item class="clear-space" label="接入商类型:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.custType"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item class="clear-space" label="接入商名称:">
            <el-input class="input-width" size="mini" v-model="form.custName" placeholder="请输入内容"></el-input>
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

    <!-- 新增终端 -->
    <el-row class="el-row-space" v-if="cis_terminal_info_add">
      <el-col :span="24">
        <el-button
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增终端</el-button>
      </el-col>
    </el-row>
    <!-- 新增终端弹出框 -->
    <el-dialog title="新增终端" :visible.sync="dialogFormVisible">
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
            <el-form-item label="终端名称:" prop="terminalName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.terminalName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="终端类型:" prop="value">
              <el-select v-model="addForm.value" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.terminalType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="终端简介:" prop="terminalInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.terminalInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="isAccess">
            <el-form-item label="接入商:" prop="custId">
              <el-select v-model="addForm.custId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.custFind"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
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
      :class="{'table-top':isActive}"
      size="mini"
      :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
      v-loading="tableLoading"
    >
      <el-table-column v-if="hideData" prop="custId" label="接入商Id" width="180" align="center"></el-table-column>
      <el-table-column prop="custName" label="接入商名称" width="180" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="terminalId" label="终端Id" align="center"></el-table-column>
      <el-table-column prop="terminalTypeDesc" label="终端类型" align="center"></el-table-column>
      <el-table-column prop="terminalName" label="终端名称" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="terminalStatus" label="终端状态" align="center"></el-table-column>
      <el-table-column prop="terminalStatusDesc" label="终端状态" align="center"></el-table-column>
      <el-table-column prop="terminalInfo" label="终端简介" align="center"></el-table-column>
      <el-table-column label="操作" width="245" align="center">
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
            v-if="cis_terminal_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_terminal_info_del"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >删除</el-button>
          <el-button
            v-if="cis_terminal_info_audit"
            @click="handleOpenCheck(scope.row)"
            icon="el-icon-document-checked"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >审核</el-button>
          <el-button
            @click="handleJumpPermission(scope.row)"
            icon="el-icon-position"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >权限管理</el-button>
          <!-- 禁用操作 -->
          <el-popover placement="top" width="190" v-model="scope.row.prohibitVisible">
            <p>
              <i class="el-icon-warning"></i> &nbsp;
              <span class="popover-content">该行为将使终端被禁用，是否继续？</span>
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
              v-if="cis_terminal_info_disable"
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
    <!-- 编辑终端弹出框 -->
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
            <el-form-item class="clear-space" label="接入商名称:" prop="custId">
              <el-select
                v-model="editForm.custId"
                placeholder="请选择"
                size="mini"
                :disabled="dialogQueryFormVisible"
              >
                <el-option
                  v-for="item in editForm.custFind"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11">
            <el-form-item class="clear-space" label="终端Id:" prop="terminalId">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.terminalId"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="终端名称:" prop="terminalName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.terminalName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="终端类型:" prop="value">
              <el-select
                v-model="editForm.value"
                placeholder="请选择"
                :disabled="dialogQueryFormVisible"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.terminalType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="终端简介:" prop="terminalInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.terminalInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11">
            <el-form-item class="clear-space" label="负责人:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.personLiableId"
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
    <!-- 审核终端弹出框 -->
    <el-dialog title="审核接入终端信息" :visible.sync="dialogcheckFormVisible">
      <el-form :model="checkForm" ref="form" label-width="100px" label-position="left">
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接入商名称:">
              <el-select v-model="checkForm.custId" placeholder="请选择" size="mini" disabled>
                <el-option
                  v-for="item in checkForm.custFind"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11">
            <el-form-item class="clear-space" label="终端Id:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.terminalId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="终端名称:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.terminalName"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="终端类型:">
              <el-select v-model="checkForm.value" placeholder="请选择" size="mini" disabled>
                <el-option
                  v-for="item in checkForm.terminalType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="终端简介:">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="checkForm.terminalInfo"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11">
            <el-form-item class="clear-space" label="负责人:">
              <el-input
                class="input-width"
                size="mini"
                v-model="checkForm.personLiableId"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcheckFormVisible = false" size="small">取 消</el-button>
        <el-button @click="handleCheckNo" type="primary" size="small">不通过</el-button>
        <el-button @click="handlecheckYes" type="primary" size="small">通 过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from "../../../../../router/router";
import {
  addTerminal,
  delTerminal,
  putTerminal,
  queryTerminal,
  putTerminalCheck
} from "@/api/middle/terminal";
import { queryProvider } from "@/api/middle/user";
import { mapGetters } from "vuex";
export default {
  name: "terminal",
  data() {
    return {
      // 检索内容input
      form: {
        custId: "",
        terminalName: "",
        terminalType: [
          {
            typeValue: "0",
            label: "自营"
          },
          {
            typeValue: "1",
            label: "第三方"
          }
        ],
        typeValue: "",
        terminalStatus: [
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
        value: "",
        custType: "接入商",
        custName: ""
      },
      // 表格内容
      tableData: [],
      isActive: false,
      // 分页
      // 表格加载
      tableLoading: false,
      page: {
        total: undefined, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      // 制定规则
      rules: {
        custId: [
          {
            required: true,
            message: "请选择接入商",
            trigger: "blur"
          }
        ],
        terminalName: [
          {
            required: true,
            message: "请输入终端名称",
            trigger: "blur"
          }
        ],
        value: [
          {
            required: true,
            message: "请选择终端类型",
            trigger: "blur"
          }
        ],
        terminalInfo: [
          {
            required: true,
            message: "请输入终端简介",
            trigger: "blur"
          }
        ],
        personLiableId: [
          {
            required: true,
            message: "请输入负责人",
            trigger: "blur"
          }
        ]
      },
      // 隐藏字段
      hideData: false,
      // 禁用是否可见数据
      prohibitVisible: false,
      // 查询弹出框
      dialogQueryFormVisible: false,
      isQuery: true,
      editTitle: "",
      // 新建终端弹出框
      dialogFormVisible: false,
      // 编辑终端弹出框
      dialogEditFormVisible: false,
      // 审核终端
      dialogcheckFormVisible: false,
      // 新建终端插入数据
      addForm: {
        custId: "",
        custFind: [
          {
            custId: "",
            custName: ""
          }
        ],
        terminalName: "",
        terminalType: [
          {
            value: "0",
            label: "自营"
          },
          {
            value: "1",
            label: "第三方"
          }
        ],
        value: "",
        terminalInfo: ""
      },
      // 编辑接入终端信息
      editForm: {
        custId: "",
        custFind: [
          {
            custId: "",
            custName: ""
          }
        ],
        terminalId: "",
        terminalName: "",
        terminalType: [
          {
            value: "0",
            label: "自营"
          },
          {
            value: "1",
            label: "第三方"
          }
        ],
        value: "",
        terminalInfo: "",
        personLiableId: ""
      },
      // 审核终端信息
      checkForm: {
        custId: "",
        custFind: [
          {
            custId: "",
            custName: ""
          }
        ],
        terminalId: "",
        terminalName: "",
        terminalType: [
          {
            value: "0",
            label: "自营"
          },
          {
            value: "1",
            label: "第三方"
          }
        ],
        value: "",
        terminalInfo: "",
        personLiableId: ""
      },
      // 是否编辑接入商
      isAccess: true
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_terminal_info_add = this.permissions["cis_terminal_info_add"];
    this.cis_terminal_info_edit = this.permissions["cis_terminal_info_edit"];
    this.cis_terminal_info_del = this.permissions["cis_terminal_info_del"];
    this.cis_terminal_info_audit = this.permissions["cis_terminal_info_audit"];
    this.cis_terminal_info_disable = this.permissions[
      "cis_terminal_info_disable"
    ];
    if (this.cis_terminal_info_add === undefined) {
      this.isActive = true;
    }
  },
  mounted() {
    // 查询表格数据
    this.getTerminal();
  },
  methods: {
    // 检索
    handleSearch() {
      this.tableLoading = true;
      let newForm = JSON.parse(JSON.stringify(this.form));
      delete this.page.total;
      delete newForm.custType;
      if (newForm.custId === "") {
        delete newForm.custId;
      }
      if (newForm.terminalName === "") {
        delete newForm.terminalName;
      }
      if (newForm.custName === "") {
        delete newForm.custName;
      }
      if (newForm.typeValue !== "") {
        let storeValue = newForm.typeValue;
        newForm.terminalType = storeValue;
        delete newForm.typeValue;
      } else {
        delete newForm.typeValue;
        delete newForm.terminalType;
      }
      if (newForm.value !== "") {
        let storeValueTwo = newForm.value;
        newForm.terminalStatus = storeValueTwo;
        delete newForm.value;
      } else {
        delete newForm.value;
        delete newForm.terminalStatus;
      }
      let par = { ...newForm, ...this.page };
      queryTerminal(par)
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
      this.form.terminalName = "";
      this.form.typeValue = "";
      this.form.value = "";
      this.form.custName = "";
    },
    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getTerminal();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getTerminal();
    },
    // 重置新增接入商表单
    handleResetAddForm() {
      this.addForm.custId = "";
      this.addForm.terminalName = "";
      this.addForm.value = "";
      this.addForm.terminalInfo = "";
      this.addForm.personLiableId = "";
    },
    // 调用接口获取select接入商类型
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.getCustName();
    },
    getCustName() {
      queryProvider({
        custType: 0
      })
        .then(res => {
          let arr = [];
          let array = res.data.data.records;
          this.addForm.custFind = array;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "查询失败",
            type: "error"
          });
        });
    },
    // 跳转到权限管理
    handleJumpPermission(row) {
      this.$router.push({
        path: "/permission/index",
        query: {
          custId: row.custId
        }
      });
    },
    // 新增接入商
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let custId;
          if (this.$route.query.id === undefined) {
            custId = this.addForm.custId;
          } else if (this.$route.query.id !== undefined) {
            custId = this.$route.query.id;
          }
          addTerminal({
            custId: custId,
            terminalName: this.addForm.terminalName,
            terminalType: this.addForm.value,
            terminalInfo: this.addForm.terminalInfo
          })
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.handleResetAddForm();
              this.getCustName();
              this.getTerminal();
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
          this.getTerminal();
          return false;
        }
      });
    },
    // 删除渠道商
    handleRowDel(row) {
      if (row.terminalStatusDesc === "待审核") {
        this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.tableLoading = true;
            delTerminal(row.terminalId).then(res => {
              this.$message({
                showClose: true,
                type: "success",
                message: "删除成功!"
              });
              this.getTerminal();
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
          row.terminalStatusDesc === "审核通过" ||
          row.terminalStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.terminalStatusDesc === "禁用") {
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
      this.editTitle = "查询终端信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.editForm = row;
    },
    // 编辑终端
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑终端信息";
      this.dialogQueryFormVisible = false;
      if (row.terminalStatusDesc === "待审核") {
        queryProvider({
          custType: 0
        })
          .then(res => {
            let array = res.data.data.records;
            this.editForm.custFind = array;
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "error"
            });
          });
        this.dialogEditFormVisible = true;
        this.editForm.custId = row.custId;
        this.editForm.terminalId = row.terminalId;
        this.editForm.terminalName = row.terminalName;
        this.editForm.value = row.terminalType;
        this.editForm.terminalInfo = row.terminalInfo;
        this.editForm.personLiableId = row.personLiableId;
      } else {
        if (
          row.terminalStatusDesc === "审核通过" ||
          row.terminalStatusDesc === "审核未通过"
        ) {
          this.$message({
            showClose: true,
            message: "已审核",
            type: "success"
          });
        } else if (row.terminalStatusDesc === "禁用") {
          this.$message({
            showClose: true,
            message: "已禁用",
            type: "success"
          });
        }
      }
    },
    // 编辑终端
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putTerminal({
            custId: this.editForm.custId,
            terminalId: this.editForm.terminalId,
            terminalName: this.editForm.terminalName,
            terminalType: this.editForm.value,
            terminalInfo: this.editForm.terminalInfo,
            personLiableId: 1
          })
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getTerminal();
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
          this.getTerminal();
          return false;
        }
      });
    },
    // 查询表格数据
    getTerminal() {
      if (this.$route.query.id !== undefined) {
        this.isAccess = false;
      }
      if (this.$route.query.id === undefined) {
        this.tableLoading = true;
        queryTerminal(
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
      } else {
        this.tableLoading = true;
        queryTerminal(
          Object.assign({
            current: this.page.currentPage,
            size: this.page.pageSize,
            custId: this.$route.query.id
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
      }
    },
    // 审核终端
    handleOpenCheck(row) {
      if (row.terminalStatusDesc !== "禁用") {
        queryProvider({
          custType: 0
        })
          .then(res => {
            let array = res.data.data.records;
            this.checkForm.custFind = array;
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "查询失败",
              type: "error"
            });
          });
        this.dialogcheckFormVisible = true;
        this.checkForm.custId = row.custId;
        this.checkForm.terminalId = row.terminalId;
        this.checkForm.terminalName = row.terminalName;
        this.checkForm.value = row.terminalTypeDesc;
        this.checkForm.terminalInfo = row.terminalInfo;
        this.checkForm.personLiableId = row.personLiableId;
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
      putTerminalCheck({
        terminalId: this.checkForm.terminalId,
        terminalStatus: 1
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "审核成功",
            type: "success"
          });
          this.dialogcheckFormVisible = false;
          this.tableLoading = false;
          this.getTerminal();
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
      putTerminalCheck({
        terminalId: this.checkForm.terminalId,
        terminalStatus: 2
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "审核不通过成功",
            type: "success"
          });
          this.dialogcheckFormVisible = false;
          this.tableLoading = false;
          this.getTerminal();
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
      putTerminalCheck({
        terminalId: row.terminalId,
        terminalStatus: 3
      })
        .then(() => {
          this.$message({
            showClose: true,
            message: "禁用成功",
            type: "success"
          });
          row.prohibitVisible = false;
          this.getTerminal();
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
#terminal {
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
