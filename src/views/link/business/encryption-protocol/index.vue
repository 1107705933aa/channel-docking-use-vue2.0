<template>
  <div id="encryption">
    <!-- 检索 -->
    <el-form
      class="el-row-space"
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
    >
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="客户名称:">
            <el-select class="input-width" v-model="form.custId" placeholder="请选择" size="mini">
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
          <el-form-item class="clear-space" label="加密逻辑名称:" prop="encryptionPolicyName">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.encryptionPolicyName"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item class="clear-space" label="加密策略类型:" prop="encryptionPolicyType">
            <el-select
              class="input-width"
              v-model="form.encryptionPolicyType"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in form.encryptionPolicyTypeValue"
                :key="item.encryptionPolicyType"
                :label="item.label"
                :value="item.encryptionPolicyType"
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
    <!-- 新增加密协议 -->
    <el-row class="el-row-space">
      <el-col :span="24">
        <el-button
          v-if="cis_encryption_policy_info_add"
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增加密协议</el-button>
      </el-col>
    </el-row>
    <!-- 新增加密协议弹出框 -->
    <el-dialog title="新增加密协议" :visible.sync="dialogFormVisible">
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
            <el-form-item label="客户名称:" prop="custId">
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
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="加密方法名:" prop="encryptionMethodName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.encryptionMethodName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="加密逻辑说明:" prop="encryptionPolicyInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.encryptionPolicyInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="加密逻辑名称:" prop="encryptionPolicyName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.encryptionPolicyName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="加密策略类型:" prop="encryptionPolicyType">
              <el-select
                class="input-width"
                v-model="addForm.encryptionPolicyType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.encryptionPolicyTypeValue"
                  :key="item.encryptionPolicyType"
                  :label="item.label"
                  :value="item.encryptionPolicyType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="加密服务地址:" prop="encryptionServiceAddress">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.encryptionServiceAddress"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="加密服务名:" prop="encryptionServiceName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.encryptionServiceName"
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
      <el-table-column prop="encryptionPolicyId" label="加密策略编号" width="180" align="center"></el-table-column>
      <el-table-column prop="encryptionPolicyName" label="加密逻辑名称" width="180" align="center"></el-table-column>
      <el-table-column prop="encryptionPolicyInfo" label="加密逻辑说明" align="center"></el-table-column>
      <el-table-column prop="encryptionPolicyTypeDesc" label="加密策略类型" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="encryptionPolicyType" label="加密策略类型" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="encryptionPolicyId" label="加密策略编号" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="version" label="版本" align="center"></el-table-column>
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
            v-if="cis_encryption_policy_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_encryption_policy_info_del"
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
    <!-- 编辑加密协议弹出框 -->
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
            <el-form-item label="客户名称:" prop="custId">
              <el-select
                class="input-width"
                v-model="editForm.custId"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
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
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="加密方法名:" prop="encryptionMethodName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.encryptionMethodName"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="加密逻辑说明:" prop="encryptionPolicyInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.encryptionPolicyInfo"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="加密逻辑名称:" prop="encryptionPolicyName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.encryptionPolicyName"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="加密策略类型:" prop="encryptionPolicyType">
              <el-select
                class="input-width"
                v-model="editForm.encryptionPolicyType"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.encryptionPolicyTypeValue"
                  :key="item.encryptionPolicyType"
                  :label="item.label"
                  :value="item.encryptionPolicyType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="加密服务地址:" prop="encryptionServiceAddress">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.encryptionServiceAddress"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="加密服务名:" prop="encryptionServiceName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.encryptionServiceName"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item class="clear-space" label="加密策略编号:">
              <el-input
                size="mini"
                v-model="editForm.encryptionPolicyId"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="版本:">
              <el-input
                size="mini"
                v-model="editForm.version"
                :disabled="dialogQueryFormVisible"
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
  addEncryption,
  delEncryption,
  putEncryption,
  queryEncryption
} from "@/api/middle/encryption";
export default {
  name: "encryption",
  data() {
    return {
      // 检索内容input
      form: {
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        encryptionPolicyName: "",
        encryptionPolicyTypeValue: [
          {
            encryptionPolicyType: "0",
            label: "系统"
          },
          {
            encryptionPolicyType: "1",
            label: "自定义"
          }
        ],
        encryptionPolicyType: ""
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
        custId: [
          {
            required: true,
            message: "请选择客户编号",
            trigger: "blur"
          }
        ],
        encryptionMethodName: [
          {
            required: true,
            message: "请输入加密方法名",
            trigger: "blur"
          }
        ],
        encryptionPolicyInfo: [
          {
            required: true,
            message: "请输入加密逻辑说明",
            trigger: "blur"
          }
        ],
        encryptionPolicyName: [
          {
            required: true,
            message: "请输入加密逻辑名称",
            trigger: "blur"
          }
        ],
        encryptionPolicyType: [
          {
            required: true,
            message: "请选择加密策略类型",
            trigger: "blur"
          }
        ],
        encryptionServiceAddress: [
          {
            required: true,
            message: "请输入加密服务地址",
            trigger: "blur"
          }
        ],
        encryptionServiceName: [
          {
            required: true,
            message: "请输入加密服务名",
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
      // 新建加密协议弹出框
      dialogFormVisible: false,
      // 编辑加密协议弹出框
      dialogEditFormVisible: false,
      // 审核加密协议
      dialogcheckFormVisible: false,
      // 新建加密协议插入数据
      addForm: {
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        encryptionMethodName: "",
        encryptionPolicyInfo: "",
        encryptionPolicyName: "",
        encryptionPolicyTypeValue: [
          {
            encryptionPolicyType: "0",
            label: "系统"
          },
          {
            encryptionPolicyType: "1",
            label: "自定义"
          }
        ],
        encryptionPolicyType: "",
        encryptionServiceAddress: "",
        encryptionServiceName: ""
      },
      // 编辑接入加密协议信息
      editForm: {
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        encryptionMethodName: "",
        encryptionPolicyInfo: "",
        encryptionPolicyName: "",
        encryptionPolicyTypeValue: [
          {
            encryptionPolicyType: "0",
            label: "系统"
          },
          {
            encryptionPolicyType: "1",
            label: "自定义"
          }
        ],
        encryptionPolicyType: "",
        encryptionServiceAddress: "",
        encryptionServiceName: "",
        encryptionPolicyId: "",
        version: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_encryption_policy_info_add = this.permissions[
      "cis_encryption_policy_info_add"
    ];
    this.cis_encryption_policy_info_edit = this.permissions[
      "cis_encryption_policy_info_edit"
    ];
    this.cis_encryption_policy_info_del = this.permissions[
      "cis_encryption_policy_info_del"
    ];
  },
  mounted() {
    // 查询表格数据
    this.getEncryption();
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
      delete newForm.custIdValue;
      delete newForm.encryptionPolicyTypeValue;
      if (newForm.custId === "") {
        delete newForm.custId;
      }
      if (newForm.encryptionPolicyType === "") {
        delete newForm.encryptionPolicyType;
      }
      if (newForm.encryptionPolicyName === "") {
        delete newForm.encryptionPolicyName;
      }
      let par = { ...newForm, ...this.page };
      queryEncryption(par)
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
      this.form.custId = "";
      this.form.encryptionPolicyName = "";
      this.form.encryptionPolicyType = "";
    },

    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getEncryption();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getEncryption();
    },
    // 重置新增渠道商表单
    handleResetAddForm() {
      this.addForm.custId = "";
      this.addForm.encryptionMethodName = "";
      this.addForm.encryptionPolicyInfo = "";
      this.addForm.encryptionPolicyName = "";
      this.addForm.encryptionPolicyType = "";
      this.addForm.encryptionServiceAddress = "";
      this.addForm.encryptionServiceName = "";
    },
    // 调用接口获取select类型
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.getCustId();
    },
    // 新增加密协议
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addEncryption(this.addForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.handleResetAddForm();
              this.getCustId();
              this.getEncryption();
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
    // 删除加密协议
    handleRowDel(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;
          delEncryption(row.encryptionPolicyId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.getEncryption();
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
      this.editTitle = "查询加密协议";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.custId = row.custId;
      this.editForm.encryptionMethodName = row.encryptionMethodName;
      this.editForm.encryptionPolicyInfo = row.encryptionPolicyInfo;
      this.editForm.encryptionPolicyName = row.encryptionPolicyName;
      this.editForm.encryptionPolicyType = row.encryptionPolicyType;
      this.editForm.encryptionServiceAddress = row.encryptionServiceAddress;
      this.editForm.encryptionServiceName = row.encryptionServiceName;
      this.editForm.encryptionPolicyId = row.encryptionPolicyId;
      this.editForm.version = row.version;
    },
    // 编辑加密协议
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑加密协议";
      this.dialogQueryFormVisible = false;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.custId = row.custId;
      this.editForm.encryptionMethodName = row.encryptionMethodName;
      this.editForm.encryptionPolicyInfo = row.encryptionPolicyInfo;
      this.editForm.encryptionPolicyName = row.encryptionPolicyName;
      this.editForm.encryptionPolicyType = row.encryptionPolicyType;
      this.editForm.encryptionServiceAddress = row.encryptionServiceAddress;
      this.editForm.encryptionPolicyId = row.encryptionPolicyId;
      this.editForm.encryptionServiceName = row.encryptionServiceName;
      this.editForm.version = row.version;
    },
    // 编辑加密协议
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putEncryption(this.editForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getEncryption();
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
    getEncryption() {
      this.tableLoading = true;
      queryEncryption(
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
#encryption {
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
