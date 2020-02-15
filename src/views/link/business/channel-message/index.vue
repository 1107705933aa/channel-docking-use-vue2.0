<template>
  <div id="message">
    <!-- 检索 -->
    <el-form class="el-row-space" ref="form" :model="form" label-width="80px" label-position="left">
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="报文名称:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.interfaceMessageName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="渠道商:">
            <el-select v-model="form.custId" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.custIdValue"
                :key="item.custId"
                :label="item.custName"
                :value="item.custId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="报文类型:">
            <el-select v-model="form.interfaceMessageType" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.interfaceMessageTypeDesc"
                :key="item.interfaceMessageType"
                :label="item.label"
                :value="item.interfaceMessageType"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :push="14">
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
    <!-- 新增接口报文 -->
    <el-row class="el-row-space">
      <el-col :span="24">
        <el-button
          v-if="cis_interface_message_info_add"
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增接口报文</el-button>
      </el-col>
    </el-row>
    <!-- 新增接口报文弹出框 -->
    <el-dialog title="新增接口报文" :visible.sync="dialogFormVisible">
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
            <el-form-item label="报文类型:" prop="interfaceMessageType">
              <el-select
                class="input-width"
                v-model="addForm.interfaceMessageType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.interfaceMessageTypeDesc"
                  :key="item.interfaceMessageType"
                  :label="item.label"
                  :value="item.interfaceMessageType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="报文名称:" prop="interfaceMessageName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.interfaceMessageName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="报文概述:" prop="interfaceMessageInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.interfaceMessageInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="渠道商:" prop="custId">
              <el-select class="input-width" v-model="addForm.custId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.custIdValue"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="报文内容模板:" prop="messageContentTemplate">
              <el-input
                type="textarea"
                :rows="10"
                size="mini"
                v-model="addForm.messageContentTemplate"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item class="clear-space" label="签名模板:" prop="messageSignTemplate">
              <el-input
                type="textarea"
                :rows="10"
                size="mini"
                v-model="addForm.messageSignTemplate"
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
      :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
      v-loading="tableLoading"
    >
      <el-table-column prop="interfaceMessageId" label="报文编号" width="180" align="center"></el-table-column>
      <el-table-column prop="interfaceMessageName" label="报文名称" width="180" align="center"></el-table-column>
      <el-table-column prop="interfaceMessageInfo" label="报文概述" align="center"></el-table-column>
      <el-table-column prop="interfaceMessageType" label="报文类型" align="center"></el-table-column>
      <el-table-column prop="interfaceMessageTypeDesc" label="报文类型描述" align="center"></el-table-column>
      <el-table-column label="操作" width="170" align="center">
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
            v-if="cis_interface_message_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_interface_message_info_del"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
          >删除</el-button>
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
    <!-- 编辑接口报文弹出框 -->
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
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="报文编号:" prop="interfaceMessageName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceMessageId"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="报文类型:" prop="interfaceMessageType">
              <el-select
                class="input-width"
                v-model="editForm.interfaceMessageType"
                placeholder="请选择"
                size="mini"
                :disabled="dialogQueryFormVisible"
              >
                <el-option
                  v-for="item in editForm.interfaceMessageTypeDesc"
                  :key="item.interfaceMessageType"
                  :label="item.label"
                  :value="item.interfaceMessageType"
                  :disabled="dialogQueryFormVisible"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="报文名称:" prop="interfaceMessageName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceMessageName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="报文概述:" prop="interfaceMessageInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceMessageInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="渠道商:" prop="custId">
              <el-select
                class="input-width"
                v-model="editForm.custId"
                placeholder="请选择"
                size="mini"
                :disabled="dialogQueryFormVisible"
              >
                <el-option
                  v-for="item in editForm.custIdValue"
                  :key="item.custId"
                  :label="item.custName"
                  :value="item.custId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="报文内容模板:" prop="messageContentTemplate">
              <el-input
                type="textarea"
                :rows="10"
                size="mini"
                v-model="editForm.messageContentTemplate"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item class="clear-space" label="签名模板:" prop="messageSignTemplate">
              <el-input
                type="textarea"
                :rows="10"
                size="mini"
                v-model="editForm.messageSignTemplate"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="版本号:" prop="messageSignTemplate">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.version"
                placeholder="请输入内容"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryProvider } from "@/api/middle/user";
import {
  addMessage,
  delMessage,
  putMessage,
  queryMessage
} from "@/api/middle/message";
export default {
  name: "message",
  data() {
    return {
      // 检索内容input
      form: {
        interfaceMessageId: "",
        interfaceMessageName: "",
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        interfaceMessageTypeDesc: [
          {
            interfaceMessageType: "0",
            label: "系统"
          },
          {
            interfaceMessageType: "1",
            label: "自定义"
          }
        ],
        interfaceMessageType: ""
      },
      // 表格内容
      tableData: [],
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
        interfaceMessageType: [
          {
            required: true,
            message: "请选择报文类型",
            trigger: "blur"
          }
        ],
        interfaceMessageName: [
          {
            required: true,
            message: "请输入报文名称",
            trigger: "blur"
          }
        ],
        interfaceMessageInfo: [
          {
            required: true,
            message: "请输入报文概述",
            trigger: "blur"
          }
        ],
        messageContentTemplate: [
          {
            required: true,
            message: "请输入报文内容模板",
            trigger: "blur"
          }
        ],
        messageSignTemplate: [
          {
            required: true,
            message: "请输入签名模板",
            trigger: "blur"
          }
        ],
        custId: [
          {
            required: true,
            message: "请选择渠道商",
            trigger: "blur"
          }
        ]
      },
      // 隐藏字段
      hideData: false,
      // 查询弹出框
      dialogQueryFormVisible: false,
      isQuery: true,
      editTitle: "",
      // 新建接口报文弹出框
      dialogFormVisible: false,
      // 编辑接口报文弹出框
      dialogEditFormVisible: false,
      // 审核接口报文
      dialogcheckFormVisible: false,
      // 新建接口报文插入数据
      addForm: {
        interfaceMessageTypeDesc: [
          {
            interfaceMessageType: "0",
            label: "系统"
          },
          {
            interfaceMessageType: "1",
            label: "自定义"
          }
        ],
        interfaceMessageType: "",
        interfaceMessageName: "",
        interfaceMessageInfo: "",
        messageContentTemplate: "",
        messageSignTemplate: "",
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: ""
      },
      // 编辑接入接口报文信息
      editForm: {
        interfaceMessageId: "",
        interfaceMessageTypeDesc: [
          {
            interfaceMessageType: "0",
            label: "系统"
          },
          {
            interfaceMessageType: "1",
            label: "自定义"
          }
        ],
        interfaceMessageType: "",
        interfaceMessageName: "",
        interfaceMessageInfo: "",
        messageContentTemplate: "",
        messageSignTemplate: "",
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        version: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_interface_message_info_add = this.permissions[
      "cis_interface_message_info_add"
    ];
    this.cis_interface_message_info_edit = this.permissions[
      "cis_interface_message_info_edit"
    ];
    this.cis_interface_message_info_del = this.permissions[
      "cis_interface_message_info_del"
    ];
  },
  mounted() {
    // 查询表格数据
    this.getMessage();
    this.getCustId();
  },
  methods: {
    // 给检索、新增赋custId值
    getCustId() {
      queryProvider(
        Object.assign({
          current: this.page.currentPage,
          size: 900000000,
          custType: 1
        })
      ).then(res => {
        let array = res.data.data.records;
        this.editForm.custIdValue = array;
        this.addForm.custIdValue = array;
        this.form.custIdValue = array;
        this.tableLoading = false;
      });
    },
    // 检索
    handleSearch() {
      this.tableLoading = true;
      let newForm = JSON.parse(JSON.stringify(this.form));
      delete this.page.total;
      delete newForm.interfaceMessageId;
      delete newForm.interfaceMessageTypeDesc;
      delete newForm.custIdValue;
      if (newForm.interfaceMessageName === "") {
        delete newForm.interfaceMessageName;
      }
      if (newForm.custId === "") {
        delete newForm.custId;
      }
      if (newForm.interfaceMessageType === "") {
        delete newForm.interfaceMessageType;
      }
      let par = { ...newForm, ...this.page };
      queryMessage(par)
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
      this.form.interfaceMessageName = "";
      this.form.custId = "";
      this.form.interfaceMessageType = "";
    },

    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getMessage();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getMessage();
    },
    // 重置新增渠道商表单
    handleResetAddForm() {
      this.addForm.interfaceMessageType = "";
      this.addForm.interfaceMessageName = "";
      this.addForm.interfaceMessageInfo = "";
      this.addForm.messageContentTemplate = "";
      this.addForm.messageSignTemplate = "";
      this.addForm.custId = "";
    },
    // 调用接口获取select类型
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.getCustId();
    },
    // 新增接口报文
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMessage(this.addForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.handleResetAddForm();
              this.getCustId();
              this.getMessage();
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
          return false;
        }
      });
    },
    // 删除接口报文
    handleRowDel(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;
          delMessage(row.interfaceMessageId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.getMessage();
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
    },
    // 查询
    handleOpenQuery(row) {
      this.isQuery = false;
      this.editTitle = "查询报文信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.interfaceMessageId = row.interfaceMessageId;
      this.editForm.interfaceMessageType = row.interfaceMessageType;
      this.editForm.interfaceMessageName = row.interfaceMessageName;
      this.editForm.interfaceMessageInfo = row.interfaceMessageInfo;
      this.editForm.messageContentTemplate = row.messageContentTemplate;
      this.editForm.messageSignTemplate = row.messageSignTemplate;
      this.editForm.custId = row.custId;
      this.editForm.version = row.version;
    },
    // 编辑接口报文
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑报文信息";
      this.dialogQueryFormVisible = false;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.interfaceMessageId = row.interfaceMessageId;
      this.editForm.interfaceMessageType = row.interfaceMessageType;
      this.editForm.interfaceMessageName = row.interfaceMessageName;
      this.editForm.interfaceMessageInfo = row.interfaceMessageInfo;
      this.editForm.messageContentTemplate = row.messageContentTemplate;
      this.editForm.messageSignTemplate = row.messageSignTemplate;
      this.editForm.custId = row.custId;
      this.editForm.version = row.version;
    },
    // 编辑接口报文
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putMessage(this.editForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getMessage();
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
          return false;
        }
      });
    },
    // 查询表格数据
    getMessage() {
      this.tableLoading = true;
      queryMessage(
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
    }
  }
};
</script>

<style lang="scss" scoped>
#message {
  width: 98.3%;
  padding-left: 20px;
  margin-left: 10px;
  margin-bottom: 30px;
  background-color: #fff;

  .el-row-space {
    padding-top: 20px;
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
}

.page {
  margin-left: 48%;
  margin-top: 30px;
}
</style>
