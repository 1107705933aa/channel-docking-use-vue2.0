<template>
  <div id="secretKey">
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
            <el-select v-model="form.custId" placeholder="请选择" size="small">
              <el-option
                v-for="item in form.custIdValue"
                :key="item.custId"
                :label="item.custName"
                :value="item.custId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :push="1">
          <el-form-item class="clear-space" label="秘钥类型:" prop="secretKeyType">
            <el-select v-model="form.secretKeyType" placeholder="请选择" size="small">
              <el-option
                v-for="item in form.secretKeyTypeValue"
                :key="item.secretKeyType"
                :label="item.label"
                :value="item.secretKeyType"
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
              @click="handleSearch"
              size="small"
            >检索</el-button>
            <el-button
              class="padding-space"
              icon="el-icon-delete"
              size="small"
              @click="handleReset"
            >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 新增秘钥 -->
    <el-row class="el-row-space">
      <el-col :span="24">
        <el-button
          v-if="cis_secret_key_info_add"
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增秘钥</el-button>
      </el-col>
    </el-row>
    <!-- 新增秘钥弹出框 -->
    <el-dialog title="新增秘钥" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="私钥:" prop="privateKey">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="addForm.privateKey"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="公钥:" prop="publicKey">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="addForm.publicKey"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item label="秘钥说明:" prop="secretKeyInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.secretKeyInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="秘钥名称:" prop="secretKeyName">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.secretKeyName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="秘钥类型:" prop="secretKeyType">
              <el-select
                class="input-width"
                v-model="addForm.secretKeyType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.secretKeyTypeValue"
                  :key="item.secretKeyType"
                  :label="item.label"
                  :value="item.secretKeyType"
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
      :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
      v-loading="tableLoading"
    >
      <el-table-column prop="secretKeyId" label="秘钥编号" width="180" align="center"></el-table-column>
      <el-table-column prop="secretKeyTypeDesc" label="秘钥类型" width="180" align="center"></el-table-column>
      <el-table-column prop="secretKeyName" label="秘钥名称" align="center"></el-table-column>
      <el-table-column prop="secretKeyInfo" label="秘钥说明" align="center"></el-table-column>
      <el-table-column prop="custId" label="客户编号" align="center"></el-table-column>
      <el-table-column prop="custName" label="客户名称" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="secretKeyType" label="秘钥类型" align="center"></el-table-column>
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
            v-if="cis_secret_key_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_secret_key_info_del"
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
    <!-- 编辑秘钥弹出框 -->
    <el-dialog :title="editTitle" :visible.sync="dialogEditFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="90px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item label="私钥:" prop="privateKey">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="editForm.privateKey"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="公钥:" prop="publicKey">
              <el-input
                class="input-width"
                type="textarea"
                :rows="6"
                size="mini"
                v-model="editForm.publicKey"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
            <el-form-item label="秘钥说明:" prop="secretKeyInfo">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.secretKeyInfo"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="秘钥名称:" prop="secretKeyName">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.secretKeyName"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="秘钥类型:" prop="secretKeyType">
              <el-select
                class="input-width"
                v-model="editForm.secretKeyType"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.secretKeyTypeValue"
                  :key="item.secretKeyType"
                  :label="item.label"
                  :value="item.secretKeyType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="hideData">
          <el-col :span="11">
            <el-form-item class="clear-space" label="秘钥编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.secretKeyId"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="版本:">
              <el-input
                class="input-width"
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
import { addkey, delkey, putkey, querykey } from "@/api/middle/key";
export default {
  name: "secretKey",
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
        secretKeyTypeValue: [
          {
            secretKeyType: "0",
            label: "对称秘钥"
          },
          {
            secretKeyType: "1",
            label: "非对称秘钥"
          }
        ],
        secretKeyType: ""
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
        privateKey: [
          {
            required: true,
            message: "请输入私钥",
            trigger: "blur"
          }
        ],
        publicKey: [
          {
            required: true,
            message: "请输入公钥",
            trigger: "blur"
          }
        ],
        secretKeyInfo: [
          {
            required: true,
            message: "请输入秘钥说明",
            trigger: "blur"
          }
        ],
        secretKeyName: [
          {
            required: true,
            message: "请输入秘钥名称",
            trigger: "blur"
          }
        ],
        secretKeyType: [
          {
            required: true,
            message: "请选择秘钥类型",
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
      // 新建秘钥弹出框
      dialogFormVisible: false,
      // 编辑秘钥弹出框
      dialogEditFormVisible: false,
      // 审核秘钥
      dialogcheckFormVisible: false,
      // 新建秘钥插入数据
      addForm: {
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        privateKey: "",
        publicKey: "",
        secretKeyInfo: "",
        secretKeyName: "",
        secretKeyTypeValue: [
          {
            secretKeyType: "0",
            label: "对称秘钥"
          },
          {
            secretKeyType: "1",
            label: "非对称秘钥"
          }
        ],
        secretKeyType: ""
      },
      // 编辑接入秘钥信息
      editForm: {
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        privateKey: "",
        publicKey: "",
        secretKeyInfo: "",
        secretKeyName: "",
        secretKeyTypeValue: [
          {
            secretKeyType: "0",
            label: "对称秘钥"
          },
          {
            secretKeyType: "1",
            label: "非对称秘钥"
          }
        ],
        secretKeyType: "",
        secretKeyId: "",
        version: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_secret_key_info_add = this.permissions["cis_secret_key_info_add"];
    this.cis_secret_key_info_edit = this.permissions[
      "cis_secret_key_info_edit"
    ];
    this.cis_secret_key_info_del = this.permissions["cis_secret_key_info_del"];
  },
  mounted() {
    // 查询表格数据
    this.getKey();
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
      delete newForm.secretKeyTypeValue;
      if (newForm.custId === "") {
        delete newForm.custId;
      }
      if (newForm.secretKeyType === "") {
        delete newForm.secretKeyType;
      }
      let par = { ...newForm, ...this.page };
      querykey(par)
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
      this.form.secretKeyType = "";
    },
    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getKey();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getKey();
    },
    // 重置新增渠道商表单
    handleResetAddForm() {
      this.addForm.custId = "";
      this.addForm.privateKey = "";
      this.addForm.publicKey = "";
      this.addForm.secretKeyInfo = "";
      this.addForm.secretKeyName = "";
      this.addForm.secretKeyType = "";
    },
    // 调用接口获取select类型
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.getCustId();
    },
    // 新增秘钥
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addkey(this.addForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.handleResetAddForm();
              this.getCustId();
              this.getKey();
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
    // 删除秘钥
    handleRowDel(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;
          delkey(row.secretKeyId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.getKey();
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
      this.editTitle = "查询秘钥";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.custId = row.custId;
      this.editForm.privateKey = row.privateKey;
      this.editForm.publicKey = row.publicKey;
      this.editForm.secretKeyId = row.secretKeyId;
      this.editForm.secretKeyInfo = row.secretKeyInfo;
      this.editForm.secretKeyName = row.secretKeyName;
      this.editForm.secretKeyType = row.secretKeyType;
      this.editForm.version = row.version;
      this.editForm.version = row.version;
    },
    // 编辑秘钥
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑秘钥";
      this.dialogQueryFormVisible = false;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.custId = row.custId;
      this.editForm.privateKey = row.privateKey;
      this.editForm.publicKey = row.publicKey;
      this.editForm.secretKeyId = row.secretKeyId;
      this.editForm.secretKeyInfo = row.secretKeyInfo;
      this.editForm.secretKeyName = row.secretKeyName;
      this.editForm.secretKeyType = row.secretKeyType;
      this.editForm.version = row.version;
    },
    // 编辑秘钥
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putkey(this.editForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getKey();
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
    getKey() {
      this.tableLoading = true;
      querykey(
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
#secretKey {
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
