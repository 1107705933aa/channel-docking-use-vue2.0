<template>
  <div id="message">
    <!-- 检索 -->
    <el-form
      class="el-row-space bottom-space"
      ref="form"
      :model="form"
      label-width="80px"
      label-position="left"
    >
      <el-row>
        <el-col :span="7">
          <el-form-item class="clear-space" label="流程节点:">
            <el-select
              @change="handleSearch"
              v-model="form.processNodeId"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in form.processNodeIdValue"
                :key="item.processNodeId"
                :label="item.processNodeIdPrice"
                :value="item.processNodeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 新增参数对照 -->
    <el-row v-if="cis_process_parameter_comparison_list_add" class="el-row-space">
      <el-col :span="24">
        <el-button
          class="padding-space"
          icon="el-icon-plus"
          type="primary"
          size="mini"
          @click="handleOpenAddForm"
        >新增参数对照</el-button>
      </el-col>
    </el-row>
    <!-- 新增参数对照弹出框 -->
    <el-dialog title="新增参数对照" :visible.sync="dialogFormVisible">
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
            <el-form-item label="节点参数:" prop="channelParameterId">
              <el-select
                class="input-width"
                v-model="addForm.channelParameterId"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.nodeParamValue"
                  :key="item.channelParameterId"
                  :label="item.nodeParamlabel"
                  :value="item.channelParameterId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="参数来源:" prop="channelInterfaceId">
              <el-select
                @change="getParamSource"
                class="input-width"
                v-model="addForm.channelInterfaceId"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.paramSourceValue"
                  :key="item.channelInterfaceId"
                  :label="item.paramSourcelabel"
                  :value="item.channelInterfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="参数标识:" prop="parameterIdentifier">
              <el-select
                class="input-width"
                v-model="addForm.parameterIdentifier"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.parameterIdentifierValue"
                  :key="item.parameterIdentifier"
                  :label="item.parameterIdentifierlabel"
                  :value="item.parameterIdentifier"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="参数对照类型:" prop="processParameterType">
              <el-select
                @change="getParamSource"
                class="input-width"
                v-model="addForm.processParameterType"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.processParameterTypeValue"
                  :key="item.processParameterType"
                  :label="item.processParameterTypelabel"
                  :value="item.processParameterType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="默认值:">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.defaultValue"
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
      <el-table-column prop="processParameterId" label="参数对照编号" width="120" align="center"></el-table-column>
      <el-table-column prop="processParameterTypeDesc" label="参数对照类型" width="120" align="center"></el-table-column>
      <el-table-column prop="nodeParameterId" label="节点参数编号" align="center"></el-table-column>
      <el-table-column prop="nodeParameterName" label="节点参数名称" align="center"></el-table-column>
      <el-table-column prop="parameterFrom" label="参数来源" align="center"></el-table-column>
      <el-table-column prop="parameterFromName" label="参数来源名称" align="center"></el-table-column>
      <el-table-column prop="parameterIdentifier" label="参数标识" align="center"></el-table-column>
      <el-table-column prop="defaultValue" label="默认值" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="processNodeId" label="节点编号" align="center"></el-table-column>
      <el-table-column v-if="hideData" prop="processParameterType" label="参数对照类型" align="center"></el-table-column>
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
            v-if="cis_process_parameter_comparison_list_del"
            @click="handleOpenEdit(scope.row)"
            icon="el-icon-edit"
            type="text"
            size="small"
            class="clear-space"
            style="padding-right:7px;"
          >编辑</el-button>
          <el-button
            v-if="cis_process_parameter_comparison_list_update"
            @click="handleRowDel(scope.row)"
            icon="el-icon-delete"
            type="text"
            size="small"
            class="clear-space"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑参数对照弹出框 -->
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
            <el-form-item label="节点参数:" prop="channelParameterId">
              <el-select
                class="input-width"
                v-model="editForm.channelParameterId"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.nodeParamValue"
                  :key="item.channelParameterId"
                  :label="item.nodeParamlabel"
                  :value="item.channelParameterId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="参数来源:" prop="channelInterfaceId">
              <el-select
                @change="getParamSource"
                class="input-width"
                v-model="editForm.channelInterfaceId"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.paramSourceValue"
                  :key="item.channelInterfaceId"
                  :label="item.paramSourcelabel"
                  :value="item.channelInterfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="参数标识:" prop="parameterIdentifier">
              <el-select
                class="input-width"
                v-model="editForm.parameterIdentifier"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.parameterIdentifierValue"
                  :key="item.parameterIdentifier"
                  :label="item.parameterIdentifierlabel"
                  :value="item.parameterIdentifier"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item label="参数对照类型:" prop="processParameterType">
              <el-select
                @change="getParamSource"
                class="input-width"
                v-model="editForm.processParameterType"
                :disabled="dialogQueryFormVisible"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in editForm.processParameterTypeValue"
                  :key="item.processParameterType"
                  :label="item.processParameterTypelabel"
                  :value="item.processParameterType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="默认值:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.defaultValue"
                :disabled="dialogQueryFormVisible"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11" :push="2">
            <el-form-item class="clear-space" label="参数对照编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.processParameterId"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="hideData" :span="11">
            <el-form-item class="clear-space" label="版本:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.version"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="hideData" :span="11" :push="2">
            <el-form-item class="clear-space" label="节点编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.processNodeId"
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
import {
  addCompare,
  delCompare,
  putCompare,
  queryServiceIdCompare,
  queryNodeIdCompare,
  queryChannelIdCompare,
  queryNodeIdParamCompare,
  queryNodeIdSourceCompare,
  queryParamIdCompare,
  queryEndNodeCompare,
  queryNodeParamFoptionCompare
} from "@/api/middle/paramCompare";
export default {
  name: "compare",
  data() {
    return {
      // 检索内容input
      form: {
        processNodeIdValue: [],
        processNodeId: ""
      },
      // 表格内容
      tableData: [],
      // 表格加载
      tableLoading: false,
      // 制定规则
      rules: {
        channelParameterId: [
          {
            required: true,
            message: "请选择节点参数",
            trigger: "blur"
          }
        ],
        channelInterfaceId: [
          {
            required: true,
            message: "请选择参数来源",
            trigger: "blur"
          }
        ],
        parameterIdentifier: [
          {
            required: true,
            message: "请选择参数标识",
            trigger: "blur"
          }
        ],
        processParameterType: [
          {
            required: true,
            message: "请选择参数对照类型",
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
      // 新建参数对照弹出框
      dialogFormVisible: false,
      // 编辑参数对照弹出框
      dialogEditFormVisible: false,
      // 新建参数对照插入数据
      addForm: {
        nodeParamValue: [
          {
            channelParameterId: "",
            nodeParamlabel: ""
          }
        ],
        channelParameterId: "",
        paramSourceValue: [
          {
            channelInterfaceId: "",
            paramSourcelabel: ""
          }
        ],
        channelInterfaceId: "",
        parameterIdentifierValue: [
          {
            parameterIdentifier: "",
            parameterIdentifierlabel: ""
          }
        ],
        parameterIdentifier: "",
        processParameterTypeValue: [
          {
            processParameterType: "0",
            processParameterTypelabel: "默认"
          }
        ],
        processParameterType: "",
        defaultValue: "",
        parameterFrom: ""
      },
      // 流程节点选择项储存
      val: "",
      // 编辑接入参数对照信息
      editForm: {
        nodeParamValue: [
          {
            channelParameterId: "",
            nodeParamlabel: ""
          }
        ],
        channelParameterId: "",
        paramSourceValue: [
          {
            channelInterfaceId: "",
            paramSourcelabel: ""
          }
        ],
        channelInterfaceId: "",
        parameterIdentifierValue: [
          {
            parameterIdentifier: "",
            parameterIdentifierlabel: ""
          }
        ],
        parameterIdentifier: "",
        processParameterTypeValue: [
          {
            processParameterType: "0",
            processParameterTypelabel: "默认"
          }
        ],
        processParameterType: "",
        defaultValue: "",
        processParameterId: "",
        version: "",
        processNodeId: ""
      }
    };
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_process_parameter_comparison_list_add = this.permissions[
      "cis_process_parameter_comparison_list_add"
    ];
    this.cis_process_parameter_comparison_list_del = this.permissions[
      "cis_process_parameter_comparison_list_del"
    ];
    this.cis_process_parameter_comparison_list_update = this.permissions[
      "cis_process_parameter_comparison_list_update"
    ];
  },
  mounted() {
    // 查询表格数据
    this.handleSearch();
  },
  methods: {
    // 检索
    handleSearch(val) {
      this.tableLoading = true;
      this.val = val;
      let id = this.$route.query.id;
      let processNodeId;
      let serviceInterfaceId = id;
      queryServiceIdCompare(id).then(res => {
        let array = res.data.data;
        let obj = {
          processNodeId: "final",
          processNodeIdPrice: "终止节点"
        };
        for (let i = 0; i < array.length; i++) {
          array[i].processNodeIdPrice = array[i].processNodeId;
          if (val === undefined) {
            this.form.processNodeId = array[0].processNodeId;
          }
        }
        processNodeId = this.form.processNodeId;
        array.push(obj);
        this.form.processNodeIdValue = array;
        if (processNodeId !== "final") {
          queryNodeIdCompare(
            Object.assign({
              processNodeId: processNodeId,
              serviceInterfaceId: serviceInterfaceId
            })
          ).then(res => {
            this.tableData = res.data.data;
            this.getNodeParam();
            this.getParamSource();
          });
          this.tableLoading = false;
        } else if (processNodeId === "final") {
          queryEndNodeCompare(id).then(res => {
            this.tableData = res.data.data;
            this.getNodeParam();
            this.getParamSource();
          });
          this.tableLoading = false;
        }
      });
    },

    // 获取节点参数
    getNodeParam() {
      let id = this.form.processNodeId;
      if (id !== "final") {
        queryNodeIdParamCompare(id).then(res => {
          let array = res.data.data;
          for (let i = 0; i < array.length; i++) {
            let channelParameterIdentifier =
              array[i].channelParameterIdentifier;
            let channelParameterId = array[i].channelParameterId;
            let nodeParam =
              channelParameterIdentifier + " (" + channelParameterId + ")";
            array[i].nodeParamlabel = nodeParam;
            array[i].channelParameterId = array[
              i
            ].channelParameterId.toString();
          }
          this.addForm.nodeParamValue = array;
          this.editForm.nodeParamValue = array;
        });
      } else if (id === "final") {
        let sId = this.$route.query.id;
        queryNodeParamFoptionCompare(sId).then(res => {
          let array = res.data.data;
          for (let i = 0; i < array.length; i++) {
            let serviceParameterIdentifier =
              array[i].serviceParameterIdentifier;
            let serviceParameterId = array[i].serviceParameterId;
            let nodeParam =
              serviceParameterIdentifier + " (" + serviceParameterId + ")";
            array[i].channelParameterId = array[i].serviceParameterId;
            array[i].nodeParamlabel = nodeParam;
            array[i].channelParameterId = array[
              i
            ].channelParameterId.toString();
          }
          this.addForm.nodeParamValue = array;
          this.editForm.nodeParamValue = array;
        });
      }
    },
    // 获取参数来源
    getParamSource(val) {
      let storeVale;
      storeVale = val;
      let id = this.form.processNodeId;
      if (id !== "final") {
        queryNodeIdSourceCompare(id).then(res => {
          let array = res.data.data;
          if (array.length === 0) {
            let obj = {
              channelInterfaceId: "param",
              paramSourceValue: "param"
            };
            array.push(obj);
          } else {
            for (let i = 0; i < array.length; i++) {
              let processNodeId = array[i].processNodeId;
              let channelInterfaceName = array[i].channelInterfaceName;
              let SourceParam =
                processNodeId + " (" + channelInterfaceName + ")";
              array[i].paramSourcelabel = SourceParam;
              array[i].channelInterfaceId = array[
                i
              ].channelInterfaceId.toString();
            }
            let obj = {
              channelInterfaceId: "param",
              paramSourceValue: "param"
            };
            array.push(obj);
          }
          this.addForm.paramSourceValue = array;
          this.editForm.paramSourceValue = array;

          // 获取参数标识
          for (let i = 0; i < array.length; i++) {
            if (
              array[0].channelInterfaceId === "param" ||
              this.addForm.channelInterfaceId === "param" ||
              this.editForm.channelInterfaceId === "param"
            ) {
              let id = this.$route.query.id;
              queryParamIdCompare(
                Object.assign({
                  serviceInterfaceId: id,
                  serviceParameterType: "0"
                })
              ).then(res => {
                let arr = res.data.data;
                for (let j = 0; j < arr.length; j++) {
                  arr[j].parameterIdentifierlabel = arr[j].parameterIdentifier;
                }
                this.addForm.parameterIdentifierValue = arr;
                this.editForm.parameterIdentifierValue = arr;
              });
            } else if (
              array[0].channelInterfaceId !== "param" &&
              val === undefined
            ) {
              let arr2 = res.data.data;
              for (let j = 0; j < arr2.length; j++) {
                this.parameterFrom = arr2[0].processNodeId;
                queryChannelIdCompare(this.parameterFrom).then(res => {
                  let arr3 = res.data.data;
                  for (let n = 0; n < arr3.length; n++) {
                    arr3[n].parameterIdentifierlabel =
                      arr3[n].parameterIdentifier;
                  }
                  this.addForm.parameterIdentifierValue = arr3;
                  this.editForm.parameterIdentifierValue = arr3;
                });
              }
            } else if (
              array[0].channelInterfaceId !== "param" &&
              storeVale !== undefined
            ) {
              let arr2 = res.data.data;
              for (let j = 0; j < arr2.length; j++) {
                if (arr2[j].channelInterfaceId === storeVale) {
                  this.parameterFrom = arr2[j].processNodeId;
                }
                queryChannelIdCompare(this.parameterFrom).then(res => {
                  let arr3 = res.data.data;
                  for (let n = 0; n < arr3.length; n++) {
                    arr3[n].parameterIdentifierlabel =
                      arr3[n].parameterIdentifier;
                  }
                  this.addForm.parameterIdentifierValue = arr3;
                  this.editForm.parameterIdentifierValue = arr3;
                });
              }
            }
          }
        });
      } else if (id === "final") {
        let sId = this.$route.query.id;
        queryServiceIdCompare(sId).then(res => {
          let array = res.data.data;
          for (let i = 0; i < array.length; i++) {
            let processNodeId = array[i].processNodeId;
            let channelInterfaceName = array[i].channelInterfaceName;
            let SourceParam;
            if (channelInterfaceName !== "") {
              SourceParam = processNodeId + " (" + channelInterfaceName + ")";
            } else if (channelInterfaceName === "") {
              SourceParam = processNodeId;
            }
            array[i].paramSourcelabel = SourceParam;
          }
          this.addForm.paramSourceValue = array;
          this.editForm.paramSourceValue = array;

          // 获取参数标识
          for (let i = 0; i < array.length; i++) {
            if (array[0].channelInterfaceId !== "param" && val === undefined) {
              let arr2 = res.data.data;
              for (let j = 0; j < arr2.length; j++) {
                this.parameterFrom = arr2[0].processNodeId;
                queryChannelIdCompare(this.parameterFrom).then(res => {
                  let arr3 = res.data.data;
                  for (let n = 0; n < arr3.length; n++) {
                    arr3[n].parameterIdentifierlabel =
                      arr3[n].parameterIdentifier;
                  }
                  this.addForm.parameterIdentifierValue = arr3;
                  this.editForm.parameterIdentifierValue = arr3;
                });
              }
            } else if (
              array[0].channelInterfaceId !== "param" &&
              storeVale !== undefined
            ) {
              let arr2 = res.data.data;
              for (let j = 0; j < arr2.length; j++) {
                if (arr2[j].channelInterfaceId === storeVale) {
                  this.parameterFrom = arr2[j].processNodeId;
                }
                queryChannelIdCompare(this.parameterFrom).then(res => {
                  let arr3 = res.data.data;
                  for (let n = 0; n < arr3.length; n++) {
                    arr3[n].parameterIdentifierlabel =
                      arr3[n].parameterIdentifier;
                  }
                  this.addForm.parameterIdentifierValue = arr3;
                  this.editForm.parameterIdentifierValue = arr3;
                });
              }
            }
          }
        });
      }
    },
    // 打开新增并重置数据
    handleOpenAddForm() {
      this.dialogFormVisible = true;
      this.addForm.channelParameterId = "";
      this.addForm.channelInterfaceId = "";
      this.addForm.parameterIdentifier = "";
      this.addForm.processParameterType = "";
      this.addForm.defaultValue = "";
    },
    // 新增参数对照
    handleAdd(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let endV;
          let id = this.$route.query.id;
          if (this.form.processNodeId === "final") {
            endV = "";
          } else {
            endV = this.form.processNodeId;
          }
          addCompare(
            Object.assign({
              processNodeId: endV,
              serviceInterfaceId: id,
              nodeParameterId: this.addForm.channelParameterId,
              parameterFrom: this.parameterFrom,
              parameterIdentifier: this.addForm.parameterIdentifier,
              processParameterType: this.addForm.processParameterType,
              defaultValue: this.addForm.defaultValue
            })
          ).then(res => {
            this.dialogFormVisible = false;
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
            this.handleSearch(this.val);
            this.tableLoading = false;
          });
        } else {
          return false;
        }
      });
    },
    // 删除参数对照
    handleRowDel(row) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableLoading = true;
          delCompare(row.processParameterId).then(res => {
            this.$message({
              showClose: true,
              type: "success",
              message: "删除成功!"
            });
            this.handleSearch(this.val);
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
      this.editTitle = "查询参数对照信息";
      this.dialogQueryFormVisible = true;
      this.dialogEditFormVisible = true;
      let id = this.$route.query.id;
      this.editForm.serviceInterfaceId = id;
      this.editForm.defaultValue = row.defaultValue;
      this.editForm.channelParameterId = row.nodeParameterId;
      this.editForm.channelInterfaceId = row.parameterFrom;
      this.editForm.parameterIdentifier = row.parameterIdentifier;
      this.editForm.processNodeId = row.processNodeId;
      this.editForm.processParameterId = row.processParameterId;
      this.editForm.processParameterType = row.processParameterType;
      this.editForm.version = row.version;
    },
    // 编辑参数对照
    handleOpenEdit(row) {
      this.isQuery = true;
      this.editTitle = "编辑参数对照信息";
      this.dialogQueryFormVisible = false;
      this.dialogEditFormVisible = true;
      let id = this.$route.query.id;
      this.editForm.serviceInterfaceId = id;
      this.editForm.defaultValue = row.defaultValue;

      let nodeParamlabel =
        row.nodeParameterName + " (" + row.nodeParameterId + ")";
      let nodeParameterId = row.nodeParameterId;
      let obj = {
        channelParameterId: nodeParameterId,
        nodeParamlabel: nodeParamlabel
      };
      this.editForm.nodeParamValue.push(obj);
      this.editForm.channelParameterId = row.nodeParameterId;
      this.editForm.channelInterfaceId = row.parameterFrom;
      this.editForm.parameterIdentifier = row.parameterIdentifier;
      this.editForm.processNodeId = row.processNodeId;
      this.editForm.processParameterId = row.processParameterId;
      this.editForm.processParameterType = row.processParameterType;
      this.editForm.version = row.version;
    },
    // 编辑参数对照
    handleEdit(formName) {
      this.tableLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$route.query.id;
          putCompare(
            Object.assign({
              defaultValue: this.editForm.defaultValue,
              nodeParameterId: this.editForm.channelParameterId,
              parameterFrom: this.editForm.channelInterfaceId,
              parameterIdentifier: this.editForm.parameterIdentifier,
              processNodeId: this.form.processNodeId,
              processParameterId: this.editForm.processParameterId,
              processParameterType: this.editForm.processParameterType,
              serviceInterfaceId: id,
              version: this.editForm.version
            })
          )
            .then(() => {
              this.$message({
                showClose: true,
                message: "修改成功",
                type: "success"
              });
              this.dialogEditFormVisible = false;
              this.tableLoading = false;
              this.handleSearch(this.val);
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

  .bottom-space {
    margin-bottom: 15px;
  }

  .input-width {
    width: 195px;
  }
}
</style>
