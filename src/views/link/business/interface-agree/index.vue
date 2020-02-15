<template>
  <div id="agree">
    <!-- 检索 -->
    <el-form class="el-row-space" ref="form" :model="form" label-width="80px" label-position="left">
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="协议名称:">
            <el-input
              class="input-width"
              size="mini"
              v-model="form.interfaceProtocolName"
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
          <el-form-item class="clear-space" label="协议类型:">
            <el-select v-model="form.interfaceProtocolType" placeholder="请选择" size="mini">
              <el-option
                v-for="item in form.interfaceProtocolTypeDesc"
                :key="item.interfaceProtocolType"
                :label="item.label"
                :value="item.interfaceProtocolType"
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
    <!-- 新增接口协议 -->
    <el-row class="el-row-space">
      <el-col :span="24">
        <el-button
          v-if="cis_interface_protocol_info_add"
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增接口协议</el-button>
      </el-col>
    </el-row>
    <!-- 新增接口协议弹出框 -->
    <el-dialog title="新增接口协议" :visible.sync="dialogFormVisible">
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
            <el-form-item label="接口协议类型:" prop="interfaceProtocolType">
              <el-select
                class="input-width"
                v-model="addForm.interfaceProtocolType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.interfaceProtocolTypeDesc"
                  :key="item.interfaceProtocolType"
                  :label="item.label"
                  :value="item.interfaceProtocolType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议名称:" prop="interfaceProtocolName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.interfaceProtocolName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="接口协议概述:" prop="interfaceProtocolInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.interfaceProtocolInfo"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议处理服务名:" prop="protocolServiceName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.protocolServiceName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口协议处理地址:" prop="protocolServiceAddress">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.protocolServiceAddress"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议处理方法名:" prop="protocolMethodName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="addForm.protocolMethodName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
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
      <el-table-column prop="interfaceProtocolId" label="协议编号" width="180" align="center"></el-table-column>
      <el-table-column prop="interfaceProtocolName" label="协议名称" width="180" align="center"></el-table-column>
      <el-table-column prop="interfaceProtocolInfo" label="协议概述" align="center"></el-table-column>
      <el-table-column prop="interfaceProtocolTypeDesc" label="协议类型" align="center"></el-table-column>
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
            v-if="cis_interface_protocol_info_edit"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_interface_protocol_info_del"
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
    <!-- 编辑接口协议弹出框 -->
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
            <el-form-item class="clear-space" label="接口协议编号:">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceProtocolId"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="接口协议类型:" prop="interfaceProtocolType">
              <el-select
                class="input-width"
                v-model="editForm.interfaceProtocolType"
                placeholder="请选择"
                size="mini"
                :disabled="dialogQueryFormVisible"
              >
                <el-option
                  v-for="item in editForm.interfaceProtocolTypeDesc"
                  :key="item.interfaceProtocolType"
                  :label="item.label"
                  :value="item.interfaceProtocolType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议名称:" prop="interfaceProtocolName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceProtocolName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="接口协议概述:" prop="interfaceProtocolInfo">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.interfaceProtocolInfo"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议处理服务名:" prop="protocolServiceName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.protocolServiceName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="接口协议处理地址:" prop="protocolServiceAddress">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.protocolServiceAddress"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="接口协议处理方法名:" prop="protocolMethodName">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
                size="mini"
                v-model="editForm.protocolMethodName"
                placeholder="请输入内容"
                :disabled="dialogQueryFormVisible"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
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
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item label="版本号:">
              <el-input
                class="input-width"
                type="textarea"
                :rows="2"
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { queryProvider } from "@/api/middle/user";
import { addAgree, delAgree, putAgree, queryAgree } from "@/api/middle/agree";
export default {
  name: "agree",
  data() {
    return {
      // 检索内容input
      form: {
        interfaceProtocolId: "",
        interfaceProtocolName: "",
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: "",
        interfaceProtocolTypeDesc: [
          {
            interfaceProtocolType: "0",
            label: "http"
          },
          {
            interfaceProtocolType: "1",
            label: "Socket"
          },
          {
            interfaceProtocolType: "2",
            label: "Webservice"
          },
          {
            interfaceProtocolType: "3",
            label: "Server"
          }
        ],
        interfaceProtocolType: ""
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
        interfaceProtocolType: [
          {
            required: true,
            message: "请选择接口协议",
            trigger: "blur"
          }
        ],
        interfaceProtocolName: [
          {
            required: true,
            message: "请输入接口协议名称",
            trigger: "blur"
          }
        ],
        interfaceProtocolInfo: [
          {
            required: true,
            message: "请输入接口协议概述",
            trigger: "blur"
          }
        ],
        protocolServiceName: [
          {
            required: true,
            message: "请输入接口协议处理服务名",
            trigger: "blur"
          }
        ],
        protocolServiceAddress: [
          {
            required: true,
            message: "请输入接口协议处理地址",
            trigger: "blur"
          }
        ],
        protocolMethodName: [
          {
            required: true,
            message: "请输入接口协议处理方法名",
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
      // 新建接口协议弹出框
      dialogFormVisible: false,
      // 编辑接口协议弹出框
      dialogEditFormVisible: false,
      // 审核接口协议
      dialogcheckFormVisible: false,
      // 新建接口协议插入数据
      addForm: {
        interfaceProtocolTypeDesc: [
          {
            interfaceProtocolType: "0",
            label: "http"
          },
          {
            interfaceProtocolType: "1",
            label: "Socket"
          },
          {
            interfaceProtocolType: "2",
            label: "Webservice"
          },
          {
            interfaceProtocolType: "3",
            label: "Server"
          }
        ],
        interfaceProtocolType: "",
        interfaceProtocolName: "",
        interfaceProtocolInfo: "",
        protocolServiceName: "",
        protocolServiceAddress: "",
        protocolMethodName: "",
        custIdValue: [
          {
            custId: "",
            custName: ""
          }
        ],
        custId: ""
      },
      // 编辑接入接口协议信息
      editForm: {
        interfaceProtocolId: "",
        interfaceProtocolTypeDesc: [
          {
            interfaceProtocolType: "0",
            label: "http"
          },
          {
            interfaceProtocolType: "1",
            label: "Socket"
          },
          {
            interfaceProtocolType: "2",
            label: "Webservice"
          },
          {
            interfaceProtocolType: "3",
            label: "Server"
          }
        ],
        interfaceProtocolType: "",
        interfaceProtocolName: "",
        interfaceProtocolInfo: "",
        protocolServiceName: "",
        protocolServiceAddress: "",
        protocolMethodName: "",
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
    this.cis_interface_protocol_info_add = this.permissions[
      "cis_interface_protocol_info_add"
    ];
    this.cis_interface_protocol_info_edit = this.permissions[
      "cis_interface_protocol_info_edit"
    ];
    this.cis_interface_protocol_info_del = this.permissions[
      "cis_interface_protocol_info_del"
    ];
  },
  mounted() {
    // 查询表格数据
    this.getAgree();
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
      delete newForm.interfaceProtocolId;
      delete newForm.interfaceProtocolTypeDesc;
      delete newForm.custIdValue;
      if (newForm.interfaceProtocolName === "") {
        delete newForm.interfaceProtocolName;
      }
      if (newForm.custId === "") {
        delete newForm.custId;
      }
      if (newForm.interfaceProtocolType === "") {
        delete newForm.interfaceProtocolType;
      }
      let par = { ...newForm, ...this.page };
      queryAgree(par)
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
      this.form.interfaceProtocolName = "";
      this.form.custId = "";
      this.form.interfaceProtocolType = "";
    },

    // 分页
    handleSizeChange(pageSize) {
      // 每页 pageSize 条
      this.page.pageSize = pageSize;
      this.getAgree();
    },
    handleCurrentChange(currentPage) {
      // 当前页: currentPage
      this.page.currentPage = currentPage;
      this.getAgree();
    },
    // 重置新增接入商表单
    handleResetAddForm() {
      this.addForm.interfaceProtocolType = "";
      this.addForm.interfaceProtocolName = "";
      this.addForm.interfaceProtocolInfo = "";
      this.addForm.protocolServiceName = "";
      this.addForm.protocolServiceAddress = "";
      this.addForm.protocolMethodName = "";
      this.addForm.custId = "";
    },
    // 调用接口获取select类型
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.getCustId();
    },
    // 新增接口协议
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          addAgree(this.addForm)
            .then(res => {
              this.dialogFormVisible = false;
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success"
              });
              this.handleResetAddForm();
              this.getCustId();
              this.getAgree();
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
    // 删除接口协议
    handleRowDel(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;
          delAgree(row.interfaceProtocolId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.getAgree();
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
      this.editTitle = "查询接口协议信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.interfaceProtocolId = row.interfaceProtocolId;
      this.editForm.interfaceProtocolType = row.interfaceProtocolType;
      this.editForm.interfaceProtocolName = row.interfaceProtocolName;
      this.editForm.interfaceProtocolInfo = row.interfaceProtocolInfo;
      this.editForm.protocolServiceName = row.protocolServiceName;
      this.editForm.protocolServiceAddress = row.protocolServiceAddress;
      this.editForm.protocolMethodName = row.protocolMethodName;
      this.editForm.custId = row.custId;
      this.editForm.version = row.version;
    },
    // 编辑接口协议
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑接口协议信息";
      this.dialogQueryFormVisible = false;
      this.dialogEditFormVisible = true;
      this.getCustId();
      this.editForm.interfaceProtocolId = row.interfaceProtocolId;
      this.editForm.interfaceProtocolType = row.interfaceProtocolType;
      this.editForm.interfaceProtocolName = row.interfaceProtocolName;
      this.editForm.interfaceProtocolInfo = row.interfaceProtocolInfo;
      this.editForm.protocolServiceName = row.protocolServiceName;
      this.editForm.protocolServiceAddress = row.protocolServiceAddress;
      this.editForm.protocolMethodName = row.protocolMethodName;
      this.editForm.custId = row.custId;
      this.editForm.version = row.version;
    },
    // 编辑接口协议
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          putAgree(this.editForm)
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.getAgree();
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
    getAgree() {
      this.tableLoading = true;
      queryAgree(
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
#agree {
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
