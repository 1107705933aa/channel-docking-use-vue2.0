<template>
	<div id="access-provider">
		<!-- 检索 -->
		<el-form class="el-row-space" ref="form" :model="form" label-width="100px" label-position="left">
			<el-row>
				<el-col :span="7">
					<el-form-item class="clear-space" label="渠道接口编号:" prop="value">
						<el-input class="input-width" size="mini" v-model="form.channelInterfaceId" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item class="clear-space" label="渠道接口类型:">
						<el-select v-model="form.channelInterfaceType" placeholder="请选择" size="mini">
							<el-option v-for="item in form.typeValue" :key="item.channelInterfaceType" :label="item.label" :value="item.channelInterfaceType"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item class="clear-space" label="渠道接口名称:">
						<el-input class="input-width" size="mini" v-model="form.channelInterfaceName" placeholder="请输入内容"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row class="top-space">
				<el-col :span="7">
					<el-form-item class="clear-space" label="渠道商:">
						<el-select v-model="form.custId" placeholder="请选择" size="mini" :disabled="isChannel">
							<el-option v-for="item in form.idValue" :key="item.custId" :label="item.custName" :value="item.custId"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item class="clear-space" label="渠道接口状态:" prop="value">
						<el-select v-model="form.channelInterfaceStatus" placeholder="请选择" size="mini">
							<el-option v-for="item in form.statusValue" :key="item.channelInterfaceStatus" :label="item.label" :value="item.channelInterfaceStatus"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="7">
					<el-form-item class="clear-space">
						<el-button class="padding-space" icon="el-icon-search" type="primary" @click="handleSearch" size="mini">检索</el-button>
						<el-button class="padding-space" icon="el-icon-delete" size="mini" @click="handleReset">重置</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<!-- 渠道接口入驻 -->
		<el-row class="el-row-space" v-if="cis_channel_interface_info_add">
			<el-col :span="24">
				<el-button class="padding-space" icon="el-icon-plus" type="primary" @click="dialogFormVisible = true" size="mini">渠道接口入驻</el-button>
			</el-col>
		</el-row>
		<!-- 新增渠道接口弹出框 -->
		<el-dialog title="新增渠道接口" :visible.sync="dialogFormVisible">
			<el-form :model="addForm" ref="addForm" :rules="rules" class="demo-ruleForm" label-width="110px" label-position="left">
				<el-row>
					<el-col :span="11">
						<el-form-item label="渠道商:" prop="channelInterfaceType">
							<el-select class="input-width" v-model="addForm.custId" placeholder="请选择" size="mini">
								<el-option v-for="item in addForm.custIdValue" :key="item.custId" :label="item.custName" :value="item.custId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="渠道接口类型:" prop="channelInterfaceType">
							<el-select class="input-width" v-model="addForm.channelInterfaceType" placeholder="请选择" size="mini">
								<el-option v-for="item in addForm.typeValue" :key="item.channelInterfaceType" :label="item.label" :value="item.channelInterfaceType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item label="渠道接口名称:" prop="channelInterfaceName">
							<el-input class="input-width" size="mini" v-model="addForm.channelInterfaceName" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item label="渠道接口概述:" prop="channelInterfaceInfo">
							<el-input class="input-width" size="mini" type="textarea" :rows="5" v-model="addForm.channelInterfaceInfo"
							 placeholder="请输入内容"></el-input>
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
		<el-table :data="tableData" border style="width: 97%" size="mini" :class="{'table-top':isActive}" :header-cell-style="{background:'#FAFAFA',color:'#252525'}"
		 v-loading="tableLoading">
			<el-table-column prop="channelInterfaceId" label="渠道接口编号" align="center"></el-table-column>
			<el-table-column prop="channelInterfaceTypeDesc" label="渠道接口类型" align="center"></el-table-column>
			<el-table-column prop="channelInterfaceName" label="渠道接口名称" align="center"></el-table-column>
			<el-table-column prop="channelInterfaceInfo" label="渠道接口概述" align="center"></el-table-column>
			<el-table-column prop="channelInterfaceStatusDesc" label="渠道接口状态" align="center"></el-table-column>
			<el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
			<el-table-column prop="createUser" label="发布人" align="center"></el-table-column>
			<el-table-column label="操作" width="220" align="center">
				<template slot-scope="scope">
					<el-button @click="handleOpenStrategy(scope.row)" icon="el-icon-bell" type="text" size="small" class="clear-space"
					 style="padding-right:7px;">执行策略</el-button>
					<el-button @click="handlegetParam(scope.row)" icon="el-icon-tickets" type="text" size="small" class="clear-space"
					 style="padding-right:7px;">参数明细</el-button>
					<el-button @click="handleOpenQuery(scope.row)" icon="el-icon-view" type="text" size="small" class="clear-space"
					 style="padding-right:7px;">查询</el-button>
					<el-button v-if="cis_channel_interface_info_edit" @click="handleOpenEdit(scope.row)" icon="el-icon-edit" type="text"
					 size="small" class="clear-space" style="padding-right:7px;">编辑</el-button>
					<el-button v-if="cis_channel_interface_info_del" @click="handleRowDel(scope.row)" icon="el-icon-delete" type="text"
					 size="small" class="clear-space">删除</el-button>
					<el-button v-if="cis_channel_interface_info_audit" @click="handleOpenCheck(scope.row)" icon="el-icon-document-checked"
					 type="text" size="small" class="clear-space" style="padding-right:7px;">审核</el-button>
					<!-- 禁用操作 -->
					<el-popover placement="top" width="190" v-model="scope.row.prohibitVisible">
						<p>
							<i class="el-icon-warning"></i> &nbsp;
							<span class="popover-content">该行为将使渠道接口被禁用，是否继续？</span>
						</p>
						<div style="text-align: right; margin: 0">
							<el-button type="text" class="cancel-style" size="mini" @click="scope.row.prohibitVisible = false">取消</el-button>
							<el-button type="primary" class="button-style" size="mini" @click="handleForbid(scope.row)">禁用</el-button>
						</div>
						<el-button v-if="cis_channel_interface_info_disable" icon="el-icon-remove-outline" slot="reference" type="text"
						 size="small" class="clear-space">禁用</el-button>
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="block page">
			<el-pagination background :page-size="page.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="page.currentPage" :page-sizes="[10]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
			 :small="true"></el-pagination>
		</div>
		<!-- 编辑渠道接口弹出框 -->
		<el-dialog :title="editTitle" :visible.sync="dialogEditFormVisible">
			<el-form :model="editForm" ref="editForm" :rules="rules" class="demo-ruleForm" label-width="110px" label-position="left">
				<el-row>
					<el-col :span="11" v-if="hideData">
						<el-form-item class="clear-space" label="渠道接口编号:">
							<el-input class="input-width" size="mini" v-model="editForm.channelInterfaceId" placeholder="请输入内容" :disabled="dialogQueryFormVisible"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item class="clear-space" label="渠道接口类型:" prop="channelInterfaceType">
							<el-select v-model="editForm.channelInterfaceType" :disabled="dialogQueryFormVisible" placeholder="请选择" size="mini">
								<el-option v-for="item in editForm.typeValue" :key="item.channelInterfaceType" :label="item.label" :value="item.channelInterfaceType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="渠道接口名称:" prop="channelInterfaceName">
							<el-input class="input-width" size="mini" v-model="editForm.channelInterfaceName" placeholder="请输入内容" :disabled="dialogQueryFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="渠道接口概述:" prop="channelInterfaceInfo">
							<el-input class="input-width" size="mini" type="textarea" :rows="5" v-model="editForm.channelInterfaceInfo"
							 placeholder="请输入内容" :disabled="dialogQueryFormVisible"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2" v-if="hideData">
						<el-form-item class="clear-space" label="版本号:" prop="version">
							<el-input class="input-width" size="mini" v-model="editForm.version" placeholder="请输入内容" :disabled="dialogQueryFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditFormVisible = false" size="small">取 消</el-button>
				<el-button v-if="isQuery" type="primary" @click="handleEdit('editForm')" size="small">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 执行策略弹出框 -->
		<el-dialog title="执行策略操作" :visible.sync="dialogStrategyFormVisible">
			<el-form :model="strategyForm" ref="strategyForm" :rules="rules" class="demo-ruleForm" label-width="138px"
			 label-position="left">
				<el-row>
					<el-col :span="11" v-if="hideData">
						<el-form-item class="clear-space" label="渠道接口编号:">
							<el-input class="input-width-excution" size="mini" v-model="strategyForm.channelInterfaceId" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item class="clear-space" label="加密策略编号:" prop="encryptionPolicyId">
							<el-select class="input-width-excution" v-model="strategyForm.encryptionPolicyId" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.encryptionPolicyIdValue" :key="item.encryptionPolicyId" :label="item.encryptionPolicyName"
								 :value="item.encryptionPolicyId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="执行策略类型:" prop="executionPolicyType">
							<el-select class="input-width-excution" v-model="strategyForm.executionPolicyType" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.executionPolicyTypeValue" :key="item.executionPolicyType" :label="item.label"
								 :value="item.executionPolicyType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="请求报文类型编号:" prop="inputInterfaceMessageId">
							<el-select class="input-width-excution" v-model="strategyForm.inputInterfaceMessageId" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.inputInterfaceMessageIdValue" :key="item.inputInterfaceMessageId" :label="item.interfaceMessageName"
								 :value="item.inputInterfaceMessageId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="接口协议编号:" prop="interfaceProtocolId">
							<el-select class="input-width-excution" v-model="strategyForm.interfaceProtocolId" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.interfaceProtocolIdValue" :key="item.interfaceProtocolId" :label="item.interfaceProtocolName"
								 :value="item.interfaceProtocolId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="返回报文类型编号:" prop="outputInterfaceMessageId">
							<el-select class="input-width-excution" v-model="strategyForm.outputInterfaceMessageId" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.outputInterfaceMessageIdValue" :key="item.outputInterfaceMessageId"
								 :label="item.interfaceMessageName" :value="item.outputInterfaceMessageId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="协议处理方法名:" prop="protocolMethodName">
							<el-input class="input-width-excution" size="mini" v-model="strategyForm.protocolMethodName" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="协议处理地址:" prop="protocolServiceAddress">
							<el-input class="input-width-excution" size="mini" v-model="strategyForm.protocolServiceAddress" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="协议渠道服务名:" prop="protocolServiceName">
							<el-input class="input-width-excution" size="mini" v-model="strategyForm.protocolServiceName" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="加密秘钥编号:" prop="secretKeyId">
							<el-select class="input-width-excution" v-model="strategyForm.secretKeyId" placeholder="请选择" size="mini">
								<el-option v-for="item in strategyForm.secretKeyIdValue" :key="item.secretKeyId" :label="item.label" :value="item.secretKeyId"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogStrategyFormVisible = false" size="small">取 消</el-button>
				<el-button @click="handleStrategyDele" type="warning" size="small">删 除</el-button>
				<el-button v-if="isQuery" type="primary" @click="handleStrategyEdit('strategyForm')" size="small">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 审核渠道接口弹出框 -->
		<el-dialog title="审核渠道接口信息" :visible.sync="dialogCheckFormVisible">
			<el-form :model="checkForm" label-width="100px">
				<el-row>
					<el-col :span="11" v-if="hideData">
						<el-form-item class="clear-space" label="渠道接口编号:">
							<el-input class="input-width" size="mini" v-model="checkForm.channelInterfaceId" placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item class="clear-space" label="渠道接口类型:">
							<el-select disabled v-model="checkForm.channelInterfaceType" placeholder="请选择" size="mini">
								<el-option v-for="item in checkForm.typeValue" :key="item.channelInterfaceType" :label="item.label" :value="item.channelInterfaceType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="渠道接口名称:">
							<el-input class="input-width" size="mini" v-model="checkForm.channelInterfaceName" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row class="top-space">
					<el-col :span="11">
						<el-form-item class="clear-space" label="渠道接口概述:">
							<el-input class="input-width" size="mini" type="textarea" :rows="5" v-model="checkForm.channelInterfaceInfo"
							 placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="版本号:">
							<el-input class="input-width" size="mini" v-model="checkForm.version" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
				</el-row>
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
							<el-input size="mini" v-model="paramForm.channelInterfaceId" placeholder="请输入内容" disabled></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11">
						<el-form-item label="参数类型:">
							<el-select @change="handlegetParam" v-model="paramForm.channelParameterType" placeholder="请选择" size="mini">
								<el-option v-for="item in paramForm.typeValue" :key="item.channelParameterType" :label="item.label" :value="item.channelParameterType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5" class="top-space">
						<span v-if="cis_channel_parameter_list_add">
							<el-button v-if="isAdd" @click="handleAddParam" icon="el-icon-plus" type="primary" size="mini">新增</el-button>
						</span>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="20" v-if="isContent">
						<el-form-item class="clear-space" label="参数内容:">
							<el-input class="text-width" type="textarea" :rows="10" size="mini" v-model="paramForm.paramemterStrut"
							 placeholder="请输入内容"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<!-- 参数表格 -->
			<el-row v-if="isParamTable">
				<el-col :span="24">
					<el-table :data="tableParamData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all
					 size="mini" :header-cell-style="{background:'#FAFAFA',color:'#252525'}" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
						<el-table-column prop="channelParameterIdentifier" label="参数标识:" align="center"></el-table-column>
						<el-table-column prop="parameterDataTypeDesc" label="参数类型:" align="center"></el-table-column>
						<el-table-column prop="channelParameterName" label="参数名称:" align="center"></el-table-column>
						<el-table-column fixed="right" label="操作" width="190" align="center">
							<template slot-scope="scope">
								<el-button @click="handleOpenParamQuery(scope.row)" icon="el-icon-view" type="text" size="small" class="clear-space">查询</el-button>
								<el-button v-if="cis_channel_parameter_list_edit" @click="handleOpenEditParam(scope.row)" icon="el-icon-edit"
								 type="text" size="small">编辑</el-button>
								<el-button v-if="cis_channel_parameter_list_del" @click="handleRowDelParam(scope.row)" icon="el-icon-delete"
								 type="text" size="small">删除</el-button>
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
			<el-form :model="editParamForm" ref="editParamForm" :rules="rules" class="demo-ruleForm" label-width="100px"
			 label-position="left">
				<el-row>
					<el-col :span="11">
						<el-form-item class="clear-space" label="参数名:">
							<el-input class="input-width" size="mini" v-model="editParamForm.channelParameterName" placeholder="请输入内容"
							 :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="参数说明:">
							<el-input class="input-width" size="mini" v-model="editParamForm.channelParameterInfo" placeholder="请输入内容"
							 :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item class="clear-space" label="参数正则类型:">
							<el-select v-model="editParamForm.parameterRegularType" :disabled="dialogQueryParamFormVisible" placeholder="请选择"
							 size="mini">
								<el-option v-for="item in editParamForm.typeValue" :key="item.parameterRegularType" :label="item.label" :value="item.parameterRegularType"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="自定义正则:">
							<el-input class="input-width" size="mini" v-model="editParamForm.customRegular" placeholder="请输入内容" :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item class="clear-space" label="最小长度:">
							<el-input class="input-width" size="mini" v-model="editParamForm.minLength" placeholder="请输入内容" :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="最大长度:">
							<el-input class="input-width" size="mini" v-model="editParamForm.maxLength" placeholder="请输入内容" :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item class="clear-space" label="是否允许为空:">
							<el-select v-model="editParamForm.isEmpty" :disabled="dialogQueryParamFormVisible" placeholder="请选择" size="mini">
								<el-option v-for="item in editParamForm.isEmptyValue" :key="item.isEmpty" :label="item.label" :value="item.isEmpty"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="默认值:">
							<el-input class="input-width" size="mini" v-model="editParamForm.defaultValue" placeholder="请输入内容" :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item class="clear-space" label="排序:">
							<el-input class="input-width" size="mini" v-model="editParamForm.sequence" placeholder="请输入内容" :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="11" :push="2">
						<el-form-item class="clear-space" label="参数标识:" prop="channelParameterIdentifier">
							<el-input class="input-width" size="mini" v-model="editParamForm.channelParameterIdentifier" placeholder="请输入内容"
							 :disabled="dialogQueryParamFormVisible"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEditParamFormVisible = false" size="small">取 消</el-button>
				<el-button v-if="isParamQuery" type="primary" @click="putParamServe('editParamForm')" size="small">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import router from "../../../../router/router";
	import store from "@/store";
	import {
		addChannel,
		delChannel,
		putChannel,
		queryChannel,
		putChannelCheck,
		addStrategy,
		delStrategy,
		queryStrategy
	} from "@/api/middle/channel";
	import {
		addParamC,
		delParamC,
		putParamC,
		queryParamC
	} from "@/api/middle/paramc";
	import {
		queryProvider
	} from "@/api/middle/user";
	import {
		queryMessage
	} from "@/api/middle/message";
	import {
		queryAgree
	} from "@/api/middle/agree";
	import {
		queryEncryption
	} from "@/api/middle/encryption";
	import {
		mapGetters
	} from "vuex";
	export default {
		name: "ChannelInterface",
		data() {
			return {
				value: "",
				// 检索内容input
				form: {
					channelInterfaceId: "",
					// 检索内容select
					typeValue: [{
							channelInterfaceType: "0",
							label: "系统接口"
						},
						{
							channelInterfaceType: "1",
							label: "公共接口"
						},
						{
							channelInterfaceType: "2",
							label: "业务接口"
						},
						{
							channelInterfaceType: "3",
							label: "鉴权（登录）接口"
						}
					],
					channelInterfaceType: "",
					channelInterfaceName: "",
					idValue: [{
						custId: "",
						custName: ""
					}],
					custId: "",
					statusValue: [{
							channelInterfaceStatus: "0",
							label: "待审核"
						},
						{
							channelInterfaceStatus: "1",
							label: "审核通过"
						},
						{
							channelInterfaceStatus: "2",
							label: "审核未通过"
						},
						{
							channelInterfaceStatus: "3",
							label: "禁用"
						}
					],
					channelInterfaceStatus: ""
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
					channelInterfaceType: [{
						required: true,
						message: "请选择渠道接口类型",
						trigger: "blur"
					}],
					channelInterfaceName: [{
						required: true,
						message: "请输入渠道接口名称",
						trigger: "blur"
					}],
					channelInterfaceInfo: [{
						required: true,
						message: "请选择渠道接口概述",
						trigger: "blur"
					}],
					version: [{
						required: true,
						message: "请输入版本号",
						trigger: "blur"
					}],
					channelParameterIdentifier: [{
						required: true,
						message: "请输入渠道参数标识",
						trigger: "blur"
					}],
					encryptionPolicyId: [{
						required: true,
						message: "请选择加密策略类型",
						trigger: "blur"
					}],
					executionPolicyType: [{
						required: true,
						message: "请选择执行策略类型",
						trigger: "blur"
					}],
					inputInterfaceMessageId: [{
						required: true,
						message: "请选择请求报文类型",
						trigger: "blur"
					}],
					interfaceProtocolId: [{
						required: true,
						message: "请选择接口协议",
						trigger: "blur"
					}],
					outputInterfaceMessageId: [{
						required: true,
						message: "请选择返回报文类型",
						trigger: "blur"
					}],

					protocolMethodName: [{
						required: true,
						message: "请输入协议处理方法名",
						trigger: "blur"
					}],
					protocolServiceAddress: [{
						required: true,
						message: "请输入协议处理地址",
						trigger: "blur"
					}],
					protocolServiceName: [{
						required: true,
						message: "请输入协议渠道服务名",
						trigger: "blur"
					}],
					secretKeyId: [{
						required: true,
						message: "请输入加密秘钥编号",
						trigger: "blur"
					}]
				},
				// 查询弹出框
				dialogQueryFormVisible: false,
				dialogQueryParamFormVisible: false,
				isParamQuery: true,
				editTitle: "",
				isQuery: true,
				editParamTitle: "",
				// 新建渠道接口弹出框
				dialogFormVisible: false,
				// 审核渠道接口
				dialogCheckFormVisible: false,
				// 参数明细弹出框
				dialogParamFormVisible: false,
				// 编辑参数明细弹出框
				dialogEditParamFormVisible: false,
				// 请求头
				headers: {
					Authorization: "Bearer " + store.getters.access_token
				},
				// 编辑渠道接口弹出框
				dialogEditFormVisible: false,
				// 执行策略新增、修改
				dialogStrategyFormVisible: false,
				// 新增渠道接口插入数据
				addForm: {
					custIdValue: [{
						custId: "",
						custName: ""
					}],
					custId: "",
					typeValue: [{
							channelInterfaceType: "0",
							label: "系统接口"
						},
						{
							channelInterfaceType: "1",
							label: "公共接口"
						},
						{
							channelInterfaceType: "2",
							label: "渠道接口"
						},
						{
							channelInterfaceType: "3",
							label: "鉴权（登录）接口"
						}
					],
					channelInterfaceType: "",
					channelInterfaceName: "",
					channelInterfaceInfo: ""
				},
				// 执行策略信息
				strategyForm: {
					channelInterfaceId: "",
					encryptionPolicyId: "",
					encryptionPolicyIdValue: [{
						encryptionPolicyId: "",
						encryptionPolicyName: ""
					}],
					executionPolicyType: "",
					executionPolicyTypeValue: [{
							executionPolicyType: "0",
							label: "独立"
						},
						{
							executionPolicyType: "1",
							label: "合并"
						}
					],
					inputInterfaceMessageId: "",
					inputInterfaceMessageIdValue: [{
						inputInterfaceMessageId: "",
						interfaceMessageName: ""
					}],

					interfaceProtocolId: "",
					interfaceProtocolIdValue: [{
						interfaceProtocolId: "",
						interfaceProtocolName: ""
					}],
					outputInterfaceMessageId: "",
					outputInterfaceMessageIdValue: [{
						outputInterfaceMessageId: "",
						interfaceMessageName: ""
					}],
					protocolMethodName: "",
					protocolServiceAddress: "",
					protocolServiceName: "",
					secretKeyId: "",
					secretKeyIdValue: [{
						secretKeyId: "0",
						label: "哈哈"
					}]
				},
				// 编辑渠道接口类型信息
				editForm: {
					channelInterfaceId: "",
					typeValue: [{
							channelInterfaceType: "0",
							label: "系统接口"
						},
						{
							channelInterfaceType: "1",
							label: "公共接口"
						},
						{
							channelInterfaceType: "2",
							label: "渠道接口"
						},
						{
							channelInterfaceType: "3",
							label: "鉴权（登录）接口"
						}
					],
					channelInterfaceType: "",
					channelInterfaceName: "",
					channelInterfaceInfo: "",
					version: ""
				},
				// 审核渠道接口信息
				checkForm: {
					channelInterfaceId: "",
					typeValue: [{
							channelInterfaceType: "0",
							label: "系统接口"
						},
						{
							channelInterfaceType: "1",
							label: "公共接口"
						},
						{
							channelInterfaceType: "2",
							label: "渠道接口"
						},
						{
							channelInterfaceType: "3",
							label: "鉴权（登录）接口"
						}
					],
					channelInterfaceType: "",
					channelInterfaceName: "",
					channelInterfaceInfo: "",
					version: "",
					auditReason: ""
				},
				// 参数明细
				isParamTable: true,
				isContent: true,
				isQuery: true,
				isAdd: true,
				// 新增参数数据
				paramForm: {
					channelInterfaceId: "",
					typeValue: [{
							channelParameterType: "0",
							label: "入参"
						},
						{
							channelParameterType: "1",
							label: "出参"
						}
					],
					channelParameterType: "入参",
					paramemterStrut: ""
				},
				// 参数表格数据
				tableParamData: [],
				// 编辑参数明细信息
				editParamForm: {
					channelParameterName: "",
					channelParameterInfo: "",
					typeValue: [{
						parameterRegularType: "",
						label: ""
					}],
					parameterRegularType: "",
					customRegular: "",
					minLength: "",
					maxLength: "",
					isEmptyValue: [{
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
					channelParameterIdentifier: "",
					defaultValue: ""
				},
				// 刷新参数明细的参数
				refreshParam: {
					channelInterfaceId: "",
					channelParameterType: ""
				},
				// 暂存参数查询的id
				channelInterfaceId: "",
				// 是否渠道商可检索
				isChannel: false
			};
		},
		computed: {
			...mapGetters(["permissions"])
		},
		created() {
			this.cis_channel_interface_info_add = this.permissions[
				"cis_channel_interface_info_add"
			];
			this.cis_channel_interface_info_edit = this.permissions[
				"cis_channel_interface_info_edit"
			];
			this.cis_channel_interface_info_del = this.permissions[
				"cis_channel_interface_info_del"
			];
			this.cis_channel_interface_info_audit = this.permissions[
				"cis_channel_interface_info_audit"
			];
			this.cis_channel_interface_info_disable = this.permissions[
				"cis_channel_interface_info_disable"
			];
			// 参数管理
			this.cis_channel_parameter_list_add = this.permissions[
				"cis_channel_parameter_list_add"
			];
			this.cis_channel_parameter_list_edit = this.permissions[
				"cis_channel_parameter_list_edit"
			];
			this.cis_channel_parameter_list_del = this.permissions[
				"cis_channel_parameter_list_del"
			];
			if (this.cis_channel_interface_info_add === undefined) {
				this.isActive = true;
			}
		},
		mounted() {
			// 查询渠道接口
			this.getChan();
			this.getCustId();
		},
		methods: {
			// 检索
			handleSearch() {
				this.tableLoading = true;
				let newForm = JSON.parse(JSON.stringify(this.form));
				delete newForm.idValue;
				delete newForm.statusValue;
				delete newForm.typeValue;
				delete this.page.total;
				if (newForm.channelInterfaceId === "") {
					delete newForm.channelInterfaceId;
				}
				if (newForm.channelInterfaceName === "") {
					delete newForm.channelInterfaceName;
				}
				if (newForm.channelInterfaceType === "") {
					delete newForm.channelInterfaceType;
				}
				if (newForm.custId === "") {
					delete newForm.custId;
				}
				if (newForm.channelInterfaceStatus === "") {
					delete newForm.channelInterfaceStatus;
				}
				let par = { ...newForm,
					...this.page
				};
				queryChannel(Object.assign(par))
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
				this.form.channelInterfaceId = "";
				this.form.channelInterfaceType = "";
				this.form.channelInterfaceName = "";
				this.form.custId = "";
				this.form.channelInterfaceStatus = "";
			},
			// 分页
			handleSizeChange(pageSize) {
				// 每页 pageSize 条
				this.page.pageSize = pageSize;
				this.getChan();
			},
			handleCurrentChange(currentPage) {
				// 当前页: currentPage
				this.page.currentPage = currentPage;
				this.getChan();
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
			// 重置新增渠道接口表单
			handleResetAddForm() {
				this.addForm.channelInterfaceName = "";
				this.addForm.channelInterfaceInfo = "";
			},
			// 新增渠道接口
			handleAdd(formName) {
				this.tableLoading = true;
				this.$refs[formName].validate(valid => {
					if (valid) {
						addChannel({
							channelInterfaceType: this.addForm.channelInterfaceType,
							channelInterfaceName: this.addForm.channelInterfaceName,
							channelInterfaceInfo: this.addForm.channelInterfaceInfo,
							custId: this.addForm.custId
						}).then(res => {
							this.dialogFormVisible = false;
							this.$message({
								showClose: true,
								message: "添加成功",
								type: "success"
							});
							this.getCustId();
							this.getChan();
							this.handleResetAddForm();
							this.tableLoading = false;
						});
					} else {
						this.getChan();
						return false;
					}
				});
			},
			// 删除渠道接口
			handleRowDel(row) {
				if (row.channelInterfaceStatusDesc === "待审核") {
					this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
							confirmButtonText: "确定",
							cancelButtonText: "取消",
							type: "warning"
						})
						.then(() => {
							this.tableLoading = true;
							delChannel(row.channelInterfaceId).then(res => {
								this.$message({
									showClose: true,
									type: "success",
									message: "删除成功!"
								});
								this.getChan();
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
						row.channelInterfaceStatusDesc === "审核通过" ||
						row.channelInterfaceStatusDesc === "审核未通过"
					) {
						this.$message({
							showClose: true,
							message: "已审核",
							type: "success"
						});
					} else if (row.channelInterfaceStatusDesc === "禁用") {
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
				this.editTitle = "查询渠道接口信息";
				this.dialogQueryFormVisible = true;
				this.dialogEditFormVisible = true;
				this.editForm = row;
			},
			// 编辑渠道接口
			handleOpenEdit(row) {
				this.isQuery = true;
				this.editTitle = "编辑渠道接口信息";
				this.dialogQueryFormVisible = false;
				if (row.channelInterfaceStatusDesc === "待审核") {
					this.dialogEditFormVisible = true;
					this.editForm.channelInterfaceId = row.channelInterfaceId;
					this.editForm.channelInterfaceType = row.channelInterfaceType;
					this.editForm.channelInterfaceName = row.channelInterfaceName;
					this.editForm.channelInterfaceInfo = row.channelInterfaceInfo;
					this.editForm.version = row.version;
				} else {
					if (
						row.channelInterfaceStatusDesc === "审核通过" ||
						row.channelInterfaceStatusDesc === "审核未通过"
					) {
						this.$message({
							showClose: true,
							message: "已审核",
							type: "success"
						});
					} else if (row.channelInterfaceStatusDesc === "禁用") {
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
						putChannel({
								channelInterfaceId: this.editForm.channelInterfaceId,
								channelInterfaceType: this.editForm.channelInterfaceType,
								channelInterfaceName: this.editForm.channelInterfaceName,
								channelInterfaceInfo: this.editForm.channelInterfaceInfo,
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
								this.getChan();
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
						this.getChan();
						return false;
					}
				});
			},
			// 查询渠道商
			getCustId() {
				queryProvider(
					Object.assign({
						current: this.page.currentPage,
						size: 999990000000,
						custType: 1
					})
				).then(res => {
					let array = res.data.data.records;
					this.addForm.custIdValue = array;
					this.form.idValue = array;
					this.tableLoading = false;
				});
			},
			// 查询接口协议
			getAgree() {
				queryAgree().then(res => {
					let arr = res.data.data.records;
					this.strategyForm.interfaceProtocolIdValue = arr;
				});
			},
			// 查询报文
			getMessage() {
				queryMessage().then(res => {
					let array = res.data.data.records;
					for (let i = 0; i < array.length; i++) {
						array[i].inputInterfaceMessageId = array[i].interfaceMessageId;
						array[i].outputInterfaceMessageId = array[i].interfaceMessageId;
					}
					this.strategyForm.inputInterfaceMessageIdValue = array;
					this.strategyForm.outputInterfaceMessageIdValue = array;
				});
			},
			// 查询加密协议
			getEncryption() {
				queryEncryption().then(res => {
					let array = res.data.data.records;
					this.strategyForm.encryptionPolicyIdValue = array;
				});
			},
			// 执行策略新增、修改
			handleOpenStrategy(row) {
				this.dialogStrategyFormVisible = true;
				this.strategyForm.channelInterfaceId = row.channelInterfaceId;
				this.getAgree();
				this.getMessage();
				this.getEncryption();
				// 查询执行策略
				queryStrategy(row.channelInterfaceId).then(res => {
					console.log(row.channelInterfaceId)
					if (res.data.data.inputInterfaceMessageId !== "") {
						let array = res.data.data;
						this.strategyForm.executionPolicyId = array.executionPolicyId;
						this.strategyForm.encryptionPolicyId = array.encryptionPolicyId;
						this.strategyForm.executionPolicyType = array.executionPolicyType;
						this.strategyForm.inputInterfaceMessageId =
							array.inputInterfaceMessageId;
						this.strategyForm.interfaceProtocolId = array.interfaceProtocolId;
						this.strategyForm.outputInterfaceMessageId =
							array.outputInterfaceMessageId;
						this.strategyForm.protocolMethodName = array.protocolMethodName;
						this.strategyForm.protocolServiceAddress =
							array.protocolServiceAddress;
						this.strategyForm.protocolServiceName = array.protocolServiceName;
						this.strategyForm.secretKeyId = array.secretKeyId;
					}
				});
			},
			handleStrategyEdit(formName) {
				this.tableLoading = true;
				this.$refs[formName].validate(valid => {
					if (valid) {
						addStrategy(this.strategyForm)
							.then(() => {
								this.$message({
									showClose: true,
									message: "保存成功",
									type: "success"
								});
								this.dialogStrategyFormVisible = false;
								this.getChan();
								this.tableLoading = false;
							})
							.catch(err => {
								this.$message({
									showClose: true,
									message: "保存失败",
									type: "error"
								});
								this.getChan();
								this.tableLoading = false;
							});
					} else {
						return false;
					}
				});
			},
			// 执行策略删除
			handleStrategyDele() {
				this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						delStrategy(this.strategyForm.executionPolicyId).then(() => {
							this.$message({
								showClose: true,
								type: "success",
								message: "删除成功!"
							});
							this.dialogStrategyFormVisible = false;
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			// 查询表格数据
			getChan() {
				this.tableLoading = true;
				let custId = this.$route.query.custId;
				if (custId !== undefined) {
					this.isChannel = true;
					this.form.custId = custId;
				}
				queryChannel(
						Object.assign({
							current: this.page.currentPage,
							size: this.page.pageSize,
							custId: custId
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
				if (row.channelInterfaceStatusDesc !== "禁用") {
					this.dialogCheckFormVisible = true;
					this.checkForm.channelInterfaceId = row.channelInterfaceId;
					this.checkForm.channelInterfaceType = row.channelInterfaceType;
					this.checkForm.channelInterfaceName = row.channelInterfaceName;
					this.checkForm.channelInterfaceInfo = row.channelInterfaceInfo;
					this.checkForm.version = row.version;
					this.checkForm.auditReason = row.auditReason;
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
				putChannelCheck({
						channelInterfaceId: this.checkForm.channelInterfaceId,
						channelInterfaceStatus: 1,
						version: this.checkForm.version
					})
					.then(() => {
						this.$message({
							showClose: true,
							message: "审核成功",
							type: "success"
						});
						this.dialogCheckFormVisible = false;
						this.tableLoading = false;
						this.getChan();
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
				putChannelCheck({
						channelInterfaceId: this.checkForm.channelInterfaceId,
						channelInterfaceStatus: 2,
						version: this.checkForm.version
					})
					.then(() => {
						this.$message({
							showClose: true,
							message: "审核不通过成功",
							type: "success"
						});
						this.dialogCheckFormVisible = false;
						this.tableLoading = false;
						this.getChan();
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
				putChannelCheck({
						channelInterfaceId: row.channelInterfaceId,
						channelInterfaceStatus: 3,
						version: row.version
					})
					.then(() => {
						this.$message({
							showClose: true,
							message: "禁用成功",
							type: "success"
						});
						row.prohibitVisible = false;
						this.getChan();
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
				if (this.paramForm.channelParameterType === "入参") {
					this.paramForm.channelParameterType = "0";
				}
				if (row.channelInterfaceId !== undefined) {
					this.channelInterfaceId = row.channelInterfaceId;
				}
				queryParamC(
						Object.assign({
							channelInterfaceId: this.channelInterfaceId,
							channelParameterType: this.paramForm.channelParameterType
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
				this.refreshParam.channelInterfaceId = this.channelInterfaceId;
				this.refreshParam.channelParameterType = this.paramForm.channelParameterType;
				addParamC({
						channelInterfaceId: this.channelInterfaceId,
						channelParameterType: this.paramForm.channelParameterType,
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
						this.paramForm.channelParameterType = "0";
						this.paramForm.paramemterStrut = "";
					})
					.catch(err => {
						if (this.paramForm.channelParameterType === "0") {
							this.paramForm.channelParameterType = "0";
						} else if (this.paramForm.channelParameterType === "1") {
							this.paramForm.channelParameterType = "1";
						}
						this.paramForm.paramemterStrut = "";
						this.isContent = true;
						this.isAdd = true;
						this.isParamTable = false;
					});
			},
			// 删除参数
			handleRowDelParam(row) {
				let channelParameterId = row.id;
				// 刷新的参数
				this.refreshParam.channelInterfaceId = row.channelInterfaceId;
				this.refreshParam.channelParameterType = row.channelParameterType;
				this.$confirm("此操作将永久删除该条数据, 是否继续?", "删除", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						delParamC(channelParameterId).then(res => {
							this.$message({
								showClose: true,
								type: "success",
								message: "删除成功!"
							});
							queryParamC(
									Object.assign({
										channelInterfaceId: this.refreshParam.channelInterfaceId,
										channelParameterType: this.refreshParam.channelParameterType
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
				this.editParamForm.channelParameterName = row.channelParameterName;
				this.editParamForm.channelParameterInfo = row.channelParameterInfo;
				this.editParamForm.parameterRegularType = row.parameterRegularType;
				this.editParamForm.customRegular = row.customRegular;
				this.editParamForm.minLength = row.minLength;
				this.editParamForm.maxLength = row.maxLength;
				this.editParamForm.isEmpty = row.isEmpty;
				this.editParamForm.sequence = row.sequence;
				this.editParamForm.defaultValue = row.defaultValue;
				this.editParamForm.channelParameterIdentifier =
					row.channelParameterIdentifier;
				this.editParamForm.channelInterfaceId = row.channelInterfaceId;
				this.editParamForm.version = row.version;
				this.editParamForm.channelParameterId = row.id;
				// 刷新的参数
				this.refreshParam.channelInterfaceId = row.channelInterfaceId;
				this.refreshParam.channelParameterType = row.channelParameterType;
			},
			putParamServe(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						putParamC(this.editParamForm)
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
				queryParamC(
						Object.assign({
							channelInterfaceId: this.refreshParam.channelInterfaceId,
							channelParameterType: this.refreshParam.channelParameterType
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

		.left-space {
			margin-left: 10px;
		}

		.padding-space {
			padding: 10px 15px;
		}

		.input-width {
			width: 195px;
		}

		.input-width-excution {
			width: 170px;
		}

		.top-space {
			margin-top: 5px;
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
