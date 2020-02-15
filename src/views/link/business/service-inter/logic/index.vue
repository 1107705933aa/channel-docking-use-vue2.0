<template>
  <div id="interface-logic">
    <el-button
      v-if="cis_process_node_info_add"
      icon="el-icon-plus"
      class="left-space"
      type="primary"
      plain
      @click="handleOpenAdd"
    >新增节点</el-button>
    <el-button
      v-if="cis_process_node_info_del"
      class="left-space-delNode"
      icon="el-icon-delete"
      type="primary"
      plain
      @click="handleDelNodeLine"
    >删除点线</el-button>
    <el-button
      v-if="cis_process_node_info_edit"
      class="left-space-editLine"
      icon="el-icon-edit"
      :plain="true"
      type="info"
      @click="handleOpenEdit"
    >编辑连线</el-button>
    <el-button
      v-if="cis_process_node_info_save"
      class="left-space-edit"
      icon="el-icon-receiving"
      type="primary"
      plain
      @click="handleSavePic"
    >保 存</el-button>
    <div
      class="content-left"
      style="width: 60%; display: flex; justify-content: space-between;margin-left:10px;"
    >
      <div
        id="myDiagramDiv"
        style="flex-grow: 1; width:200px; height: 505px; background-color: rgb(40, 44, 52); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"
      >
        <canvas
          tabindex="0"
          width="885"
          height="825"
          style="position: absolute; top: 0px; left: 0px; z-index: 2; user-select: none; width: 805px; height: 750px; cursor: auto;"
        >This text is displayed if your browser does not support the Canvas HTML element.</canvas>
        <div style="position: absolute; overflow: auto; width: 805px; height: 740px; z-index: 1;">
          <div style="position: absolute; width: 1px; height: 1px;"></div>
        </div>
      </div>
    </div>
    <div class="content-right">
      <textarea id="mySavedModel" style="width:100%;height:500px"></textarea>
    </div>
    <!-- 新增节点 -->
    <el-dialog title="新增节点" :visible.sync="dialogAddFormVisible">
      <el-form
        :model="addForm"
        ref="addForm"
        :rules="rules"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="业务接口Id:">
              <el-input
                class="input-width"
                size="mini"
                v-model="addForm.serviceInterfaceId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="节点类型:" prop="processNodeType">
              <el-select
                v-model="addForm.processNodeType"
                @change="handleCurrentValue"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="item in addForm.nodeType"
                  :key="item.processNodeType"
                  :label="item.label"
                  :value="item.processNodeType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isChannel">
          <el-col :span="11">
            <el-form-item class="clear-space" label="渠道接口:" prop="channelInterfaceId">
              <el-select v-model="addForm.channelInterfaceId" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in addForm.channelType"
                  :key="item.channelInterfaceId"
                  :label="item.channelInterfaceName"
                  :value="item.channelInterfaceId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 连线编辑 -->
    <el-dialog title="连线编辑" :visible.sync="dialogEditFormVisible">
      <el-form
        :model="editForm"
        ref="editForm"
        :rules="rules"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="连线编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.processLineId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item class="clear-space" label="连线类型:" prop="processLineType">
              <el-select v-model="editForm.processLineType" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in editForm.lineType"
                  :key="item.processLineType"
                  :label="item.label"
                  :value="item.processLineType"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2">
            <el-form-item class="clear-space" label="并行标识:">
              <el-select v-model="editForm.parallelFlag" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in editForm.lineFlag"
                  :key="item.parallelFlag"
                  :label="item.label"
                  :value="item.parallelFlag"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item class="clear-space" label="排序:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.sequence"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item class="clear-space" label="业务接口编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.serviceInterfaceId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="开始节点编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.startNodeId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item class="clear-space" label="开始节点类型:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.startNodeType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="结束节点编号:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.endNodeId"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :push="2" v-if="hideData">
            <el-form-item class="clear-space" label="结束节点类型:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.endNodeType"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" v-if="hideData">
            <el-form-item class="clear-space" label="版本:">
              <el-input
                class="input-width"
                size="mini"
                v-model="editForm.version"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditLine('editForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import go from "gojs";
import { mapGetters } from "vuex";
import router from "../../../../../router/router";
import { addNode, delNode, queryNode } from "@/api/middle/node";
import {
  addEditLine,
  delLineInterfaceId,
  delLineId,
  queryLine
} from "@/api/middle/line";
import { queryChannel } from "@/api/middle/channel";
export default {
  data() {
    return {
      myDiagram: "",
      dialogAddFormVisible: false,
      dialogEditFormVisible: false,
      hideData: false,
      addForm: {
        serviceInterfaceId: "",
        channelType: [
          {
            channelInterfaceId: "",
            channelInterfaceName: ""
          }
        ],
        channelInterfaceId: "",
        nodeType: [
          {
            processNodeType: "0",
            label: "起始节点"
          },
          {
            processNodeType: "3",
            label: "自定义节点"
          },
          {
            processNodeType: "2",
            label: " 结束节点"
          }
        ],
        processNodeType: ""
      },
      isChannel: true,
      // 编辑连线
      editForm: {
        processLineId: "",
        processLineType: "",
        lineType: [
          {
            processLineType: "0",
            label: "自动"
          },
          {
            processLineType: "2",
            label: "手动"
          }
        ],
        parallelFlag: "1",
        lineFlag: [
          {
            parallelFlag: "1",
            label: "否"
          },
          {
            parallelFlag: "0",
            label: "是"
          }
        ],
        sequence: "",
        serviceInterfaceId: "",
        startNodeId: "",
        startNodeType: "",
        endNodeId: "",
        endNodeType: "",
        version: ""
      },
      // 储存连线上数据
      lineData: undefined,
      // 制定规则
      rules: {
        channelInterfaceId: [
          { required: true, message: "请选择渠道接口", trigger: "blur" }
        ],
        processNodeType: [
          { required: true, message: "请选择节点类型", trigger: "blur" }
        ],
        processLineType: [
          { required: true, message: "请输入连线类型", trigger: "blur" }
        ]
      },
      myDiagram: "",
      $: undefined,
      // 新增连线
      addLine: {
        cpllAddDtos: [],
        cpllUpdateDtos: []
      }
    };
  },
  mounted() {
    this.getChannel();
    this.init();
    this.getPic();
  },
  computed: {
    ...mapGetters(["permissions"])
  },
  created() {
    this.cis_process_node_info_add = this.permissions[
      "cis_process_node_info_add"
    ];
    this.cis_process_node_info_del = this.permissions[
      "cis_process_node_info_del"
    ];
    this.cis_process_node_info_edit = this.permissions[
      "cis_process_node_info_edit"
    ];
    this.cis_process_node_info_save = this.permissions[
      "cis_process_node_info_save"
    ];
  },
  methods: {
    // 画布的初始化
    init() {
      var _this = this;
      setTimeout(function() {
        var $ = go.GraphObject.make; // 用于构建对象
        var myDiagram = $(
          go.Diagram,
          "myDiagramDiv", // 构建div对象创建模型
          {
            LinkDrawn: showLinkLabel, // 此DiagrameEvent侦听器定义如下
            LinkRelinked: showLinkLabel,
            "undoManager.isEnabled": true, // 启用回退
            layout: $(
              go.TreeLayout, // 树排列
              { angle: 90, layerSpacing: 35 }
            )
          }
        );
        this.myDiagram = myDiagram;
        // 修改文档时，在标题中添加“*”并启用“保存”按钮
        // myDiagram.addDiagramListener()注册图标事件
        myDiagram.addDiagramListener("Modified", function() {
          var button = document.getElementById("SaveButton");
          if (button) button.disabled = !myDiagram.isModified;
          // indexOf("*") *号第一次出现的下标
          var idx = document.title.indexOf("*");
          if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
          } else {
            // substr(start,length) start起始下标，length为长度，没length代表长度无限，start为负数，则从尾部开始计算，长度-1，代表从倒数第一个开始，-2代表从倒数第二个开始；
            if (idx >= 0) document.title = document.title.substr(0, idx);
          }
        });
        // 节点模板的帮助器定义
        function nodeStyle() {
          return [
            // Node.location来自节点数据的“loc”属性，
            // 由Point.parse静态方法转换。
            // 如果Node.location被更改，它将更新节点数据的“loc”属性，
            // 使用Point.stringify静态方法转换回。
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
              go.Point.stringify
            ),
            {
              // Node.location位于每个节点的中心
              locationSpot: go.Spot.Center
            }
          ];
        }
        // 定义一个函数来创建一个通常是透明的“端口”。
        // “name”用作GraphObject.portId，
        // “align”用于确定端口相对于节点主体的位置，
        // “spot”用于控制链接与端口的连接方式以及端口是否，
        // 沿着节点的侧面延伸，
        // 布尔“output”和“input”参数控制用户是否可以从端口绘制链接。
        function makePort(name, align, spot, output, input) {
          var horizontal =
            align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
          // 端口基本上只是一个透明的矩形，沿着节点的边延伸，
          // 当鼠标经过它的时候就会变成彩色
          return $(go.Shape, {
            fill: "transparent", // 在mouseEnter事件处理程序中更改为颜色
            strokeWidth: 0, // no stroke
            width: horizontal ? NaN : 8, // 如果不是水平伸展，只有8宽
            height: !horizontal ? NaN : 8, // 如果不垂直伸展，只有8米高
            alignment: align, // 将端口与主形状对齐
            stretch: horizontal
              ? go.GraphObject.Horizontal
              : go.GraphObject.Vertical,
            portId: name, // 将此对象声明为“端口”
            fromSpot: spot, // 声明链接在此端口的连接位置
            fromLinkable: output, // 声明用户是否可以从此处绘制链接
            toSpot: spot, // 声明链接在此端口的连接位置
            toLinkable: input, // 声明用户是否可以在此绘制链接
            cursor: "pointer", // 显示不同的光标以指示潜在的链接点
            mouseEnter: function(e, port) {
              // 端口参数将是此形状
              if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
            },
            mouseLeave: function(e, port) {
              port.fill = "transparent";
            }
          });
        }
        function textStyle() {
          return {
            font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
            stroke: "#F8F8F8"
          };
        }
        // 为常规节点定义节点模板
        myDiagram.nodeTemplateMap.add(
          "", // 默认类别
          $(
            go.Node,
            "Table",
            // nodeStyle(),
            // 主要对象是用矩形包围文本块的面板
            $(
              go.Panel,
              "Auto",
              $(
                go.Shape,
                "Rectangle",
                { fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
                new go.Binding("figure", "figure")
              ),
              $(
                go.TextBlock,
                textStyle(),
                {
                  margin: 8,
                  maxSize: new go.Size(160, NaN),
                  wrap: go.TextBlock.WrapFit,
                  editable: true
                },
                new go.Binding("text").makeTwoWay()
              )
            ),
            // 四个命名端口，每侧一个：
            makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
            makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
            makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
            makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
          )
        );
        myDiagram.nodeTemplateMap.add(
          "Start",
          $(
            go.Node,
            "Table",
            nodeStyle(),
            $(
              go.Panel,
              "Spot",
              $(go.Shape, "Circle", {
                desiredSize: new go.Size(55, 55),
                fill: "#282c34",
                stroke: "#09d3ac",
                strokeWidth: 3.5
              }),
              $(go.TextBlock, "Start", textStyle(), new go.Binding("text"))
            ),
            // 三个命名端口，除顶部外，每侧各一个，仅输出：
            makePort("L", go.Spot.Left, go.Spot.Left, true, false),
            makePort("R", go.Spot.Right, go.Spot.Right, true, false),
            makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
          )
        );
        myDiagram.nodeTemplateMap.add(
          "End",
          $(
            go.Node,
            "Table",
            nodeStyle(),
            $(
              go.Panel,
              "Spot",
              $(go.Shape, "Circle", {
                desiredSize: new go.Size(55, 55),
                fill: "#282c34",
                stroke: "#DC3C00",
                strokeWidth: 3.5
              }),
              $(go.TextBlock, "End", textStyle(), new go.Binding("text"))
            ),
            // 三个命名端口，除底部外，每侧各一个，仅输入：
            makePort("T", go.Spot.Top, go.Spot.Top, false, true),
            makePort("L", go.Spot.Left, go.Spot.Left, false, true),
            makePort("R", go.Spot.Right, go.Spot.Right, false, true)
          )
        );
        // taken from ../extensions/Figures.js:
        go.Shape.defineFigureGenerator("File", function(shape, w, h) {
          var geo = new go.Geometry();
          var fig = new go.PathFigure(0, 0, true); // 起点
          geo.add(fig);
          fig.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0));
          fig.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
          fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
          fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
          var fig2 = new go.PathFigure(0.75 * w, 0, false);
          geo.add(fig2);
          // The Fold
          fig2.add(new go.PathSegment(go.PathSegment.Line, 0.75 * w, 0.25 * h));
          fig2.add(new go.PathSegment(go.PathSegment.Line, w, 0.25 * h));
          geo.spot1 = new go.Spot(0, 0.25);
          geo.spot2 = go.Spot.BottomRight;
          return geo;
        });
        myDiagram.nodeTemplateMap.add(
          "Comment",
          $(
            go.Node,
            "Auto",
            nodeStyle(),
            $(go.Shape, "File", {
              fill: "#282c34",
              stroke: "#DEE0A3",
              strokeWidth: 3
            }),
            $(
              go.TextBlock,
              textStyle(),
              {
                margin: 8,
                maxSize: new go.Size(200, NaN),
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true
              },
              new go.Binding("text").makeTwoWay()
            )
            // 没有端口，因为不允许链接与注释连接
          )
        );
        // 替换linkTemplateMap中的默认链接模板
        myDiagram.linkTemplate = $(
          go.Link, // 整个连接面板
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // 鼠标悬停巧妙地突出显示链接：
            mouseEnter: function(e, link) {
              link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
            },
            mouseLeave: function(e, link) {
              link.findObject("HIGHLIGHT").stroke = "transparent";
            },
            doubleClick: function(e, link) {
              _this.lineData = link.part.data;
              _this.openEditLine();
            },
            click: function(e, link) {
              _this.lineData = link.part.data;
            },
            selectionAdorned: false
          },
          new go.Binding("points").makeTwoWay(),
          $(
            go.Shape, // 高光形状，通常是透明的
            {
              isPanelMain: true,
              strokeWidth: 8,
              stroke: "transparent",
              name: "HIGHLIGHT"
            }
          ),
          $(
            go.Shape, // 链接路径形状
            { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
            new go.Binding("stroke", "isSelected", function(sel) {
              return sel ? "dodgerblue" : "gray";
            }).ofObject()
          ),
          $(
            go.Shape, // 箭头
            { toArrow: "standard", strokeWidth: 0, fill: "gray" }
          ),
          $(
            go.Panel,
            "Auto", // 链接标签，通常不可见
            {
              visible: false,
              name: "LABEL",
              segmentIndex: 2,
              segmentFraction: 0.5
            },
            new go.Binding("visible", "visible").makeTwoWay(),
            $(
              go.Shape,
              "RoundedRectangle", // 标签形状
              { fill: "#F8F8F8", strokeWidth: 0 }
            ),
            $(
              go.TextBlock,
              "Yes", // 标签
              {
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#333333",
                editable: true
              },
              new go.Binding("text").makeTwoWay()
            )
          )
        );

        // 如果链接标签来自“条件”节点，则使其可见。
        // 此侦听器由“LinkDraw”和“LinkRelinked”图表事件调用。
        function showLinkLabel(e) {
          var label = e.subject.findObject("LABEL");
          if (label !== null)
            label.visible = e.subject.fromNode.data.category === "Conditional";
        }
        // LinkingTool和RelinkingTool使用的临时链接也是正交的：
        myDiagram.toolManager.linkingTool.temporaryLink.routing =
          go.Link.Orthogonal;
        myDiagram.toolManager.relinkingTool.temporaryLink.routing =
          go.Link.Orthogonal;

        // load
        if (document.getElementById("mySavedModel").value !== "") {
          myDiagram.model = go.Model.fromJson(
            document.getElementById("mySavedModel").value
          );
        }

        // 动画淡入
        function animateFadeDown(e) {
          var diagram = e.diagram;
          var animation = new go.Animation();
          animation.isViewportUnconstrained = true; // 所以图表定位规则让动画从屏幕上开始
          animation.easing = go.Animation.EaseOutExpo;
          animation.duration = 900;
          // 从上面淡入
          animation.add(
            diagram,
            "position",
            diagram.position.copy().offset(0, 200),
            diagram.position
          );
          animation.add(diagram, "opacity", 0, 1);
          animation.start();
        }
      }, 1200);
    },
    getPic() {
      let id = this.$route.query.id;
      // 查询连线
      queryLine(id).then(res => {
        let m = 0;
        let linkDataArray = res.data.data;
        let idArray = [];
        for (let i = 0; i < linkDataArray.length; i++) {
          if (linkDataArray[i].startNodeId !== "") {
            idArray.push(linkDataArray[i].startNodeId);
          }
          if (linkDataArray[i].endNodeId !== "") {
            idArray.push(linkDataArray[i].endNodeId);
          }
        }
        idArray = Array.from(new Set(idArray));
        for (let i = 0; i < linkDataArray.length; i++) {
          delete linkDataArray[i].parallelFlag;
          delete linkDataArray[i].sequence;
          delete linkDataArray[i].version;
          delete linkDataArray[i].serviceInterfaceId;
          delete linkDataArray[i].processLineType;
          linkDataArray[i].from = linkDataArray[i].startNodeId;
          linkDataArray[i].to = linkDataArray[i].endNodeId;
          delete linkDataArray[i].startNodeId;
          delete linkDataArray[i].endNodeId;
          linkDataArray[i].fromPort = "B";
          linkDataArray[i].toPort = "T";
        }
        // 查询节点
        let nodeDataArray = "";
        for (let i = 0; i < idArray.length; i++) {
          queryNode(idArray[i]).then(res => {
            let backData = res.data.data;
            delete backData.processNodeType;
            delete backData.serviceInterfaceId;
            delete backData.channelInterfaceId;
            delete backData.version;
            backData.key = backData.processNodeId;
            backData.text = backData.channelInterfaceName;
            delete backData.processNodeId;
            delete backData.channelInterfaceInfo;
            delete backData.channelInterfaceName;
            if (nodeDataArray === "") {
              nodeDataArray = nodeDataArray + JSON.stringify(backData);
            } else {
              nodeDataArray = nodeDataArray + "," + JSON.stringify(backData);
            }

            for (let n = 0; n < linkDataArray.length; n++) {
              if (linkDataArray[n].from === "") {
                m = m - 1;
                linkDataArray[n].from = m;
                nodeDataArray =
                  nodeDataArray +
                  `,{"key":${m},"category":"Start","text":"Start"}`;
              }
              if (linkDataArray[n].to === "") {
                m = m - 1;
                linkDataArray[n].to = m;
                nodeDataArray =
                  nodeDataArray + `,{"key":${m},"category":"End","text":"End"}`;
              }
            }

            let zong =
              '{ "class": "go.GraphLinksModel",' +
              '"linkFromPortIdProperty": "fromPort",' +
              '"linkToPortIdProperty": "toPort",' +
              '"nodeDataArray": [' +
              nodeDataArray +
              '],"linkDataArray": ' +
              JSON.stringify(linkDataArray) +
              "}";
            document.getElementById("mySavedModel").value = zong;
          });
        }
      });
    },
    // 新增节点
    handleOpenAdd() {
      this.dialogAddFormVisible = true;
      // 给新增表单赋值
      this.addForm.serviceInterfaceId = this.$route.query.id;
    },
    handleCurrentValue(currentVal) {
      if (currentVal === "0" || currentVal === "2") {
        this.isChannel = false;
      } else if (currentVal === "3") {
        this.isChannel = true;
      }
    },
    handleAdd(formName) {
      var node = {};
      this.$refs[formName].validate(valid => {
        if (valid) {
          let id = this.$route.query.id;
          let channelInterfaceId = this.addForm.channelInterfaceId;
          let processNodeType = this.addForm.processNodeType;
          let _this = this.$message;
          this.dialogAddFormVisible = false;
          setTimeout(function() {
            if (processNodeType === "3") {
              addNode(
                Object.assign({
                  serviceInterfaceId: id,
                  channelInterfaceId: channelInterfaceId,
                  processNodeType: processNodeType
                })
              ).then(res => {
                _this({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
                queryChannel().then(ress => {
                  let array = ress.data.data.records;
                  for (let i = 0; i < array.length; i++) {
                    if (array[i].channelInterfaceId === channelInterfaceId) {
                      node["text"] = array[i].channelInterfaceName;
                      node["key"] = res.data.data.processNodeId;
                      this.myDiagram.model.addNodeData(node);
                      this.dialogAddFormVisible = false;
                    }
                  }
                });
              });
            } else if (processNodeType === "0") {
              node["text"] = "start";
              node["key"] = "start";
              this.myDiagram.model.addNodeData(node);
              this.dialogAddFormVisible = false;
            } else if (processNodeType === "2") {
              node["text"] = "end";
              node["key"] = "end";
              this.myDiagram.model.addNodeData(node);
              this.dialogAddFormVisible = false;
            }
          }, 300);
        } else {
          return false;
        }
      });
    },
    // 获取渠道接后名称和id
    getChannel() {
      queryChannel().then(res => {
        let array = res.data.data.records;
        this.addForm.channelType = array;
      });
    },
    // 打开编辑连线
    handleOpenEdit() {
      this.$message({
        showClose: true,
        message: "请双击目标连线进行编辑！"
      });
    },
    openEditLine() {
      this.dialogEditFormVisible = true;
      let id = this.$route.query.id;
      queryLine(id).then(res => {
        let lineArray = res.data.data;
        for (let i = 0; i < lineArray.length; i++) {
          if (lineArray[i].startNodeId === "") {
            lineArray[i].startNodeType = "0";
          } else {
            lineArray[i].startNodeType = "3";
          }
          if (lineArray[i].endNodeId === "") {
            lineArray[i].endNodeType = "2";
          } else {
            lineArray[i].endNodeType = "3";
          }
          if (lineArray[i].processLineId === this.lineData.processLineId) {
            this.editForm.processLineId = lineArray[i].processLineId;
            this.editForm.processLineType = lineArray[i].processLineType;
            this.editForm.parallelFlag = lineArray[i].parallelFlag;
            this.editForm.sequence = lineArray[i].sequence;
            this.editForm.serviceInterfaceId = lineArray[i].serviceInterfaceId;
            this.editForm.startNodeId = lineArray[i].startNodeId;
            this.editForm.startNodeType = lineArray[i].startNodeType;
            this.editForm.endNodeId = lineArray[i].endNodeId;
            this.editForm.endNodeType = lineArray[i].endNodeType;
            this.editForm.version = lineArray[i].version;
          }
        }
      });
    },
    // 编辑连线
    handleEditLine(editForm) {
      var node = {};
      this.$refs[editForm].validate(valid => {
        if (valid) {
          this.addLine.cpllUpdateDtos.push(this.editForm);
          addEditLine(this.addLine).then(res => {
            this.dialogEditFormVisible = false;
            this.$message({
              showClose: true,
              message: "编辑连线成功",
              type: "success"
            });
          });
        } else {
          return false;
        }
      });
    },

    // 保存图
    handleSavePic() {
      let id = this.$route.query.id;
      let addLine = this.addLine;
      let _this = this;
      let processLineIdArray = [];
      setTimeout(function() {
        queryLine(id).then(res => {
          let backRecords = res.data.data;
          // 赋值给cpllAddDtos数组
          let lineArray = JSON.parse(this.myDiagram.model.toJson())
            .linkDataArray;

          for (let i = 0; i < lineArray.length; i++) {
            delete lineArray[i].fromPort;
            delete lineArray[i].toPort;
            delete lineArray[i].points;
            lineArray[i].startNodeId = lineArray[i].from;
            lineArray[i].endNodeId = lineArray[i].to;
            if (lineArray[i].startNodeId < 0) {
              lineArray[i].startNodeId = "";
            }
            if (lineArray[i].endNodeId < 0) {
              lineArray[i].endNodeId = "";
            }
            lineArray[i].parallelFlag = "";
            lineArray[i].processLineType = "0";
            lineArray[i].sequence = "";
            delete lineArray[i].from;
            delete lineArray[i].to;
            lineArray[i].serviceInterfaceId = id;
            lineArray[i].startNodeType = "";
            lineArray[i].endNodeType = "";
            if (lineArray[i].startNodeId === "start") {
              lineArray[i].startNodeType = "0";
              lineArray[i].startNodeId = "0";
            } else {
              lineArray[i].startNodeType = "3";
            }
            let aa = lineArray[i].endNodeId.toString();
            if (aa.substr(0, 3) === "end") {
              lineArray[i].endNodeType = "2";
              lineArray[i].endNodeId = "2";
            } else {
              lineArray[i].endNodeType = "3";
            }
          }
          // 差集取新增数组值
          let arr = [...lineArray].filter(x =>
            [...backRecords].every(y => y.processLineId !== x.processLineId)
          );
          // 交集
          let newBackRecords = [...backRecords].filter(x =>
            [...lineArray].some(y => y.processLineId === x.processLineId)
          );

          addLine.cpllAddDtos = arr;
          addLine.cpllUpdateDtos = lineArray;

          // 删除
          let delRecords = [...backRecords].filter(x =>
            [...newBackRecords].every(y => x.processLineId !== y.processLineId)
          );

          let delLineArr = [];
          let delNodeArr = [];

          for (let r = 0; r < delRecords.length; r++) {
            if (delRecords[r].processLineId !== "") {
              delLineArr.push(delRecords[r].processLineId);
            }
            if (delRecords[r].endNodeId !== "") {
              delNodeArr.push(delRecords[r].endNodeId);
            }
          }

          for (let e = 0; e < delNodeArr.length; e++) {
            delNode(delNodeArr[e]).then(res => {});
          }
          for (let w = 0; w < delLineArr.length; w++) {
            delLineId(delLineArr[w]).then(res => {});
          }
          // 赋值给cpllUpdateDtos数组
          addEditLine(addLine).then(res => {
            _this.$message({
              showClose: true,
              message: "保存成功",
              type: "success"
            });
          });
        });
      }, 300);
    },
    // 删除点线
    handleDelNodeLine() {
      setTimeout(function() {
        if (myDiagram.commandHandler.canDeleteSelection()) {
          myDiagram.commandHandler.deleteSelection();
          return;
        }
      }, 300);
    }
  }
};
</script>                                       

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Lato:300,400,700");
#interface-logic {
  width: 100%;
  .content-left {
    display: inline-block;
    float: left;
  }
  .content-right {
    display: inline-block;
    display: none;
    float: right;
    width: 38%;
    margin-right: 10px;
  }
  .left-space {
    position: absolute;
    top: 10px;
    left: 51%;
    padding: 10px 12px;
    z-index: 9;
  }
  .left-space-edit {
    position: absolute;
    top: 100px;
    left: 50%;
    padding: 10px 24px;
    z-index: 9;
  }
  .left-space-editLine {
    position: absolute;
    top: 145px;
    left: 50%;
    padding: 10px 12px;
    z-index: 9;
  }
  .left-space-delNode {
    position: absolute;
    top: 55px;
    left: 50%;
    padding: 10px 12px;
    z-index: 9;
  }
}
</style>